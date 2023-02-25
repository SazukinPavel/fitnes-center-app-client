import Role from "../../types/Role";
import { User } from "../../types/User";

export default interface AuthState {
  role: Role | null;
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}
