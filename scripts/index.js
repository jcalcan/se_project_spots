const initialCards = [
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
const editProfileModal = document.querySelector("#edit-modal");
const closeModalButton = editProfileModal.querySelector(".modal__close-btn");

const profileNameInput = editProfileModal.querySelector("#name");
const profileDescriptionInput = editProfileModal.querySelector("#description");

const profileUserName = document.querySelector(".profile__name");
const profileUserDescription = document.querySelector(".profile__description");
const saveModalForm = document.querySelector(".modal__form");

let cardContentContainer = document.querySelector(".cards__pics");

function openModal() {
  editProfileModal.classList.add("modal_opened");
  profileNameInput.value = profileUserName.textContent;
  profileDescriptionInput.value = profileUserDescription.textContent;
}

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileUserName.textContent = profileNameInput.value;
  profileUserDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

function getCardElement(data) {
  let cardElement = document
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;
  cardElement.querySelector(".card__footer-title").textContent = data.name;

  return cardElement;
}

profileEditButton.addEventListener("click", openModal);

closeModalButton.addEventListener("click", closeModal);
saveModalForm.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  cardContentContainer.append(getCardElement(initialCards[i]));
}
