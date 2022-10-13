import { expect, it } from "vitest";

const coerceAmount = (amount: number | { amount: number }) => {
  console.log(typeof amount);
  if (typeof amount === 'object') {
   const [obj] = Object.values(amount)
   return obj;
  }
  return amount;
};

it("Should return the amount when passed an object", () => {
  expect(coerceAmount({ amount: 20 })).toEqual(20);
});

it("Should return the amount when passed a number", () => {
  expect(coerceAmount(20)).toEqual(20);
});
