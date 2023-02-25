import BaseApiModule from "@/types/BaseApiModule";
import Api from "@/api/api";
import UpdateManagerDto from "@/types/dto/managers/UpdateManagerDto";
import Manager from "@/types/Manager";
import AddManagerDto from "@/types/dto/managers/AddManagerDto";

export default class ManagersModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "managers/");
  }

  list() {
    return this.get<Manager[]>("");
  }
  add(addManagerDto: AddManagerDto) {
    return this.post("", addManagerDto);
  }

  update(updateManagerDto: UpdateManagerDto) {
    return this.put("", updateManagerDto);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
