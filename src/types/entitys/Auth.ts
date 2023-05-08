import Role from "@/types/utils/Role";
import Avatar from "@/types/entitys/Avatar";

export default interface Auth {
  id: string;
  role: Role;
  fio: string;
  login: string;
  password: string;
  birthDate: Date;
  telephone: string;
  avatar: Avatar;
}
