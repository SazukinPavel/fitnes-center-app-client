import Manager from "@/types/Manager";
import { Exercise } from "@/types/Exercise";
import Diet from "@/types/Diet";

export default interface Client {
  weight: string;

  height: number;

  age: number;

  owner: Manager;

  diet: Diet;

  exercises: Exercise[];

  id: string;

  fio: string;

  login: string;

  password: string;
}
