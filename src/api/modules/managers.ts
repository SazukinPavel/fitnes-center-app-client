import BaseApiModule from "@/types/utils/BaseApiModule";
import Api from "@/api/api";
import UpdateManagerDto from "@/types/dto/managers/UpdateManagerDto";
import Manager from "@/types/entitys/Manager";
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

  find(id: string) {
    return this.get<Manager>(id);
  }

  drop(id: string) {
    return this.delete(id);
  }
}
