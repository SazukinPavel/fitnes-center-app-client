import axios, { AxiosInstance } from "axios";
import AuthModule from "./modules/auth";

export default class Api {
  public axios: AxiosInstance;
  public auth: AuthModule;
  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL });
    this.auth = new AuthModule(this);
  }

  applyToken(token: string) {
    this.axios = axios.create({
      headers: { Authorization: "Bearer " + token },
      baseURL: this.axios.defaults.baseURL,
    });
  }
}
