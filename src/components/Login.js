import { GoogleAuthProvider } from 'firebase/auth';
import Toastify from 'toastify-js';
import { authGoogle, loginEmail } from '../lib/service';

export const Login = (onNavigate) => {
  // Creando estructura
  const divContainer = document.createElement('div');
  const divLogo = document.createElement('div');
  const divHeader = document.createElement('div');
  const logo = document.createElement('img');
  const divForm = document.createElement('div');
  const form = document.createElement('form');
  // const iconBack = document.createElement('i');
  // const divLogin = document.createElement('div');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const labelPassword = document.createElement('label');
  const inputPassword = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const divGmail = document.createElement('div');
  const buttonGoogle = document.createElement('img');
  const logIn = document.createElement('h2');
  const register = document.createElement('p');
  const registerhref = document.createElement('h3');

  // Asignando clases
  divContainer.classList.add('divContainer');
  divLogo.classList.add('divLogo');
  divHeader.classList.add('divHeader');
  logo.classList.add('logo');
  divForm.classList.add('divForm');
  // divLogin.classList.add('divLogin');
  form.classList.add('form');
  labelEmail.classList.add('label');
  inputEmail.classList.add('input');
  labelPassword.classList.add('label');
  inputPassword.classList.add('input');
  buttonLogin.classList.add('buttonLo');
  divGmail.classList.add('divGmail');
  buttonGoogle.classList.add('google');
  register.classList.add('register');
  registerhref.classList.add('signUp');
  logIn.classList.add('logIn');

  // Dando contenido a los elementos

  logo.src = '../assets/imagenes/citi-pq.png';
  buttonGoogle.src = '../assets/imagenes/google_1x.png';
  logIn.textContent = 'Inicia sesión';
  inputEmail.type = 'email';
  labelEmail.textContent = 'Email';
  inputEmail.placeholder = 'usuario@usuario.com';
  inputPassword.type = 'password';
  labelPassword.textContent = 'Contraseña';
  inputPassword.placeholder = '**************';
  buttonLogin.textContent = 'Ingresar';
  buttonGoogle.textContent = 'Ingresar con Google';
  register.textContent = '¿Aún no tienes una cuenta?';
  registerhref.setAttribute('href', '/register');
  registerhref.textContent = 'Regístrate';

  // Asignando padres e hijos
  divLogo.appendChild(logo);
  divHeader.appendChild(divLogo);
  divForm.appendChild(form);
  form.append(divHeader, labelEmail, inputEmail, labelPassword, inputPassword, buttonLogin);
  divContainer.append(divLogo, logIn, divForm, buttonGoogle, register, registerhref);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    // console.log(email, password);
    if (emailValue === '' || passwordValue === '') {
      Toastify({
        text: 'Completa el campo',
        duration: 700,
        style: {
          background: 'linear-gradient(to right, #f2a71b, #bf522a)',
        },
      }).showToast();
    } else if (emailValue && passwordValue) {
      loginEmail(emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          if (!user.emailVerified) {
            // alert('Por favor verifica el email');
            Toastify({
              text: 'Por favor verifica el email',
              duration: 2000,
              style: {
                background: 'linear-gradient(to right, #F2BC57, #F24495)',
              },
            }).showToast();
            return;
          }
          onNavigate('/wall');
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            Toastify({
              text: 'Correo no válido',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          } else if (errorCode === 'auth/wrong-password') {
            Toastify({
              text: 'Contraseña incorrecta',
              duration: 700,
              style: {
                background: 'linear-gradient(to right, #f2a71b, #bf522a)',
              },
            }).showToast();
          }
        });
    }
  });

  buttonGoogle.addEventListener('click', () => {
    const userGoogle = GoogleAuthProvider;
    // const authUserGoogle = window.history.pushState(onNavigate('/wall'));

    authGoogle(userGoogle)
      .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        onNavigate('/wall');
        // ...
        // return authUserGoogle;
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        // ...
      });
  });
  registerhref.addEventListener('click', () => onNavigate('/register'));
  return divContainer;
};
