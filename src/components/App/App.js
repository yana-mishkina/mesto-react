import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import { api } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isPhotoViewingPopupOpen, setIsPhotoViewingPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    api.getData()
      .then(([userData, cardsList]) => {
        setCurrentUser(userData);
        setCards(cardsList);
      })
      .catch((err) => console.log(err));
  },
    []
  )

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

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editProfile(data.name, data.about)
      .then((name, about) => {
        setCurrentUser(name, about);
        closeAllPopups();
      })
      .catch((err) => console.log(err)) 
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
            isLoadingData={isLoading}
            />

          <PopupWithForm
            name="add-photo"
            title="Новое место"
            buttonText="Создать"
            loadingButtonText="Сохранение..."
            isLoadingData={isLoading}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}>
            <input type="text" placeholder="Название" className="popup__field popup__field_value_place-title" id="place-input"
              name="name" maxLength="30" minLength="2" required />
            <span className="popup__field-error place-input-error"></span>
            <input type="url" placeholder="Ссылка на картинку" className="popup__field popup__field_value_link" id="link-input"
              name="link" required />
            <span className="popup__field-error link-input-error"></span>
          </PopupWithForm>

          <ImagePopup
            name="viewing"
            card={selectedCard}
            isOpen={isPhotoViewingPopupOpen}
            onClose={closeAllPopups}
          />

          <PopupWithForm />

          <PopupWithForm
            name="delete-confirm"
            title="Вы уверены?"
            buttonText="Да"
            loadingButtonText="Удаление..."
            isLoadingData={isLoading}
          />

        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          loadingButtonText="Сохранение..."
          isLoadingData={isLoading}
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
            cards={cards}
          />

          <Footer />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
