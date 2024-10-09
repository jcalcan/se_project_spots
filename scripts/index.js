const initialCards = [
  (obj1 = {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  }),
  (obj2 = {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  }),
  (obj3 = {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  }),
  (obj4 = {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  }),
  (obj5 = {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  }),
  (obj6 = {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  }),
];

const profileEditButton = document.querySelector(".profile__edit-btn");

const editProfileModal = document.querySelector("#edit-modal");
const closeModalButton = editProfileModal.querySelector(".modal__close-btn");

function openModal() {
  console.log(`edit button was clicked`);
  editProfileModal.classList.add("modal_opened");
}

function closeModal() {
  console.log(`closed button was clicked`);
  editProfileModal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", openModal);

closeModalButton.addEventListener("click", closeModal);
