export const fetchProduct = async (productId) => {
  const URL_LIST = 'https://api.mercadolibre.com/items/';

  if (!productId) throw new Error('ID não informado');

  const response = await fetch(`${URL_LIST}${productId}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (query) => {
  const URL_LIST = 'https://api.mercadolibre.com/sites/MLB/search?q=';

  if (!query) throw new Error('Termo de busca não informado');

  const response = await fetch(`${URL_LIST}${query}`);
  const data = await response.json();
  return data.results;
};
