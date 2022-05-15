import React from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="button button_type_edit-avatar profile__button"
          type="button"
          onClick={props.onEditAvatar}
        >
          <img
            className="profile__image"
            alt="Фото профиля"
            src={currentUser.avatar}
            id="photo"
          />
          <span className="profile__edit-icon"></span>
        </button>
        <div className="profile__title-edit">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="button button_type_edit profile__button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <h2 className="profile__subtitle">{currentUser.about}</h2>
        <button
          className="button button_type_add profile__button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;