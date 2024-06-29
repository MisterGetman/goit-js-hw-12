const imgCardTemplate = img => {
  return `<li class="gallery-item">
            <a href="${img.largeImageURL}">
              <img
                class="gallery-item-img"
                src="${img.webformatURL}"
                alt="${img.tags}"
                width="360"
              />
            </a>
            <ul class="img-info-list">
              <li>
                <p class="img-data-name">Likes</p>
                <p class="img-data">${img.likes}</p>
              </li>
              <li>
                <p class="img-data-name">Views</p>
                <p class="img-data">${img.views}</p>
              </li>
              <li>
                <p class="img-data-name">Comments</p>
                <p class="img-data">${img.comments}</p>
              </li>
              <li>
                <p class="img-data-name">Downloads</p>
                <p class="img-data">${img.downloads}</p>
              </li>
            </ul>
          </li>`;
};

export default function imgCardsTemplate(arr) {
  return arr.map(imgCardTemplate).join('');
}
