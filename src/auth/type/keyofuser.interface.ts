import { User } from '../entities';

export type KeyofUser = keyof User;
export const keyofUser: KeyofUser[] = ['email', 'username', 'id', 'role'];
