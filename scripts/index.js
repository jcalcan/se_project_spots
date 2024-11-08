const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const addPostButton = document.querySelector(".profile__add-btn");
const editProfileModal = document.querySelector("#edit-modal");
const addPostModal = document.querySelector("#add-card-modal");
const imageZoomModal = document.querySelector("#card-image-modal");
const profileCloseButton = editProfileModal.querySelector(".modal__close-btn");
const closePostModalButton = addPostModal.querySelector(".modal__close-btn");
const closeZoomModalButton = imageZoomModal.querySelector(".modal__close-btn");

const profileNameInput = editProfileModal.querySelector("#name");
const profileDescriptionInput = editProfileModal.querySelector("#description");

const profileUserName = document.querySelector(".profile__name");
const profileUserDescription = document.querySelector(".profile__description");
const profileForm = document.querySelector(".modal__form");
const addModalForm = document.querySelector("#add-card-form");

const addModalFormLink = addModalForm.querySelector("#add-card-link-input");
const addModalFormCaption = addModalForm.querySelector("#add-card-name-input");
const modalImage = document.querySelector(".modal__image");

const cardContentContainer = document.querySelector(".cards__pics");

const cardHeartButton = cardContentContainer.querySelector(
  ".card__footer-heart-btn"
);

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileUserName.textContent = profileNameInput.value;
  profileUserDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handlePostFormSubmit(evt) {
  evt.preventDefault();

  let newCard = {
    name: addModalFormCaption.value,
    link: addModalFormLink.value,
  };
  if (addModalFormCaption.value !== "" && addModalFormLink.value !== "") {
    initialCards.unshift(newCard);

    cardContentContainer.prepend(getCardElement(newCard));

    closeModal(addPostModal);
  }

  addModalFormCaption.value = "";
  addModalFormLink.value = "";
}

function getCardElement(data) {
  let cardElement = document
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);

  cardElement.querySelector(".card__footer-title").textContent = data.name;

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;

  const cardHeartBtn = cardElement.querySelector(".card__footer-heart-btn");

  cardHeartBtn.addEventListener("click", () => {
    handleLikeButton(cardHeartBtn);
  });

  const cardTrashButton = cardElement.querySelector(".card__trash-btn");

  cardTrashButton.addEventListener("click", () => {
    handleDeleteButton(cardElement);
  });

  const cardPreviewImage = cardElement.querySelector(".card__image");
  cardPreviewImage.addEventListener("click", () => {
    openImageModal(cardElement);
  });

  return cardElement;
}
function handleLikeButton(cardEl) {
  cardEl.classList.toggle("card__footer-heart-btn-liked");
}

function handleDeleteButton(cardEl) {
  const cardName = cardEl.alt;

  const index = initialCards.findIndex((card) => card.name === cardName);

  initialCards.toSpliced(1, index);
  cardEl.remove();
}

function openImageModal(cardEl) {
  const cardImage = cardEl.querySelector(".card__image");
  const modalCaption = cardEl.querySelector(".card__footer-title");

  const modalFooterCaption = document.querySelector(
    ".modal__image-footer-title"
  );
  modalFooterCaption.textContent = modalCaption.textContent;

  modalImage.src = "";

  openModal(imageZoomModal);

  modalImage.src = cardImage.src;
  modalImage.alt = cardImage.alt;
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileUserDescription.textContent;
  openModal(editProfileModal);
});

addPostButton.addEventListener("click", () => {
  openModal(addPostModal);
});

profileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

closePostModalButton.addEventListener("click", () => {
  closeModal(addPostModal);
});

closeZoomModalButton.addEventListener("click", () => {
  closeModal(imageZoomModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
addModalForm.addEventListener("submit", handlePostFormSubmit);

initialCards.forEach((item) => {
  cardContentContainer.append(getCardElement(item));
});
