import { requestApi } from "../../core/api/requestApi";
import { UserEndpoint } from "../endpoint/user.endpoint";
import type { Auth, LoginUser, User } from "../type";

export const UserService = {

    login: async (user: LoginUser): Promise<Auth> =>{
        const response = await requestApi<Auth>(
            UserEndpoint.login(user)
        )
        return response.data;
    },

    getUserById: async (id: string): Promise<User> =>{
        const response = await requestApi<User>(
            UserEndpoint.getUserById(id)
        )
        return response.data;
    },

    saveUser: async (user: User): Promise<User> =>{
        const response = await requestApi<User>(
            UserEndpoint.saveUser(user)
        )
        return response.data;
    },
    register: async (user: User): Promise<User> =>{
        const response = await requestApi<User>(
            UserEndpoint.register(user)
        )
        return response.data;
    },





}