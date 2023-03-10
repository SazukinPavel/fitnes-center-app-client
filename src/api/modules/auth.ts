import BaseApiModule from "../../types/BaseApiModule";
import { AxiosInstance } from "axios";
import LoginDto from "../../types/dto/auth/LoginDto";
import AuthResponseDto from "../../types/dto/auth/AuthResponseDto";

export default class AuthModule extends BaseApiModule {
  constructor(api: AxiosInstance) {
    super(api, "auth/");
  }

  login(loginDto: LoginDto) {
    return this.post<LoginDto, AuthResponseDto>("login", loginDto);
  }
}
