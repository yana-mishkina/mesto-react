import React from "react";
import { api } from "../../utils/api";
// import Card from "../Card/Card";
import deleteCardLogo from '../../images/Trash_button.svg'

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState();

  React.useEffect(() => {
    api.getData()
      .then(( [userData, cardsList] ) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsList);
      })
      .catch((err) => console.log(err));
  }

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

      <section class="elements">
      {cards.map(card => {
      return (
        <div className="element">
          <img className="element__photo" alt={card.name} src={card.link} />
          <h2 className="element__title">{card.name}</h2>
          <div className="element__likes">
            <button className="button button_type_like element__button element__button_disabled" type="button"></button>
            <span className="element__like-count"></span>
          </div>
          <button className="button button_type_delete element__button" type="reset">
            <img className="button__icon button__icon_type_delete" alt="Иконка удаления фото"
              src={deleteCardLogo} />
          </button>
        </div>
      )
    })}
      </section>

    </main>
  );
}

export default Main;