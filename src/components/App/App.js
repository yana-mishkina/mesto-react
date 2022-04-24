import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import PopupWithImage from "../PopupWithImage/PopupWithImage";
import { api } from "../../utils/api";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isPhotoViewingPopupOpen, setIsPhotoViewingPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPhotoPopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsPhotoViewingPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPhotoViewingPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <div className="App">
      <div className="page">

        <PopupWithForm 
          name="edit-profile"
          title="Редактировать профиль"
          button="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
            <input type="text" className="popup__field popup__field_value_name" id="name-input" name="name"
              maxLength="40" minLength="2" required />
            <span className="popup__field-error name-input-error"></span>
            <input type="text" className="popup__field popup__field_value_job" id="job-input" name="job"
              maxLength="200" minLength="2" required />
            <span className="popup__field-error job-input-error"></span>
        </PopupWithForm>

        <PopupWithForm 
          name="add-photo"
          title="Новое место"
          button="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
            <input type="text" placeholder="Название" className="popup__field popup__field_value_place-title" id="place-input"
              name="name" maxLength="30" minLength="2" required />
            <span className="popup__field-error place-input-error"></span>
            <input type="url" placeholder="Ссылка на картинку" className="popup__field popup__field_value_link" id="link-input"
              name="link" required /> 
            <span className="popup__field-error link-input-error"></span>
        </PopupWithForm>

        <PopupWithImage
          name="viewing"
          card={selectedCard}
          isOpen={isPhotoViewingPopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm 
          name="delete-confirm"
          title="Вы уверены?"
          button="Да"
        />

        <PopupWithForm 
          name="edit-avatar"
          title="Обновить аватар"
          button="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
            <input type="url" placeholder="Ссылка на фото"
              className="popup__field popup__field_value_link popup__field_type_edit-avatar" id="link-input-avatar"
              name="avatar" required />
            <span className="popup__field-error link-input-avatar-error"></span>
        </PopupWithForm>

        <Header />

        <Main 
        onEditProfile={handleEditProfilePopupOpen}
        onAddPlace={handleAddPhotoPopupOpen}
        onEditAvatar={handleEditAvatarPopupOpen}
        onCardClick={handleCardClick}
        />
        
        <Footer />

      </div>
      </div>
  );
}

export default App;
