import BaseApiModule from "@/types/utils/BaseApiModule";
import Api from "@/api/api";
import Diet from "@/types/entitys/Diet";
import AddDietDto from "@/types/dto/diets/AddDietDto";
import UpdateDietDto from "@/types/dto/diets/UpdateDietDto";

export default class DietsModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "diets/");
  }

  list() {
    return this.get<Diet[]>("");
  }
  add(addDietDto: AddDietDto) {
    return this.post("", addDietDto);
  }

  update(updateDietDto: UpdateDietDto) {
    return this.put("", updateDietDto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
