import { loadCardsPopular } from './cards.js';
import { config } from '../config/index.js';

export const handlePopular = async () => {
  const searchResult = document.querySelector('#search-result');
  try {
    const response = await fetch(`http://${config.WEB_HOSTNAME}:${config.SERVER_PORT}/popular`);
    const data = await response.json();
    loadCardsPopular(data.results);
  } catch (error) {
    console.error(error);
    searchResult.innerHTML = `
      <div class="alert alert-danger" role="alert">${error.message}</div>
    `;
  }
};
