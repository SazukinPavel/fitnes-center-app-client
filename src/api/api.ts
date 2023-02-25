import axios, { AxiosInstance } from "axios";
import AuthModule from "./modules/auth";

export default class Api {
  private api: AxiosInstance;
  public auth: AuthModule;
  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
    this.auth = new AuthModule(this.api);
  }
}
