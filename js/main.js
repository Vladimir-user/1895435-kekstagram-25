import {getPhotos} from './loadingdata.js';
import {getMiniatures} from './miniatures.js';

const photosData = getPhotos(25);

getMiniatures(photosData);

const picturesContainer = document.querySelector('.pictures');

picturesContainer.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'IMG') {
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    evt.preventDefault();
    const currentPicture = photosData[evt.target.id - 1];
    document.querySelector('.big-picture__img').firstElementChild.src = currentPicture.url;
    document.querySelector('.likes-count').textContent = currentPicture.likes;
    document.querySelector('.comments-count').textContent = currentPicture.comments.length;
    document.querySelector('.social__caption').textContent = currentPicture.description;

      const commentsElementHTML = `<li class="social__comment">
      <img
          class="social__picture"
          src="${currentPicture.comments.avatar}"
          alt="${currentPicture.comments.nameAuthor}"
          width="35" height="35">
      <p class="social__text">${currentPicture.comments.message}</p>
    </li>`;
    document.querySelector('.social__comments').insertAdjacentHTML('beforeend', commentsElementHTML);

  }
});
