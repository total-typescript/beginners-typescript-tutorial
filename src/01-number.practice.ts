import { expect, it, describe } from "vitest";

export const addTwoNumbers = (a: number, b: number) => {
  return a + b;
};

export const addNumbers = (...params: number[]) => {
  return params.reduce((acc, val) => acc + val, 0)
}

describe("Types checkings", () => {

  it("Should add the two numbers together", () => {
    expect(addTwoNumbers(2, 4)).toEqual(6);
    expect(addTwoNumbers(10, 10)).toEqual(20);
  });

  it("Should add an array of numbers together", () => {
    expect(addNumbers(1, 2, 3)).toEqual(6);
  });


})