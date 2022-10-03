import { expect, it } from "vitest";


// type annotations fix this issue
export const addTwoNumbers = (a:number, b:number) => {
  return a + b;
};

it("Should add the two numbers together", () => {
  expect(addTwoNumbers(2, 4)).toEqual(6);
  expect(addTwoNumbers(10, 10)).toEqual(20);
});


