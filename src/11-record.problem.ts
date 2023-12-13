import { expect, it } from "vitest";

interface Cashe {
  [id: string]: string;
}

const createCache = () => {
  const cache: Cashe = {};

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

it("Should remove values from the cache", () => {
  const cache = createCache();

  cache.add("123", "Matt");
  cache.remove("123");

  expect(cache.cache["123"]).toEqual(undefined);
});

const hache = createCache();
hache.add("123", "Matt");
hache.add("Andrew");
hache.add('1');

console.log('RESULT1:', hache)

hache.remove('123')
hache.add('Andrew', '1');
hache.add('123', 'Andrew');

console.log('RESULT2:', hache)
