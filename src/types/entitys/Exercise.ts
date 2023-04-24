import Client from "@/types/entitys/Client";
import Manager from "@/types/entitys/Manager";
import ExerciseInfo from "@/types/entitys/ExerciseInfo";

export interface Exercise {
  id: string;

  date: Date;

  client: Client;

  manager: Manager;

  exerciseInfo: ExerciseInfo;

  isPayed: boolean;
}
