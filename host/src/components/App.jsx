import React, {lazy, useEffect} from "react";
import ReactDOM from "react-dom/client";
import {Route, useHistory, Switch, BrowserRouter, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import '../blocks/popup/popup.css'

import "../index.css";
import InfoTooltip from "./InfoTooltip";

const Login = lazy(() => import('auth/Login').catch(() => {
    return {default: () => <div>Couldn't load Login</div>}
}));
const Registration = lazy(() => import('auth/Registration').catch(() => {
    return {default: () => <div>Couldn't load Registration</div>}
}));
const HeaderLogout = lazy(() => import('auth/HeaderLogout').catch(() => {
    return {default: () => <div>Couldn't load HeaderLogout</div>}
}));


const App = () => {
    const [currentUser, setCurrentUser] = React.useState({});
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [email, setEmail] = React.useState('');
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    React.useEffect(() => {
        api.getAppInfo()
            .then(([cardData, userData]) => {
                setCurrentUser(userData.data);
                setCards(cardData.data);
            })
            .catch((err) => {
            });
    }, [isLoggedIn]);

    const handleLogin = event => {
        setIsLoggedIn(true);
        setEmail(event.email);
        window.location.href = '/';
    }

    const toLoginPage = event => {
        setIsLoggedIn(false);
        window.location.href = '/signin';
    }

    const showRegisterExceptionPopup = event => {
        console.log('exception');
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
    }

    const handleNewCardAdded = event => {
        setCards([event.detail, ...cards]);
        closeAllPopups();
    }

    useEffect(() => {
        addEventListener('login', handleLogin);
        addEventListener('logout', toLoginPage);
        addEventListener('navigateToLoginPage', toLoginPage);
        addEventListener('register', toLoginPage);
        addEventListener('register-exception', showRegisterExceptionPopup);
        addEventListener('new-card-added', handleNewCardAdded);
        return () => {
            removeEventListener('login', handleLogin);
            removeEventListener('logout', toLoginPage);
            removeEventListener('navigateToLoginPage', toLoginPage);
            removeEventListener('register', toLoginPage);
            removeEventListener('register-exception', showRegisterExceptionPopup);
            removeEventListener('new-card-added', handleNewCardAdded);
        }
    }, []);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {

    }

    function handleCardClick(card) {

    }

    function handleCardLike(card) {

    }

    function handleCardDelete(card) {

    }

    function onSignOut() {

    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(null);
    }

    return (
        //   <div className="page__content">
        //     <Login />
        // </div>
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header email={email} HeaderLogout={<HeaderLogout email={currentUser.email}/>} onSignOut={onSignOut}/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Main closeAllPopups={closeAllPopups}/>}></Route>
                        <Route path="/signin" element={<Login/>}></Route>
                        <Route path="/signup" element={<Registration/>}></Route>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
                <InfoTooltip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                    status={tooltipStatus}
                />
            </div>
        </CurrentUserContext.Provider>
    );

}

export default App;
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
);
