import { elements } from './base';

// Lý giải tại sao phải để function mà ko get trực tiếp store vào variable lun
// Vì khi javascript frist run nó sẽ get value từ input sẽ empty và khi click vào search function call sẽ get value empty
const getInput = () => elements.searchInput.value;

const clearInput = () => {
  elements.searchInput.value = '';
};

const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(el => {
    el.classList.remove('results__link--active');
  });
  document
    .querySelector(`.results__link[href*="${id}"]`)
    .classList.add('results__link--active');
};

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  return `
                  <li>
                      <a class="results__link"  href="#${recipe.recipe_id}">
                          <figure class="results__fig">
                              <img src="${recipe.image_url}" alt="Test"> 
                          </figure>
                          <div class="results__data">
                              <h4 class="results__name">${limitRecipeTitle(
                                recipe.title
                              )} </h4>
                              <p class="results__author">${recipe.publisher}</p>
                          </div>
                      </a>
                  </li>
    `;
};

// type: prev or next
const createButton = (page, type) => {
  return `
    <button class="btn-inline results__btn--${type}" data-goto="${
    type === 'prev' ? page - 1 : page + 1
  }">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type === 'prev' ? 'left' : 'right'
            }"></use>
        </svg>
    </button>
    `;
};

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Only create next button
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Create prev and next btn
    button = `
    ${createButton(page, 'prev')}${createButton(page, 'next')}
    `;
    console.log(button);
  } else if (page === pages && pages > 1) {
    // Only create prev btn
    button = createButton(page, 'prev');
  }

  elements.searchResPage.innerHTML = button;
};

const renderResult = (recipes, page = 1, resPerPage = 10) => {
  // render results of currente page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  const markup = recipes.slice(start, end).map(renderRecipe).join('');

  elements.searchResult.innerHTML = markup;

  // render pagiation button
  renderButtons(page, recipes.length, resPerPage);
};

export {
  getInput,
  clearInput,
  renderResult,
  limitRecipeTitle,
  highlightSelected,
};
