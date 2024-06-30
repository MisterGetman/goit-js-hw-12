import axios from 'axios';

export default async function get(query) {
  const res = await axios.get(`https://pixabay.com/api?${query}`);
  return res.data;
}
