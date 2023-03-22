import Toastify from 'toastify-js';
// import { showMessage } from '../helpers/fb_api.js';
import { registerUser, sendEmail, showName } from '../lib/service.js';

export const Register = (onNavigate) => {
  // Creando estructura
  const divRegister = document.createElement('div');
  const divLogo = document.createElement('div');
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  const divForm = document.createElement('div');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const inputRePassword = document.createElement('input');
  const buttonRegister = document.createElement('button');

  // Asignando clases
  logo.classList.add('logo');
  divLogo.classList.add('divLogo');
  divRegister.classList.add('divRegister');
  divForm.classList.add('divForm');
  buttonRegister.classList.add('buttonRe');
  inputName.classList.add('input');
  inputEmail.classList.add('input');
  inputPassword.classList.add('input');
  inputRePassword.classList.add('input');
  title.classList.add('title');

  // Dando contenido a los elementos
  logo.src = '../assets/imagenes/citi-pq.png';
  title.textContent = 'Regístrate';
  inputName.placeholder = 'Nombre de Usuario';
  inputEmail.placeholder = 'usuario@usuario.com';
  inputEmail.type = 'email';
  inputPassword.placeholder = 'Crea Contraseña';
  inputPassword.type = 'password';
  inputRePassword.placeholder = 'Repite Contraseña';
  inputRePassword.type = 'password';
  buttonRegister.textContent = 'Crea tu cuenta';

  // Dando contenido a los elementos
  divLogo.appendChild(logo);
  divForm.appendChild(form);
  form.append(inputName, inputEmail, inputPassword, inputRePassword, buttonRegister);
  divRegister.append(divLogo, title, divForm);

  // Asignando funcionalidad
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('click');
    const nameValue = inputName.value;
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    const repeatPassValue = inputRePassword.value;
    // console.log(nameValue, emailValue, passwordValue, repeatPassValue);
    if (nameValue === '') {
      Toastify({
        text: 'Ingresa un usuario',
        duration: 700,
        style: {
          background: 'linear-gradient(to right, #F2BC57, #F24495)',
        },
      }).showToast();
    } else if (passwordValue !== repeatPassValue) {
      Toastify({
        text: 'La contraseña no coincide',
        duration: 700,
        style: {
          background: 'linear-gradient(to right, #F2BC57, #F24495)',
        },
      }).showToast();
    } else if (nameValue && emailValue && passwordValue && repeatPassValue) {
      registerUser(emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          sendEmail()
            .then(() => {
              showName(nameValue)
                .then(() => {
                  Toastify({
                    text: 'Verifica tu email',
                    duration: 2000,
                    style: {
                      background: 'linear-gradient(to right, #F2BC57, #F24495)',
                    },
                  }).showToast();
                  onNavigate('/login');
                });
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            Toastify({
              text: 'Email inválido',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #F2BC57, #F24495)',
              },
            }).showToast();
          } else if (errorCode === 'auth/email-already-in-use') {
            Toastify({
              text: 'El correo ya existe',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #F2BC57, #F24495)',
              },
            }).showToast();
          } else if (errorCode === 'auth/invalid-password') {
            Toastify({
              text: 'Contraseña inválida',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #F2BC57, #F24495)',
              },
            }).showToast();
          } else if (errorCode === 'auth/weak-password') {
            Toastify({
              text: 'Ingrese al menos 6 caracteres',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #F2BC57, #F24495)',
              },
            }).showToast();
          }
        });
    }
  });
  return divRegister;
};
