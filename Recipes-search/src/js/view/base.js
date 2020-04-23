const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResult: document.querySelector('.results__list'),
  searchLoader: document.querySelector('.results'),
  searchResPage: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
};

const renderLoader = parent => {
  const loader = `
    <div class='loader'>
        <svg>
            <use href="./img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.parentElement.removeChild(loader);
};

export { elements, renderLoader, clearLoader };
