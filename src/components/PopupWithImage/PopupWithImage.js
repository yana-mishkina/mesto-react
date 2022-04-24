import React from 'react';
import closeIcon from '../../images/Close_Icon.svg'

function PopupWithImage() {

  return (
    <section className="popup popup_viewing">
          <button className="button button_viewing button_type_resert popup__button" type="reset">
            <img className="button__icon" alt="Иконка закрытия попапа" src={closeIcon} />
          </button>
          <figure className="popup__photo-container">
            <img className="popup__photo" alt="Название места" src="#" />
            <figcaption className="popup__photo-title"></figcaption>
          </figure>
        </section>
  )
}

export default PopupWithImage;