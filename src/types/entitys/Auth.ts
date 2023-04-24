import Role from "@/types/utils/Role";

export default interface Auth {
  id: string;
  role: Role;
  fio: string;
  login: string;
  password: string;
  birthDate: Date;
}
