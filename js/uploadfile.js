import './formvalidation.js';

const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const editPictureForm = document.querySelector('.img-upload__overlay');
const modalCloseElement = document.querySelector('#upload-cancel');

const onPopupEscKeydown = hidePopupEscKeydown;

const onPopupCloseElementClick = () => {
  editPictureForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener ('keydown', onPopupEscKeydown);
};

function hidePopupEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    editPictureForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    modalCloseElement.removeEventListener ('click', onPopupCloseElementClick);
  }
}

const openPictureForm = () => {
  uploadFile.addEventListener('change', () => {
    editPictureForm.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    modalCloseElement.addEventListener('click', onPopupCloseElementClick, {once: true});
    document.addEventListener ('keydown', onPopupEscKeydown);
    uploadForm.reset();
  });
};

export {openPictureForm};
