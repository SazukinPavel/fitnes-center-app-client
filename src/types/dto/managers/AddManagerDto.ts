export default interface AddManagerDto {
  fio: string;

  login: string;

  password: string;

  birthDate?: Date;

  description: string;

  telephone?: string;
}
