import BaseApiModule from "@/types/BaseApiModule";
import Api from "@/api/api";
import ExerciseInfo from "@/types/ExerciseInfo";
import AddExerciseDto from "@/types/dto/exercises/AddExerciseDto";

export default class ExercisesModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "exercises/");
  }

  list() {
    return this.get<ExerciseInfo[]>("");
  }
  add(addExerciseDto: AddExerciseDto) {
    return this.post("", addExerciseDto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
