const COUNT_COMMENTS =5;

const hideElementWindow = () => {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
};

const picturesContainer = document.querySelector('.pictures');
const modalCloseElement = document.querySelector('#picture-cancel');
const commentsLoader = document.querySelector('.comments-loader');

const getComments = (arr) => {
  let i = 0, j = COUNT_COMMENTS;
  return () => {
    if (i <= (arr.length)) {
      const sliceArr = arr.slice(i,j);
      for (const comment of sliceArr) {
        const commentsElementHTML = `<li class="social__comment">
        <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.nameAuthor}"
         width="35" height="35">
        <p class="social__text">${comment.message}</p>
        </li>`;
        document.querySelector('.social__comments').insertAdjacentHTML('beforeend', commentsElementHTML);
      }
      j = (j < arr.length) ? j : arr.length;
      document.querySelector('.comments-count').textContent = `${j} из ${arr.length}`;
      if (j === arr.length) {
        commentsLoader.classList.add('hidden');
      }
      i += COUNT_COMMENTS;
      j += COUNT_COMMENTS;
      return  i, j;
    }
  };
};


const onPopupCloseElementClick = () => {
  hideElementWindow();
  document.removeEventListener ('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideElementWindow();
    document.removeEventListener('keydown', onPopupEscKeydown);
    modalCloseElement.removeEventListener ('click', onPopupCloseElementClick);
  }
}

const openModalWindow = (arr) => {
  picturesContainer.addEventListener('click', (event) => {

    if (event.target.nodeName === 'IMG') {
      document.querySelector('.big-picture').classList.remove('hidden');
      document.body.classList.add('modal-open');
      commentsLoader.classList.remove('hidden');
      event.preventDefault();
      const currentPicture = arr[event.target.id];
      document.querySelector('.big-picture__img').firstElementChild.src = currentPicture.url;
      document.querySelector('.likes-count').textContent = currentPicture.likes;
      document.querySelector('.social__caption').textContent = currentPicture.description;
      document.querySelector('.social__comments').innerHTML = '';
      const onCommentsLoad = getComments(currentPicture.comments);
      onCommentsLoad();

      commentsLoader.addEventListener('click', onCommentsLoad);

      modalCloseElement.addEventListener ('click', onPopupCloseElementClick, {once: true});

      document.addEventListener ('keydown', onPopupEscKeydown);
    }
  });
};

export {openModalWindow};
