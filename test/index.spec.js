// importamos la funcion que vamos a testear
import { Register } from '../src/components/Register.js';

describe('Register', () => {
  it('debería ser una función', () => {
    expect(typeof Register).toBe('function');
  });
});
