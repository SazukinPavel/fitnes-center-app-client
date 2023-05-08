import Auth from "@/types/entitys/Auth";

export default interface Avatar {
  id: string;

  name: string;

  auth?: Auth;
}
