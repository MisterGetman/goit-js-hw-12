import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import imgCardsTemplate from './js/render-functions';
import getPics from './js/pixabay-api';

const PER_PAGE = 15;
const API_KEY = '44691469-d7e9dab06c3e716fb34c6ceb9';
const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-wrapper');
const loadButton = document.querySelector('[data-load]');
const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
let keyWord;
let page;

form.addEventListener('submit', handleFormSubmit);
loadButton.addEventListener('click', handleLoadButtonClick);

function queryParams(keyWord) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: keyWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  });

  return params.toString();
}

function handleFormSubmit(e) {
  e.preventDefault();
  loader.classList.toggle('hidden');
  page = 1;
  keyWord = form.keyWord.value.trim();
  form.keyWord.value = '';
  gallery.innerHTML = '';

  loadAndRenderPics();

  loader.classList.toggle('hidden');
}

function handleLoadButtonClick(e) {
  loader.classList.toggle('hidden');
  page++;

  loadAndRenderMorePics();

  loader.classList.toggle('hidden');
}

async function loadAndRenderPics() {
  try {
    if (keyWord === '') return Promise.reject('Input can not be blank.');

    const data = await getPics(queryParams(keyWord));

    if (data.hits.length > 0) {
      gallery.insertAdjacentHTML('afterbegin', imgCardsTemplate(data.hits));
      modal.refresh();

      handleLoadButtonDisplay(data.totalHits);
    } else {
      showNotification({
        title: '<b>Oops!</b>',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: 'deepskyblue',
      });
    }
  } catch (error) {
    showNotification({
      title: '<b>Error:</b>',
      message: error,
      backgroundColor: 'tomato',
    });
  }
}

async function loadAndRenderMorePics() {
  try {
    const data = await getPics(queryParams(keyWord));

    gallery.insertAdjacentHTML('beforeend', imgCardsTemplate(data.hits));
    modal.refresh();

    doSmoothScroll();

    handleLoadButtonDisplay(data.totalHits);
  } catch (error) {
    showNotification({
      title: '<b>Error:</b>',
      message: error,
      backgroundColor: 'tomato',
    });
  }
}

function handleLoadButtonDisplay(maxResults) {
  if (canLoadMore(maxResults)) {
    loadButton.classList.remove('hidden');
  } else {
    loadButton.classList.add('hidden');
    showNotification({
      title: '<b>Oops!</b>',
      message: "We're sorry, but you've reached the end of search results.",
      backgroundColor: 'deepskyblue',
    });
  }
}

function canLoadMore(maxResults) {
  return Math.ceil(maxResults / PER_PAGE) > page;
}

function showNotification({ title, message, backgroundColor }) {
  iziToast.show({
    title,
    message,
    backgroundColor,
    position: 'center',
  });
}

function doSmoothScroll() {
  const liElem = document.querySelector('li');
  const rect = liElem.getBoundingClientRect();
  window.scrollBy({ top: rect.height * 2 + 24, behavior: 'smooth' });
}
