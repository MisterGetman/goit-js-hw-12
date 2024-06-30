import axios from 'axios';

function queryParams(keyWord, page) {
  const params = new URLSearchParams({
    key: '44691469-d7e9dab06c3e716fb34c6ceb9',
    q: keyWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });

  return params.toString();
}

export default async function getImages(keyWord, page) {
  const { data } = await axios.get(
    `https://pixabay.com/api/?${queryParams(keyWord, page)}`
  );

  return data;
}
