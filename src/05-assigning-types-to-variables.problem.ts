import { expect, it } from 'vitest';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

const defaultUser: User = {
    id: 1,
    firstName: 'Uchenna',
    lastName: 'Egbo',
    isAdmin: true,
};

const getUserId = (user: User) => {
    return user.id;
};

it('Should get the user id', () => {
    expect(getUserId(defaultUser)).toEqual(1);
});
