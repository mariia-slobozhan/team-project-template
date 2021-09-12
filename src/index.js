import './sass/main.scss';
import {fetchEvents, fetchPopularEvents} from './js/apiService';
import  {eventInput, countryInput, gallery, loadMorebtn, upBtn} from './js/refs';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import pictureMarkup from './templates/picture.hbs';
import * as basicLightbox from 'basiclightbox';
import debounce from 'lodash.debounce';

loadMorebtn.style.visibility = 'hidden';


window.addEventListener('DOMContentLoaded',onLoadPage)
eventInput.addEventListener('input', debounce(onSubmitForm, 500));
loadMorebtn.addEventListener('click', onClickLoadMore);
gallery.addEventListener('click', openModal);

let date = new Date();
date.setDate(date.getDate());
let time = '';
time += date.getFullYear() + "-" + "0" + (date.getMonth()+1) + "-" + date.getDate() + "T00:00:00Z" ;
 

const state = {
  target: 'events',
  // date:'2022-01-16T14:00:00Z',
  date:'',
  page: 1,
  country: 202,
  query: '',
};



async function onLoadPage() {
  state.page = 1;
  const data = await fetchPopularEvents( state.page, state.country, state.date);
  gallery.innerHTML = pictureMarkup(data);
}

async function onSubmitForm(e) {
  state.date  = time;
  state.page = 1;
  state.query = e.target.value.trim();
  const data = await fetchEvents(state.target, state.query, state.page);
  gallery.innerHTML = pictureMarkup(data);
}














const options = {
  root: null,
  rootMargin: '0px', 
  rhtrshold: 0.5,
};

const observer = new IntersectionObserver(onClickLoadMore, options);

async function onClickLoadMore() {
  state.page += 1;
  const data = await fetchImg(state.query, state.page);
  gallery.insertAdjacentHTML('beforeend', pictureMarkup(data));
  if (data.length < 12) {
    loadMorebtn.style.visibility = 'hidden';
  }
  gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });

  if(state.page === 2){
      observer.observe(loadMorebtn)
  }
}

function openModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  basicLightbox
    .create(
      `
    <img src="${e.target.dataset.src} width="800" height="600">
`,
    )
    .show();
}
