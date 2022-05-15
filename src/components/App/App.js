import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ImagePopup from "../ImagePopup/ImagePopup";
import { api } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import DeleteConfirmPopup from "../DeleteConfirmPopup/DeleteConfirmPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isPhotoViewingPopupOpen, setIsPhotoViewingPopupOpen] =
    React.useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardForDelete, setCardForDelete] = React.useState({});

  React.useEffect(() => {
    api
      .getData()
      .then(([userData, cardsList]) => {
        setCurrentUser(userData);
        setCards(cardsList);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(cardForDelete._id)
      .then(() => {
        const newCards = cards.filter(
          (currentCard) => currentCard !== cardForDelete
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPhotoPopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteConfirmPopupOpen(card) {
    setCardForDelete(card);
    setIsDeleteConfirmPopupOpen(true);
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
    setIsDeleteConfirmPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data.name, data.about)
      .then((name, about) => {
        setCurrentUser(name, about);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data.avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
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

          <AddPlacePopup
            isLoadingData={isLoading}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup
            name="viewing"
            card={selectedCard}
            isOpen={isPhotoViewingPopupOpen}
            onClose={closeAllPopups}
          />

          <DeleteConfirmPopup
            isOpen={isDeleteConfirmPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            isLoadingData={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isLoadingData={isLoading}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <Header />

          <Main
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPhotoPopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteConfirmPopupOpen}
          />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
