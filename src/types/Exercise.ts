import Client from "@/types/Client";
import Manager from "@/types/Manager";
import ExerciseInfo from "@/types/ExerciseInfo";

export interface Exercise {
  id: string;

  date: Date;

  client: Client;

  manager: Manager;

  exerciseInfo: ExerciseInfo;
}
