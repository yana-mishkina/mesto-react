import React from "react";
import { api } from "../../utils/api";
import Card from "../Card/Card";

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getData()
      .then(([userData, cardsList]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsList);
      })
      .catch((err) => console.log(err));
  },
    []
  )

  return (
    <main className="content">
      <section className="profile">
        <button className="button button_type_edit-avatar profile__button" type="button" onClick={props.onEditAvatar}>
          <img className="profile__image" alt="Фото профиля" src={userAvatar} id="photo" />
          <span className="profile__edit-icon"></span>
        </button>
        <div className="profile__title-edit">
          <h1 className="profile__title">{userName}</h1>
          <button className="button button_type_edit profile__button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <h2 className="profile__subtitle">{userDescription}</h2>
        <button className="button button_type_add profile__button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
          />
        )
        )}
      </section>

    </main>
  );
}

export default Main;