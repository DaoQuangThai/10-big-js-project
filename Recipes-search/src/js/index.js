// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './view/seachView';
import * as recipeView from './view/recipeView';
import { elements, renderLoader, clearLoader } from './view/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};

/* ============== SEARCH CONTROLLER ================= */

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    renderLoader(elements.searchLoader);
    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResult(state.search.result);
    } catch (err) {
      alert('Something went wrong in the search...');
      clearLoader();
    }
  }
};

// Event listener
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPage.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');

  if (btn) {
    const goToPage = +btn.dataset.goto;
    searchView.renderResult(state.search.result, goToPage);
  }
});

/* ============== RECIPE CONTROLLER ================= */
const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare UI for changes

    // Highlight selected search item
    // console.log(state.search);
    if (state.search) searchView.highlightSelected(id);

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      // console.log(state.recipe);

      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert('Error processing recipe!');
    }
  }
};

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
