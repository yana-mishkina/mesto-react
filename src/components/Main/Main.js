import React from "react";
import { api } from "../../utils/api";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.addLike(card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard)
        // setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err));
} 

  return (
    <main className="content">
      <section className="profile">
        <button className="button button_type_edit-avatar profile__button" type="button" onClick={props.onEditAvatar}>
          <img className="profile__image" alt="Фото профиля" src={currentUser.avatar} id="photo" />
          <span className="profile__edit-icon"></span>
        </button>
        <div className="profile__title-edit">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="button button_type_edit profile__button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <h2 className="profile__subtitle">{currentUser.about}</h2>
        <button className="button button_type_add profile__button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={handleCardLike}
          />
        )
        )}
      </section>

    </main>
  );
}

export default Main;