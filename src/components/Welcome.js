export const Welcome = (onNavigate) => {
  const container = document.createElement('div');
  const divLogo = document.createElement('div');
  const logo = document.createElement('img');
  const divtexto = document.createElement('div');
  const textW = document.createElement('h2');
  const buttonWelcome = document.createElement('button');

  container.classList.add('container');
  divLogo.classList.add('divLogo');
  logo.classList.add('logo');
  divtexto.classList.add('divtexto');
  textW.classList.add('textW');
  buttonWelcome.classList.add('buttonWelcome');

  logo.src = '../assets/imagenes/citi-pq.png';
  textW.textContent = 'Has llegado al mejor lugar para informarte de los principales eventos de tu ciudad';
  buttonWelcome.textContent = 'HOLA :)';

  divLogo.appendChild(logo);
  textW.appendChild(buttonWelcome);
  divtexto.appendChild(textW);
  container.append(divLogo, divtexto);

  buttonWelcome.addEventListener('click', () => {
    onNavigate('/login');
  });

  return container;
};
