import { expect, it } from "vitest";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

/**
 * How do we ensure that defaultUser is of type User
 * at THIS LINE - not further down in the code?
 */
// Quand on type un objet, on doit lui assigner des valeurs pour respecter son interface
const defaultUser: User = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  isAdmin: true,
};

const getUserId = (user: User) => {
  return user.id;
};

it("Should get the user id", () => {
  expect(getUserId(defaultUser)).toEqual(1);
});
