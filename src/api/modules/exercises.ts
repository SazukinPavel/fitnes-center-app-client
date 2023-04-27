import BaseApiModule from "@/types/utils/BaseApiModule";
import Api from "@/api/api";
import ExerciseInfo from "@/types/entitys/ExerciseInfo";
import AddExerciseDto from "@/types/dto/exercises/AddExerciseDto";
import UpdateIsPayedDto from "@/types/dto/exercises/UpdateIsPayedDto";
import AddCancellationDto from "@/types/dto/exercises/AddCancellationDto";
import Cancellation from "@/types/entitys/Cancellation";

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

  updateIsPayed(dto: UpdateIsPayedDto) {
    return this.patch("is-payed", dto);
  }

  cancel(dto: AddCancellationDto) {
    return this.patch<AddCancellationDto, Cancellation>("cancel", dto);
  }
}
