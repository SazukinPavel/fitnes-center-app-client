import BaseApiModule from "@/types/BaseApiModule";
import Api from "@/api/api";
import ExerciseInfo from "@/types/ExerciseInfo";
import AddExerciseInfoDto from "@/types/dto/exerciseInfo/AddExerciseInfoDto";
import UpdateExerciseInfoDto from "@/types/dto/exerciseInfo/UpdateExerciseInfoDto";

export default class ExerciseInfoModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "exercises-info/");
  }

  list() {
    return this.get<ExerciseInfo[]>("");
  }
  add(addExerciseInfoDto: AddExerciseInfoDto) {
    return this.post("", addExerciseInfoDto);
  }

  update(updateExerciseInfoDto: UpdateExerciseInfoDto) {
    return this.put("", updateExerciseInfoDto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
