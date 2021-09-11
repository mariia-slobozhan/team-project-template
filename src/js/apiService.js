import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'

export default async function fetchImg(query, page){
  const {data: {hits},} = await axios.get(`&q=${query}&page=${page}&per_page=12&key=23126323-c48f66a824a8fc9c468cd2358`)
  return hits;
}