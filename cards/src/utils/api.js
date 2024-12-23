class Api {

    constructor({ address, token, groupId }) {
        // стандартная реализация -- объект options
        this._token = token;
        this._groupId = groupId;
        this._address = address;

        // Запросы в примере работы выполняются к старому Api, в новом URL изменены.
      }

      getToken() {
        return localStorage.getItem('jwt');
      }

    getCardList() {
        return fetch(`${this._address}/cards`, {
          headers: {
            authorization: this.getToken(),
          },
        })
          .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
      }

      addCard({ name, link }) {
        return fetch(`${this._address}/cards`, {
          method: 'POST',
          headers: {
            authorization: this.getToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            link,
          }),
        })
          .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
      }

      removeCard(cardID) {
        return fetch(`${this._address}/cards/${cardID}`, {
          method: 'DELETE',
          headers: {
            authorization: this.getToken(),
          },
        })
          .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
      }
}


const api = new Api({
    address: 'http://localhost:3001',
    groupId: ``,
    token: `80a75492-21c5-4330-a02f-308029e94b63`,
  });

export default api;
