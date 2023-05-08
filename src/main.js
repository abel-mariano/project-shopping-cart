import { getSavedCartIDs } from './helpers/cartFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement,
  createCartProductElement, finalPrice } from './helpers/shopFunctions';
import { searchCep } from './helpers/cepFunctions';
import './style.css';

// Elements
const elementProducts = document.querySelector('.products');
const elementH3 = document.querySelector('.loading');
const elementCartProducts = document.querySelector('.cart__products');
document.querySelector('.cep-button').addEventListener('click', searchCep);

// Function that creates a product listing and adds a loading text during a request to the API / Função que cria uma listagem de produtos e adiciona um texto de carregamento durante uma solicitação à API
const productList = async () => {
  elementH3.innerHTML = 'Carregando...';
  elementH3.classList.add('error');

  try {
    const products = await fetchProductsList('computador');
    elementProducts.innerHTML = '';
    products.forEach((product) => {
      elementProducts.appendChild(createProductElement(product));
    });
  } catch (error) {
    elementH3.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  }
};
productList();

// Load the shopping cart when starting the page - Localstorage / Carrega o carrinho de compras ao iniciar a página - Localstorage
const returnSavedCart = getSavedCartIDs();
const arrayPromises = returnSavedCart.map((id) => fetchProduct(id));
Promise.all(arrayPromises).then((response) => {
  response.forEach((item) => elementCartProducts
    .appendChild(createCartProductElement(item)));
  finalPrice();
});
