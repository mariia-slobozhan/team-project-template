import axios from 'axios';
axios.defaults.baseURL = 'https://app.ticketmaster.com/discovery/v2/'

// const options = {
//   headers: {
//     'Origin': 'http://localhost:1234',
//   'X-Target-URI': 'https://app.ticketmaster.com',
//  'Access-Control-Allow-Origin': '*',
// }
// };



 export async function fetchEvents(target, query, page){
  const {data: {_embedded: {events}}} = await axios.get(`${target}.json?size=20&keyword=${query}&page=${page}&apikey=1twKLyrauG3OZrFZiN9ApTE1ANWFyZTo`)
  return events; 
}

export async function fetchPopularEvents(page, country,date){
  const {data: {_embedded: {events}}} = await axios.get(`events.json?size=20&page=${page}&sort=random&marketId=${country}&endDateTime=${date}&apikey=1twKLyrauG3OZrFZiN9ApTE1ANWFyZTo`)
 return events;
}


