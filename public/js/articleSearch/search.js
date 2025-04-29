import { loadCardsSearch } from './cards.js';
import { loadMetasSearch } from './meta.js';
import { config } from '../config/index.js';

export const handleSearch = async (event) => {
  event.preventDefault();
  const formSearch = document.querySelector('#form-search');
  const searchResult = document.querySelector('#search-result');
  const resultMeta = document.querySelector('.result-meta');

  const query = formSearch.querySelector('#search-article').value.trim();
  const sort = formSearch.querySelector('#sort').value || 'newest';
  const beginDate = formSearch.querySelector('#begin-date').value || '18510718';
  const endDate = formSearch.querySelector('#end-date').value || '20240707';

  searchResult.innerHTML = '';
  resultMeta.innerHTML = '';

  const beginFormat = beginDate.split('-').join('');
  const endFormat = endDate.split('-').join('');

  try {
    const response = await fetch(
      `http://${config.WEB_HOSTNAME}:${config.SERVER_PORT}/articles?begin_date=${beginFormat}&end_date=${endFormat}&q=${query}&sort=${sort}`,
    );

    const data = await response.json();
    loadCardsSearch(data.docs);
    loadMetasSearch(query, data.meta);
  } catch (error) {
    console.error(error);
    searchResult.innerHTML = `
      <div class="alert alert-danger" role="alert">${error.message}</div>
    `;
  }
};
