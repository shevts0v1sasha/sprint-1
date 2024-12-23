import React, {lazy} from 'react';
import {Route, Link, Routes, BrowserRouter} from 'react-router-dom';

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
function Header({email, HeaderLogout}) {

    function toLoginPage() {
        window.location.href = '/signin'
    }

    function toRegistrationPage() {
        window.location.href = '/signup'
    }

    return (
        <header className="header page__section">
            <BrowserRouter>
                <img src={'./images/logo.svg'} alt="Логотип проекта Mesto" className="logo header__logo"/>
                <Routes>
                    <Route exact path="/" element={HeaderLogout}>
                    </Route>
                    <Route path="/signup" element={<button className="header__auth-link" onClick={toLoginPage}>Войти</button>}>
                    </Route>
                    <Route path="/signin" element={<button className="header__auth-link" onClick={toRegistrationPage}>Регистрация</button>}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </header>
    )
}

export default Header;
