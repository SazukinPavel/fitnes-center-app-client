import { AxiosInstance, AxiosRequestConfig } from "axios";
export default class BaseApiModule {
  private subPath: string;
  private api: AxiosInstance;
  constructor(api: AxiosInstance, subPath: string) {
    this.subPath = subPath;
    this.api = api;
  }

  protected post<T, K>(url: string = "", data: T, config?: AxiosRequestConfig) {
    return this.api.post<T, K>(this.subPath + url, data, config);
  }

  protected get<T>(url: string = "", data: T, config?: AxiosRequestConfig) {
    return this.api.get<T>(this.subPath + url, config);
  }

  protected patch<T, K>(
    url: string = "",
    data: T,
    config?: AxiosRequestConfig
  ) {
    return this.api.patch<T, K>(this.subPath + url, data, config);
  }
  protected put<T, K>(url: string = "", data: T, config?: AxiosRequestConfig) {
    return this.api.put<T, K>(this.subPath + url, data, config);
  }

  protected delete<T>(url: string = "", config?: AxiosRequestConfig) {
    return this.api.delete<T>(this.subPath + url, config);
  }
}
