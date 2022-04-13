import {getMiniatures} from './miniatures.js';
import {getRandomNum, debounce} from './util.js';

const RANDOM_NAMBER = 10;
/*
setTimeout(() => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}, 1000);
*/
const buttonsFilter = document.querySelector('.img-filters__form');

const getArrayRandomPhotos = (arr) => {
  const arrayKey = new Set;
  while (arrayKey.size !== RANDOM_NAMBER) {
    arrayKey.add(getRandomNum(0, arr.length-1));
  }
  const arrPhotos = [];
  for (const key of arrayKey) {
    arrPhotos.push(arr[key]);
  }
  return arrPhotos;
};

let arrayPhotos = [];

const getFilterPhotos = (arr) => {
  arrayPhotos = {
    'filter-default': () => (
      arr.slice()
    ),
    'filter-random': () => (
      getArrayRandomPhotos (arr)
    ),
    'filter-discussed': () => (
      arr.slice().sort((commentA, commentB) => (commentB.comments.length - commentA.comments.length))
    )
  };
  getMiniatures(arr);
};

Promise.all(Array.from(document.querySelectorAll('.picture')).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
  setTimeout(() => {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  }, 300);
});

const onButtonClickFilter = (evt) => {
  document.querySelectorAll('.picture').forEach((el) => el.remove());
  document.querySelectorAll('.img-filters__button').forEach((el) => el.classList.remove('img-filters__button--active'));
  document.querySelector(`#${evt.target.id}`).classList.add('img-filters__button--active');
  debounce(getMiniatures(arrayPhotos[evt.target.id]()));
};

buttonsFilter.addEventListener('click', debounce(onButtonClickFilter));

export {getArrayRandomPhotos, getFilterPhotos};
