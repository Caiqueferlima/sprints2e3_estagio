export const loadCardsSearch = (docs) => {
  const searchResult = document.querySelector('#search-result');

  if (!docs.length) {
    searchResult.innerHTML = '<p>Nenhum artigo encontrado.</p>';
    return;
  }

  docs.forEach((item) => {
    const divCard = document.createElement('div');
    const imageDefault =
      'https://live.staticflickr.com/65535/53915116300_01b3972d2a_z.jpg';

    const imgUrl = item.multimedia[0]?.legacy?.xlarge
      ? `https://static01.nyt.com/${item.multimedia[0].legacy.xlarge}`
      : imageDefault;
    const date = item.pub_date;
    divCard.innerHTML = `
      <div class="card item" style="width: 18rem;">
        <img src="${imgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text">Publication date: ${date.slice(0, 10)}</p>
          <h5 class="card-title">${item.headline.main}</h5>
          <p class="card-text">${item.abstract}</p>
          <a href="${item.web_url}" class="btn btn-secondary btn-sm" target="_blank">Access news</a>
        </div>
      </div>
    `;
    searchResult.appendChild(divCard);
  });
};
