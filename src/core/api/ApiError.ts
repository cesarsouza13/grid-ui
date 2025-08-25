import { AxiosError, HttpStatusCode } from "axios";

export interface GridError {
  error: string;
  message: string;
  status: number
}

export const getReasonByStatusCode = (status: HttpStatusCode, customReasonsByStatus?: {[statusCode: number]: string}) => {
  let reason = "houve um erro desconhecido."
  if(customReasonsByStatus && customReasonsByStatus[status]) {
    reason = customReasonsByStatus[status];
  } else {
    switch (status) {
      case 400:
        reason = "houve um erro na aplicação.";
        break;
      case 403:
        reason = "você não tem permissões para isso.";
        break;
      case 422:
        reason = "os dados enviados são inválidos";
        break;
      default:
        reason = "houve um erro desconhecido.";
    }
  }
  return reason;
}

export const getErrorReasonByApiError = (error: AxiosError<GridError>, customReasonsByStatus?: {[statusCode: number]: string}) => {
  const { response } = error;
  if(response?.data.message){
    return response?.data.message
  }
  let message = "houve um erro desconhecido.";
  if (response) {

    const { status } = response;
    message = getReasonByStatusCode(status, customReasonsByStatus);
  }
  return message;
};