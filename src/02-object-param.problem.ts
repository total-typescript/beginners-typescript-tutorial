import { expect, it } from "vitest";

//* On peut définir une interface pour nos objets afin de typer ses propriétés
// interface Numbers = {
//   first: number,
//   second: number
// }

//* On peut utiliser le raccourcis 'type' pour le même résultat
// type Numbers = {
//   first: number,
//   second: number
// }

// export const addTwoNumbers = (params: Numbers) => {
//   return params.first + params.second;
// };

// On peut sinon typer les propriétés de l'objet reçu en param
// directement dans l'en-tête de la fonction
export const addTwoNumbers = (params: { first: number, second: number }) => {
  return params.first + params.second;
};

it("Should add the two numbers together", () => {
  expect(
    addTwoNumbers({
      first: 2,
      second: 4,
    }),
  ).toEqual(6);

  expect(
    addTwoNumbers({
      first: 10,
      second: 20,
    }),
  ).toEqual(30);
});
