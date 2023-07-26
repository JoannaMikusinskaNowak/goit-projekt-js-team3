import { renderMoviesCards } from './fetch-data';

const API_KEY = '50faffa66bb05e881b7f3de0b265b30c';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_MOVIE_PATH = `/search/movie`;
const galleryOfMovies = document.querySelector('.movie-gallery');
const input = document.querySelector('.search-form__input');
const searchBtn = document.querySelector('.search-form__button');
const errorMsg = document.querySelector('.error-message');

searchBtn.addEventListener('click', searchMovies);

// import debounce from 'lodash.debounce';
// const DEBOUNCE_DELAY = 300;
// input.addEventListener('input', debounce(searchMovies, DEBOUNCE_DELAY));
///// Funkcja wyszukiwania przy wpisywaniu, jeśli nie będzie potrzebna to ją usunę.

let searchResultPage = 1;

export async function searchMovies(e) {
  e.preventDefault();
  const response = await fetch(
    `${BASE_URL}${SEARCH_MOVIE_PATH}?api_key=${API_KEY}&page=${searchResultPage}&query=${input.value}`,
  );
  const data = await response.json();
  if (input.value === '') {
    errorMsg.style.display = 'flex';
    errorMsg.textContent = 'What are we looking for?';
    return;
  }
  clearInterfaceUI();
  renderMoviesCards(data.results);
  galleryOfMovies.innerHTML = data.query = '';
  if (data.results == 0) {
    errorMsg.style.display = 'flex';
  } else {
    errorMsg.style.display = 'none';
  }
  return;
}

function clearInterfaceUI() {
  galleryOfMovies.innerHTML = '';
}
