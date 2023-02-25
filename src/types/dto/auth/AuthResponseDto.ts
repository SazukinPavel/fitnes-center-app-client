import { User } from "../../User";

export default interface AuthResponseDto {
  token: string;
  user: User;
}
