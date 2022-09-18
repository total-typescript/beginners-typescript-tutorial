import { expect, it } from "vitest";

// On peut rendre une propriété d'objet optionelle avec le mot clé "?" en suffixe
// Possible dans l'en-tête de la fonction et sur une déclaration d'interface (ou type)
export const getName = (params: { first: string; last?: string }) => {
  if (params.last) {
    return `${params.first} ${params.last}`;
  }
  return params.first;
};

it("Should work with just the first name", () => {
  const name = getName({
    first: "Matt",
  });

  expect(name).toEqual("Matt");
});

it("Should work with the first and last name", () => {
  const name = getName({
    first: "Matt",
    last: "Pocock",
  });

  expect(name).toEqual("Matt Pocock");
});
