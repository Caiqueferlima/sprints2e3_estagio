import { handleSearch } from './articleSearch/search.js';
import { handlePopular } from './articlePopular/popular.js';

document.addEventListener('DOMContentLoaded', () => {
  handlePopular();
  const formSearch = document.querySelector('#form-search');
  formSearch.addEventListener('submit', handleSearch);
});
