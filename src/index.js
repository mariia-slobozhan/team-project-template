import './sass/main.scss';
import fetchImg from './js/apiService';
import { form, gallery, loadMorebtn, upBtn } from './js/refs';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import pictureMarkup from './templates/picture.hbs';
import * as basicLightbox from 'basiclightbox';

const state = {
  page: 1,
  query: '',
};

const options = {
  root: null,
  rootMargin: '0px', 
  rhtrshold: 0.5,
};

const observer = new IntersectionObserver(onClickLoadMore, options);

loadMorebtn.style.visibility = 'hidden';

form.addEventListener('submit', onSubmitForm);
loadMorebtn.addEventListener('click', onClickLoadMore);
gallery.addEventListener('click', openModal);

async function onSubmitForm(e) {
  e.preventDefault();
  state.page = 1;
  if (!e.currentTarget.elements.query.value.trim()) {
    return;
  }
  loadMorebtn.style.visibility = 'hidden';
  state.query = e.currentTarget.elements.query.value.trim();
  const data = await fetchImg(state.query, state.page);
  gallery.innerHTML = pictureMarkup(data);
  if (data.length > 11) {
    loadMorebtn.style.visibility = 'visible';
  }
}

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
