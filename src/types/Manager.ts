import Auth from "@/types/Auth";

export default interface Manager {
  id?: string;
  auth?: Auth;
  description?: string;
  age?: number;
}
