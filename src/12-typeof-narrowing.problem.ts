import { expect, it } from "vitest";

const coerceAmount = (amount: number | { amount: number }) => {};

it("Should return the amount when passed an object", () => {
  expect(coerceAmount({ amount: 20 })).toEqual(20);
});

it("Should return the amount when passed a number", () => {
  expect(coerceAmount(20)).toEqual(20);
});
