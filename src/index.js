import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const searchEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const clrScreen = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

searchEl.addEventListener(
  'input',
  _.debounce(async e => {
    const countries = await fetchCountries(e.target.value.trim());

    if (countries.length === 0) {
      clrScreen();
    }

    if (countries.length > 10) {
      clrScreen();
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length >= 2 && countries.length <= 10) {
      clrScreen();
      countryListEl.innerHTML = countries
        .map(
          country => `<li><img height="32" src="${country.flags.svg}" />${country.name.common}</li>`
        )
        .join('');
    }

    if (countries.length === 1) {
      clrScreen();
      countryInfoEl.innerHTML = `
      <li><img height="32" src="${country.flags.svg}" />${country.name.common}</li>
      <p>Capital: ${countries[0].capital}</p>
      <p>Population: ${countries[0].population}</p>
      <p>Languages: ${Object.values(countries[0].languages).join(', ')}</p>`;
    }
  }, DEBOUNCE_DELAY)
);
