import React, { lazy } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const ProfileSection = lazy(() => import('auth/ProfileSection').catch(() => {
  return { default: () => <div>Couldn't load profile section</div>}
}));
const ContentSection = lazy(() => import('cards/ContentSection').catch(() => {
  return { default: () => <div>Couldn't load content section</div>}
}));
const AddPlaceButton = lazy(() => import('cards/AddPlaceButton').catch(() => {
    return { default: () => <div>Couldn't load AddPlaceButton</div>}
}));

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  console.log(currentUser);


  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <main>
            <ProfileSection currentUser={currentUser}/>
            {/*<AddPlaceButton/>*/}
      <ContentSection currentUser={currentUser} closeAllPopups={props.closeAllPopups}/>
    </main>
  );
}

export default Main;
