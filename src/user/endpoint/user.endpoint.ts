

import type { EndpointConfig } from "../../core/api/requestApi";
import type { LoginUser, User } from "../type";


export const UserEndpoint = {

    login(user: LoginUser):EndpointConfig{
        return{
            method: "post",
            path: "/login",
            data: user
        }
    },

    getUserById(id: string):EndpointConfig{
        return{
            method: "get",
            path: `/users/id/${id}`,
        }
    },

    saveUser(user: User):EndpointConfig{
        return{
            method: "put",
            path: `/users/update`,
            data: user
        }
    },

    register(user: User):EndpointConfig{
        return{
            method: "post",
            path: `/users/register`,
            data: user
        }
    },
    
  
}