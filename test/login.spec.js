import { Login } from '../src/components/Login.js';
import { Wall } from '../src/components/Wall';

describe('Login', () => {
  it('debería ser una función', () => {
    expect(typeof Login).toBe('function');
  });

  it.only('el formulario de login se renderice correctamente', () => {
    // GIVEN - DADO: contexto necesario para realizar la prueba (elementos en body, mocks...)
    const divRoot = document.createElement('div');
    divRoot.id = 'root';
    const routesMock = {
      '/login': Login,
      '/wall': Wall,
    };
    const onNavigateMock = (pathname) => {
      window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname,
      );

      divRoot.removeChild(divRoot.firstChild);
      divRoot.appendChild(routesMock[pathname](onNavigateMock));
    };

    // WHEN - CUANDO: Ejectuar el cdigo que quiero probar
    divRoot.appendChild(Login(onNavigateMock));

    document.body.append(divRoot);

    const formLogin = document.querySelector('[data-testid="loginForm"]');
    // selectionar el input de email
    // selectionar el input de password
    // selectionar el boton de login/ingresar

    // THEN - ENTONCES:¨expects, evaluar el resultado

    expect(formLogin).not.toBeNull();
    // asegurarme que el input de email este en pantalla
    // asegurarme que el input de password este en pantalla
    // asegurarme que el boton de login/ingresar este en pantalla
    console.log(document.body.innerHTML);
  });
});
