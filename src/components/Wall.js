import Toastify from 'toastify-js';
import {
  createPost, logout, print, deletePost, getCurrentUser,
} from '../lib/service';

export const Wall = (onNavigate) => {
  // Creando estructura
  const divWall = document.createElement('div');
  const divLogo = document.createElement('div');
  const divPost = document.createElement('div');
  const divShowPost = document.createElement('div');
  const logo = document.createElement('img');
  const title = document.createElement('h3');
  const formPost = document.createElement('form');
  const post = document.createElement('textarea');
  const buttonPublish = document.createElement('button');
  const buttonLogout = document.createElement('button');

  // Asignando clases
  divLogo.classList.add('divLogo');
  logo.classList.add('logo');
  divPost.classList.add('div-post');
  formPost.classList.add('formPost');
  post.classList.add('post');
  buttonPublish.classList.add('button');
  buttonLogout.classList.add('buttonLogout');
  title.classList.add('title');

  // Dando contenido a los elementos
  logo.src = '../assets/imagenes/citi-pq.png';
  title.textContent = 'Escribe el evento acá:';
  post.placeholder = 'Evento, fecha y lugar';
  post.autocomplete = 'off';
  buttonPublish.textContent = 'Publicar';
  /* buttonPublish.type = 'submit'; */
  buttonLogout.textContent = 'Salir';

  // Asignando padres e hijos
  divLogo.appendChild(logo);
  formPost.append(post, buttonPublish);
  divPost.append(formPost);
  divWall.append(divLogo, title, divPost, divShowPost, buttonLogout);

  formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const postValue = post.value;
    // console.log(postValue);
    if (postValue === '') {
      Toastify({
        text: 'El post no puede estar vacío',
        duration: 3000,
        style: {
          background: 'linear-gradient(to right, #f8a72b, #bf523a)',
        },
      }).showToast();
    }
    createPost(postValue).then((doc) => {
      formPost.reset(doc);
    }).catch((error) => console.log(error));
    console.log(postValue);
  });

  print((querySnapshot) => {
    /* console.log('Este es la consulta', querySnapshot); */
    let saveShow = '';
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log('Identificador doc', doc.id, ' => ', 'Identificador usuario', doc.data());
      const dataPost = doc.data();
      const savePostUser = doc.data().uid;
      const userPost = savePostUser === getCurrentUser().uid;
      // console.log(userPost);
      // console.log('Identificar propiedades post', dataPost);
      // console.log('Identificar usuario', savePostUser);
      const datePost = dataPost.timestamp ? dataPost.timestamp.toDate() : '';
      const date = new Date(datePost).toLocaleDateString();
      saveShow += `
      <div class="show-data">
      <p> ${dataPost.name}</p>
      <div class="date">
      <p> ${date}</p>
      </div>
      <div class="comment-post">
     <p> ${dataPost.comment}</p>
     </div>
     <div class="btn">
     ${userPost ? `<button class="delete none" data-id="${doc.id}"> Eliminar </button>` : ''} 
     </div>
     </div>`;
    });
    divShowPost.innerHTML = saveShow;

    const postDelete = divShowPost.querySelectorAll('.delete');
    // console.log(postDelete);
    postDelete.forEach((element) => {
      element.addEventListener('click', (event) => {
        // console.log(event.target.dataset.id);
        // console.log(getCurrentUser().uid);
        // eslint-deshabilitar no-alert, no-restricted-globals:
        const confirmDelete = confirm('Seguro quiere eliminar');
        if (confirmDelete) {
          deletePost(event.target.dataset.id);
        }
      });
    });
  });

  buttonLogout.addEventListener('click', () => {
    logout()
      .then(() => {
        // Sign-out successful.npm
      }).catch((error) => {
        console.log(error);
      });
    onNavigate('/');
  });
  return divWall;
};

// <button id="btn-edit"> Editar </button>
