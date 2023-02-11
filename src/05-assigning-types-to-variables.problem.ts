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
const defaultUser: User = {
  id: 1,
  firstName: "Lucas",
  lastName: "Souza",
  isAdmin: true,
};

/**
 * We can use as to cast the type of a variable
 * 
 * const defaultUser = {
 *   id: 1,
 * } as User;
 * 
 */

const getUserId = (user: User) => {
  return user.id;
};

it("Should get the user id", () => {
  expect(getUserId(defaultUser)).toEqual(1);
});
