import { User } from "../../entitys/User";

export default interface AuthResponseDto {
  token: string;
  user: User;
}
