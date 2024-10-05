type Role = 'admin' | 'user' | 'super-admin';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
}

export const defaultUser: User = {
    id: 1,
    firstName: 'Uchenna',
    lastName: 'Egbo',
    role: 'super-admin',
};
