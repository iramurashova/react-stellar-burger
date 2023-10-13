import { domenAdress } from "./constants";
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
export default function request() {
  return fetch(domenAdress).then(checkResponse);
}
