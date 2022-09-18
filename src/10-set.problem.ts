import { expect, it } from "vitest";
import { Equal, Expect } from "./helpers/type-utils";

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Set
// Un objet Set permet de stocker un ensemble de valeurs uniques de n'importe quel type
// Ici on type ce qu'on stocke
const guitarists = new Set<string>();

guitarists.add("Jimi Hendrix");
guitarists.add("Eric Clapton");

it("Should contain Jimi and Eric", () => {
  expect(guitarists.has("Jimi Hendrix")).toEqual(true);
  expect(guitarists.has("Eric Clapton")).toEqual(true);
});

it("Should give a type error when you try to pass a non-string", () => {
  // @ts-expect-error
  guitarists.add(2);
});

it("Should be typed as an array of strings", () => {
  const guitaristsAsArray = Array.from(guitarists);

  type tests = [Expect<Equal<typeof guitaristsAsArray, string[]>>];
});
