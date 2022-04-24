import deleteCardLogo from '../../images/Trash_button.svg'

function Card(props) {

  return (
    <div className="element">
      <img className="element__photo" alt={props.card.name} src={props.card.link} />
      <h2 className="element__title">{props.card.name}</h2>
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
}

export default Card;