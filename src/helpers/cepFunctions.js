// Elements
const BASE_URL1 = 'https://cep.awesomeapi.com.br/json/';
const BASE_URL2 = 'https://brasilapi.com.br/api/cep/v2/';
const cartAddress = document.querySelector('.cart__address');
const cepInput = document.querySelector('.cep-input');

export const getAddress = async (cep) => {
  const promiseZipCode = await Promise.any([fetch(`${BASE_URL1}${cep}`),
    fetch(`${BASE_URL2}${cep}`)]);
  const data = promiseZipCode.json();
  return data;
};

export const searchCep = async () => {
  try {
    const dataZipCode = await getAddress(cepInput.value);
    cartAddress.innerHTML = `${dataZipCode.street
      || dataZipCode.address} - ${dataZipCode.neighborhood
      || dataZipCode.district} - ${dataZipCode.city} - ${dataZipCode.state}`;
  } catch (error) {
    cartAddress.innerHTML = 'CEP não encontrado';
  }
};
