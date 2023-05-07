import BaseApiModule from "@/types/utils/BaseApiModule";
import LoginDto from "@/types/dto/auth/LoginDto";
import AuthResponseDto from "@/types/dto/auth/AuthResponseDto";
import Api from "@/api/api";
import ChangePasswordDto from "@/types/dto/auth/ChangePasswordDto";
import ForgetPasswordDto from "@/types/dto/auth/ForgetPasswordDto";
import NewPasswordDto from "@/types/dto/auth/NewPasswordDto";

export default class AuthModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "auth/");
  }

  login(loginDto: LoginDto) {
    return this.post<LoginDto, AuthResponseDto>("login", loginDto);
  }

  me() {
    return this.post<null, AuthResponseDto>("me");
  }

  changePassword(dto: ChangePasswordDto) {
    return this.post("change-pass", dto);
  }

  forgetPassword(dto: ForgetPasswordDto) {
    return this.post("forget", dto);
  }

  newPassword(dto: NewPasswordDto) {
    return this.post("new-password", dto);
  }

  checkToken(token: string) {
    return this.get("check-token/" + token);
  }
}
