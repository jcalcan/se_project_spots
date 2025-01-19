import { Api } from "../utils/api.js";
import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from "../scripts/validation.js";
import { handleSubmit } from "../utils/utils.js";

const initialCards = [];
const api = new Api();

const profileAvatarEditModal = document.querySelector("#avatar-edit-modal");

const profileAvatarInput = profileAvatarEditModal.querySelector(
  "#edit-avatar-link-input"
);
const profileAvatarSaveButton =
  profileAvatarEditModal.querySelector(".modal__submit-btn");

const profileEditButton = document.querySelector(".profile__edit-btn");
const addPostButton = document.querySelector(".profile__add-btn");
const profileImage = document.querySelector(".profile__avatar");
const editProfileModal = document.querySelector("#edit-modal");
const addPostModal = document.querySelector("#add-card-modal");
const imageZoomModal = document.querySelector("#card-image-modal");

const buttonElement = addPostModal.querySelector(".modal__submit-btn");
const closeButtons = document.querySelectorAll(".modal__close-btn");

const profileNameInput = editProfileModal.querySelector("#modal__input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#modal__description"
);
const profileDescriptionSaveButton =
  editProfileModal.querySelector(".modal__submit-btn");

const profileUserName = document.querySelector(".profile__name");
const profileUserDescription = document.querySelector(".profile__description");
const profileForm = document.querySelector(".modal__form");
const addModalForm = document.querySelector("#add-card-form");

const addModalFormLink = addModalForm.querySelector("#add-card-link-input");
const addModalFormCaption = addModalForm.querySelector("#add-card-name-input");
const modalImage = document.querySelector(".modal__image");
const modalFooterCaption = document.querySelector(".modal__image-footer-title");

const modalConfirmDelete = document.querySelector("#delete-card-modal");
const closeDeleteModalButton = modalConfirmDelete.querySelector(
  ".modal__close_delete-btn"
);
const cancelDeleteModalButton = modalConfirmDelete.querySelector(
  ".modal__confirm_cancel-btn"
);
const modalConfirmDeleteBtn = modalConfirmDelete.querySelector(
  ".modal__confirm_delete-btn"
);

const cardContentContainer = document.querySelector(".cards__pics");

const cardHeartButton = cardContentContainer.querySelector(
  ".card__footer-heart-btn"
);

const closeModalListener = (event) => {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
};

function openModal(modal, closeCallBack) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", closeModalListener);
  modal.closeCallBack = closeCallBack;

  document.addEventListener("keydown", closeModalEscapeListener);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");

  modal.removeEventListener("click", closeModalListener);
  document.removeEventListener("keydown", closeModalEscapeListener);

  if (typeof modal.closeCallBack === "function") {
    modal.closeCallBack();
    modal.closeCallBack = null;
  }
}

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return api
      .editUserInfo({
        name: profileNameInput.value,
        about: profileDescriptionInput.value,
      })
      .then((data) => {
        profileUserName.textContent = data.name;
        profileUserDescription.textContent = data.about;

        closeModal(editProfileModal);
      });
  }
  handleSubmit(makeRequest, evt);
}

function handleProfileEditAvatar(evt) {
  function makeRequest() {
    return api.updateUserAvatar(profileAvatarInput.value).then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(profileAvatarEditModal);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handlePostFormSubmit(evt) {
  function makeRequest() {
    return api
      .createCard({
        name: addModalFormCaption.value,
        link: addModalFormLink.value,
      })
      .then((data) => {
        const newCard = {
          name: data.name,
          link: data.link,
          isLiked: data.isLiked,
          _id: data._id,
          owner: data.owner,
        };
        if (addModalFormCaption.value !== "" && addModalFormLink.value !== "") {
          initialCards.unshift(newCard);

          cardContentContainer.prepend(getCardElement(newCard));
          closeModal(addPostModal);
        }
        addModalFormCaption.value = "";
        addModalFormLink.value = "";

        const inputList = Array.from(
          addPostModal.querySelectorAll(".modal__input")
        );

        toggleButtonState(inputList, buttonElement, settings);
      });
  }
  handleSubmit(makeRequest, evt);
}

function getCardElement(data) {
  const cardElement = document
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);

  cardElement.querySelector(".card__footer-title").textContent = data.name;

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardImage.id = data._id;

  const cardHeartBtn = cardElement.querySelector(".card__footer-heart-btn");

  if (data.isLiked) {
    cardHeartBtn.classList.add("card__footer-heart-btn-liked");
  }

  cardHeartBtn.addEventListener("click", () => {
    handleLikeButton(cardHeartBtn, data);
  });

  const cardTrashButton = cardElement.querySelector(".card__trash-btn");

  cardTrashButton.addEventListener("click", () => {
    handleDeleteButton(cardElement, cardImage.id);
  });

  cardImage.addEventListener("click", () => {
    openImageModal(cardElement);
  });

  return cardElement;
}
function handleLikeButton(cardEl, data) {
  const updatedLikedState = !data.isLiked;

  const apiCall = updatedLikedState
    ? api.likeCard(data._id)
    : api.dislikeCard(data._id);

  return apiCall
    .then((updatedCard) => {
      cardEl.classList.toggle("card__footer-heart-btn-liked");

      data.isLiked = updatedCard.isLiked;
    })
    .catch(console.error);
}

function handleDeleteButton(cardEl, cardId) {
  const removeListener = confirmCardDelete(cardEl, cardId);
  openModal(modalConfirmDelete, removeListener);

  closeDeleteModalButton.onclick = () => closeModal(modalConfirmDelete);

  cancelDeleteModalButton.onclick = () => closeModal(modalConfirmDelete);
}

function confirmCardDelete(cardEl, cardId) {
  const deleteConfirmationHandler = () => {
    modalConfirmDeleteBtn.innerText = "Deleting...";
    api
      .deleteCard(cardId)
      .then(() => {
        const cardName = cardEl.querySelector(".card__image").alt;
        const index = initialCards.findIndex((card) => card.name === cardName);
        initialCards.splice(index, 1);
        cardEl.remove();
        closeModal(modalConfirmDelete);
      })
      .catch(console.error)
      .finally(() => {
        modalConfirmDeleteBtn.innerText = "Delete";
      });
    removeListener();
  };

  const removeListener = () => {
    modalConfirmDeleteBtn.removeEventListener(
      "click",
      deleteConfirmationHandler
    );
  };

  modalConfirmDeleteBtn.addEventListener("click", deleteConfirmationHandler);

  return removeListener;
}

function openImageModal(cardEl) {
  const cardImage = cardEl.querySelector(".card__image");
  const modalCaption = cardEl.querySelector(".card__footer-title");

  modalFooterCaption.textContent = modalCaption.textContent;

  modalImage.src = "";

  openModal(imageZoomModal);

  modalImage.src = cardImage.src;
  modalImage.alt = cardImage.alt;
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileUserDescription.textContent;
  resetValidation(
    editProfileModal,
    [profileNameInput, profileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

addPostButton.addEventListener("click", () => {
  openModal(addPostModal);
});

cancelDeleteModalButton.addEventListener("click", () => {
  closeModal(modalConfirmDelete);
});

const closeModalEscapeListener = (event) => {
  if (event.key === "Escape") {
    const openModals = document.querySelectorAll(".modal_opened");
    openModals.forEach(closeModal);
  }
};

function closeModalEscape(evt, modal, callback) {
  if (evt.key === "Escape") {
    closeModal(modal);
    if (callback) callback();
  }
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
addModalForm.addEventListener("submit", handlePostFormSubmit);
profileAvatarEditModal.addEventListener("submit", handleProfileEditAvatar);

api
  .getAppInfo()
  .then(([userData, cards]) => {
    profileUserName.textContent = userData.name;
    profileUserDescription.textContent = userData.about;
    profileImage.id = userData._id;

    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    profileImage.addEventListener("click", () => {
      openModal(profileAvatarEditModal);
    });

    cards.forEach((item) => {
      cardContentContainer.append(getCardElement(item));
    });
  })
  .catch(console.error);

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

enableValidation(settings);
