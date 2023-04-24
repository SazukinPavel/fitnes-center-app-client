import Manager from "@/types/entitys/Manager";
import { Exercise } from "@/types/entitys/Exercise";
import Diet from "@/types/entitys/Diet";
import Auth from "@/types/entitys/Auth";

export default interface Client {
  weight?: string;

  height?: number;

  owner?: Manager;

  diet?: Diet;

  exercises?: Exercise[];

  id?: string;

  auth?: Auth;
}
