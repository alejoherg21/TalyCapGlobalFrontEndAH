import { User } from './User';

export interface AuthResponse {
    user: User;
    codigo: Number;
    message: string;
    token: string;
}
