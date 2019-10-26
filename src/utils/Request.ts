import Axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

Axios.defaults.baseURL = 'http://192.168.50.133:8000';

export interface IResponseData<T = any> {
  code: number;
  message: string;
  payload: T;
}

export type ResponsePromise<T = any> = AxiosPromise<IResponseData<T>>;
export interface ResponseError<T = any> extends AxiosError {
  response?: AxiosResponse<IResponseData<T>>;
}
export default Axios;
