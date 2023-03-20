import Toastify from 'toastify-js';
// estas son las constantes para poder interactuar con la API que va a permitir
// consumir los datos a la SPA (esto es lo que necesitamos consultar)
// message es lo que se va a mostrar y type es para que determine si es un error
export function showMessage(message, type = 'success') {
  Toastify({
    text: message,
    duration: 5000,
    style: {
      background: type === 'success' ? 'green' : 'red',
    },
  }).showToast();
}
const NAME = 'city-fest';
const DOMAIN = `https://${NAME}firebaseapp.com`;
const SITE = `${DOMAIN}/wp-json`;

export default {
  NAME,
  DOMAIN,
  SITE,
};
