const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span'
});

const hashtagPattern = /^#[А-Яа-яЁё0-9_]{2,20}$/;
const valueHashtagInput = uploadForm.querySelector('.text__hashtags').value;
const hashtags = valueHashtagInput.split(' ');

const validateHashtag = () => {
  hashtags.forEach ((item) => {
    const valid = hashtagPattern.test(item);
  });
};

const duplicatHashtag = () => {
  let i = 1;
  hashtags.forEach ((item) => {
    hashtags.includes(item.toLowerCase(), i);
    i++;
  });
};

const lengthHashtag = () => {
  if (hashtags.length <= 5) {
    return true;
  }
};

pristine.addValidator(valueHashtagInput, validateHashtag, '���-��� ������ ���������� � #, �� ��������� ���� �������� � ��������, �� ��������� 20 ��������');

pristine.addValidator(valueHashtagInput, duplicatHashtag, '������ ���-��� �.�. ����������');

pristine.addValidator(valueHashtagInput, lengthHashtag, '������ ��������� ������ ���� ���-�����');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
