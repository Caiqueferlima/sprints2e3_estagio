export const alertError = async (error) => {
  console.log(error)
  const searchResult = await document.querySelector('#search-result');
  searchResult.innerHTML `
      <div class="alert alert-danger" role="alert">${error.message}</div>
  `;
}