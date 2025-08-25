import { requestApi } from "../../core/api/requestApi";
import { PanelEndpoint } from "../endpoint/panel.endpoint";
import type { MonthlyPrice } from "../type";



export const PanelService = {

    getReport: async (): Promise<MonthlyPrice[]> =>{
        const response = await requestApi<MonthlyPrice[]>(
            PanelEndpoint.getReport()
        )
        return response.data;
    },

    getCsvReport: async (): Promise<Blob> =>{
        const response = await requestApi<Blob>(
            PanelEndpoint.getCsvReport()
        )
        return response.data;
    },


}