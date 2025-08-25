

import type { EndpointConfig } from "../../core/api/requestApi";


export const PanelEndpoint = {

    getReport():EndpointConfig{
        return{
            method: "get",
            path: "/report/precos-mensais"
        }
    },

    getCsvReport():EndpointConfig{
        return{
            method: "post",
            path: "/report/coletar-precos"
        }
    }

  
}