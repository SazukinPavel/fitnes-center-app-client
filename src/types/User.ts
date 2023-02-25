import Role from '../types/Role';

export interface User {
    id: string;
    readonly role: Role;
    fio: string;
    login: string;
}
