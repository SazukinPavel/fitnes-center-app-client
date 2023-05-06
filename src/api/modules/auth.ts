import BaseApiModule from "@/types/utils/BaseApiModule";
import LoginDto from "@/types/dto/auth/LoginDto";
import AuthResponseDto from "@/types/dto/auth/AuthResponseDto";
import Api from "@/api/api";
import ChangePasswordDto from "@/types/dto/auth/ChangePassword.dto";
import RecreatePasswordDto from "@/types/dto/auth/RecreatePasswordDto";

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

  recreatePassword(dto: RecreatePasswordDto) {
    return this.post("forget", dto);
  }
}
