function HeaderLogout({ email }) {

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        sessionStorage.removeItem("jwt");
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        // history.push("/signin");
        dispatchEvent(new Event('logout'));
      }

    return <div className="header__wrapper">
    <p className="header__user">{ email }</p>
    <button className="header__logout" onClick={onSignOut}>Выйти</button>
  </div>;
}

export default HeaderLogout;
