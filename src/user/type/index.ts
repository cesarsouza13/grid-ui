

export type LoginUser = {
    userName: string;
    password: string;
}

export type Auth = {
    token: string;
    id: string;
    name: string;
}

export interface User {
    login: string;
    password: string;
    name: string;
}
