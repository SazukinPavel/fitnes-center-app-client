import Role from "@/types/Role";

export default interface Manager {
  id?: string;

  readonly role?: Role;

  fio?: string;

  login?: string;

  description?: string;

  password?: string;
  age?:number
}
