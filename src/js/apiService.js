import axios from 'axios';
axios.defaults.baseURL = 'https://app.ticketmaster.com/discovery/v2/'

 export default async function fetchEvents(query, page){
  const {data: {_embedded: {events}}} = await axios.get(`events.json?size=20&keyword=${query}&page=${page}&apikey=1twKLyrauG3OZrFZiN9ApTE1ANWFyZTo`)
  return events; 
}




