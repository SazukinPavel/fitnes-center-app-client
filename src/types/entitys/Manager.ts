import Auth from "@/types/entitys/Auth";

export default interface Manager {
  id?: string;
  auth?: Auth;
  description?: string;
  age?: number;
}
