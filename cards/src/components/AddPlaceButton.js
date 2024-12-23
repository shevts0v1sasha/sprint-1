import '../blocks/profile/profile.css'

function AddPlaceButton({ handleAddPlace }) {

    return (
        <button onClick={handleAddPlace} className="profile__add-button" type="button"></button>
    );
}

export default AddPlaceButton;
