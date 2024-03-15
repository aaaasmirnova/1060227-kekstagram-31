import {picturesContainer, photosDescription} from './photo-thumbnail.js';

const bigPictureContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const image = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const descriptionPhoto = bigPictureContainer.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment')?.content?.querySelector('.social__comment');
const socialCommentsList = bigPictureContainer.querySelector('.social__comments');
const socialCommentCount = bigPictureContainer.querySelector('.social__comment-count');
//const commentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const COMMENTS_NUMBER = 5;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

const commentFragment = document.createDocumentFragment();

const createOneComment = (comment) => {
  const commentTemplateClone = commentTemplate.cloneNode(true);
  commentTemplateClone.querySelector('.social__picture').src = comment.avatar;
  commentTemplateClone.querySelector('.social__picture').alt = comment.name;
  commentTemplateClone.querySelector('.social__text').textContent = comment.message;
  commentFragment.appendChild(commentTemplateClone);
  socialCommentsList.appendChild(commentFragment);
};


const createCommentsList = (comment) => {
  for (let i = 0; i < Math.min(COMMENTS_NUMBER, comment.lenght); i++) {
    createOneComment(comment[i]);
  }
};

picturesContainer.addEventListener('click', (evt) => {
  photosDescription.forEach(({ id, url, likes, description, comments }) => {
    if ((Number(evt.target.closest('.picture')?.dataset.pictureId)) === id) {
      openBigPicture();
      image.src = url;
      likesCount.textContent = likes;
      descriptionPhoto.textContent = description;
      commentTotalCount.textContent = comments.length;
      socialCommentsList.innerHTML = '';
      createCommentsList(comments);
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
    }
  });
});


