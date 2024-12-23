import '../blocks/profile/profile.css';

export default function ProfileSection({ currentUser }) {
    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    return <section className="profile page__section">
    <div className="profile__image" style={imageStyle}></div>
    <div className="profile__info">
      <h1 className="profile__title">{currentUser.name}</h1>
      <button className="profile__edit-button" type="button"></button>
      <p className="profile__description">{currentUser.about}</p>
    </div>
  </section>;
}
