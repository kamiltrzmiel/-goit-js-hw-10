import Notiflix from 'notiflix';

const API_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = name => {
  return fetch(`${API_URL}/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      setTimeout(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }, 1200);
    });
};
