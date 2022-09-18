import { expect, it } from "vitest";

// NARROWING
// Le param amount est soit un number, soit un objetc avec une propriété de type number
const coerceAmount = (amount: number | { amount: number }) => {
  // Pour être sur de toujours renvoyer une valeur exacte quand on fait du NARROWING
  // on doit conditionner le return selon le type du param
  if (typeof(amount) === "number") {
    return amount;
  }
  return amount.amount;
};

it("Should return the amount when passed an object", () => {
  expect(coerceAmount({ amount: 20 })).toEqual(20);
});

it("Should return the amount when passed a number", () => {
  expect(coerceAmount(20)).toEqual(20);
});
