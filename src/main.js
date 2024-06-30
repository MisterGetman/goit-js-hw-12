import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import imgCardsTemplate from './js/render-functions';
import getPics from './js/pixabay-api';

const perPage = 15;
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

function handleFormSubmit(e) {
  e.preventDefault();
  page = 1;
  keyWord = form.keyWord.value.trim();

  if (keyWord === '') {
    showNotification({
      title: '<b>Error:</b>',
      message: 'Input can not be blank.',
      backgroundColor: 'tomato',
    });

    return;
  }

  form.keyWord.value = '';
  gallery.innerHTML = '';

  loadAndRenderPics();
}

function handleLoadButtonClick() {
  page++;
  loadAndRenderMorePics();
}

async function loadAndRenderPics() {
  try {
    loader.classList.toggle('hidden');
    const { hits, totalHits } = await getPics(keyWord, page);
    loader.classList.toggle('hidden');

    if (hits.length > 0) {
      gallery.insertAdjacentHTML('afterbegin', imgCardsTemplate(hits));
      modal.refresh();

      handleLoadButtonDisplay(totalHits);
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
      message: error.message,
      backgroundColor: 'tomato',
    });
  }
}

async function loadAndRenderMorePics() {
  try {
    loader.classList.toggle('hidden');
    const { hits, totalHits } = await getPics(keyWord, page);
    loader.classList.toggle('hidden');

    gallery.insertAdjacentHTML('beforeend', imgCardsTemplate(hits));
    modal.refresh();

    doSmoothScroll();

    handleLoadButtonDisplay(totalHits);
  } catch (error) {
    showNotification({
      title: '<b>Error:</b>',
      message: error.message,
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
  return Math.ceil(maxResults / perPage) > page;
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
