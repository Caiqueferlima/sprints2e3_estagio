export const loadCardsPopular = (results) => {
  const searchResult = document.querySelector('#search-result');

  if (!results.length) {
    searchResult.innerHTML = '<p>Nenhum artigo encontrado.</p>';
    return;
  }

  results.forEach((item) => {
    const divCard = document.createElement('div');
    const imageDefault =
      'https://live.staticflickr.com/65535/53915116300_01b3972d2a_z.jpg';

    const imgUrl =
      item.media &&
      item.media[0] &&
      item.media[0]['media-metadata'] &&
      item.media[0]['media-metadata'][2]
        ? item.media[0]['media-metadata'][2].url
        : imageDefault;

    divCard.innerHTML = `
      <div class="card item" style="width: 18rem;">
        <img src="${imgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text">Publication date: ${item.published_date}</p>
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.abstract}</p>
          <a href="${item.url}" class="btn btn-secondary btn-sm" target="_blank">Access news</a>
        </div>
      </div>
    `;
    searchResult.appendChild(divCard);
  });
};
