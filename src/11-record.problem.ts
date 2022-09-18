import { expect, it } from "vitest";
import { string } from "zod";

const createCache = () => {
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
  // Record est un utilitaire qui construit un objet en spécifiant une clé et une valeur.
  // Utile pour faire du mapping d'une propriété d'un type avec une valeur d'un autre type
  const cache: Record<string, string> = {};

  // Autre solution
  // interface cache {
  //   [id: string]: string;
  // }

  const add = (id: string, value: string) => {
    cache[id] = value;
  };

  const remove = (id: string) => {
    delete cache[id];
  };

  return {
    cache,
    add,
    remove,
  };
};

it("Should add values to the cache", () => {
  const cache = createCache();

  cache.add("123", "Matt");

  expect(cache.cache["123"]).toEqual("Matt");
});

it("Should remove values to the cache", () => {
  const cache = createCache();

  cache.add("123", "Matt");
  cache.remove("123");

  expect(cache.cache["123"]).toEqual(undefined);
});
