import { expect, it } from "vitest";

// On peut rendre un paramètre optionelle avec le mot clé "?" en suffixe
// Possible dans l'en-tête de la fonction et sur une déclaration d'interface (ou type)
export const getName = (first: string, last?: string) => {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
};

it("Should work with just the first name", () => {
  const name = getName("Matt");

  expect(name).toEqual("Matt");
});

it("Should work with the first and last name", () => {
  const name = getName("Matt", "Pocock");

  expect(name).toEqual("Matt Pocock");
});
