import Manager from "@/types/Manager";
import { Exercise } from "@/types/Exercise";
import Diet from "@/types/Diet";
import Auth from "@/types/Auth";

export default interface Client {
  weight?: string;

  height?: number;

  owner?: Manager;

  diet?: Diet;

  exercises?: Exercise[];

  id?: string;

  auth?: Auth;
}
