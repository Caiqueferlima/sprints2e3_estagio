export const loadMetasSearch = (query, meta) => {
  const resultMeta = document.querySelector('.result-meta');
  const divHeader = document.createElement('div');
  divHeader.classList.add('result-meta');

  divHeader.innerHTML = `
    <h3>Result for: <span>${query}</span></h3>
    <p>Hits: <span>${meta.hits}</span> Time: <span>${meta.time} s</span></p>
  `;
  resultMeta.appendChild(divHeader);
};
