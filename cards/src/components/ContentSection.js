import React, { useEffect, useState } from "react";
import Card from "./Card";
import api from "../utils/api";
import '../blocks/places/places.css';
import AddPlaceButton from "./AddPlaceButton";
import AddPlacePopup from "./AddPlacePopup";

export default function ContentSection({ currentUser, closeAllPopups }) {
    const [cards, setCards] = useState([]);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    useEffect(() => {
        api.getCardList()
        .then(response => {
            setCards(response.data);
        })
    }, []);

    function onCardClick(card) {
        console.log(card);
    }

    function onCardLike(card) {
        console.log(card);
    }

    function onCardDelete(card) {
        console.log(card);
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    return <section className="places page__section">
        <div style={{display: "flex", alignItems: "center", justifyContent: "right", marginBottom: "16px"}}>
            <button onClick={() => setIsAddPlacePopupOpen(true)} className="profile__add-button" type="button"></button>
        </div>
    <ul className="places__list">
      {cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
          currentUser={currentUser}
        />
      ))}
    </ul>
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
        />
  </section>;
}
