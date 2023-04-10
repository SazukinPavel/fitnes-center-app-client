import Role from "@/types/Role";

export default interface Auth {
  id: string;
  role: Role;
  fio: string;
  login: string;
  password: string;
  birthDate: Date;
}
