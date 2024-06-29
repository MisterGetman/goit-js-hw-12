import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import imgCardsTemplate from './js/render-functions';
import fetchPics from './js/pixabay-api';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-wrapper');
const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const handleFormSubmit = e => {
  e.preventDefault();
  loader.classList.toggle('hidden');
  gallery.innerHTML = '';
  const keyWord = form.keyWord.value.trim();

  const renderPics = () =>
    fetchPics(keyWord)
      .then(response => response.json())
      .then(({ hits }) => {
        if (hits.length > 0) {
          gallery.insertAdjacentHTML('afterbegin', imgCardsTemplate(hits));

          modal.refresh();
        } else {
          iziToast.show({
            title: '<b>Oops!</b>',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            backgroundColor: 'tomato',
            position: 'center',
          });
        }
      })
      .catch(error => {
        iziToast.show({
          title: '<b>Error:</b>',
          message: error,
          backgroundColor: 'tomato',
          position: 'center',
        });
      })
      .finally(() => {
        loader.classList.toggle('hidden');
        form.keyWord.value = '';
      });

  renderPics();
};

form.addEventListener('submit', handleFormSubmit);
