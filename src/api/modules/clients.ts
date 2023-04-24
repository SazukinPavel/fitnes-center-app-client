import BaseApiModule from "@/types/utils/BaseApiModule";
import Api from "@/api/api";
import Client from "@/types/entitys/Client";
import AddClientDto from "@/types/dto/clients/AddClientDto";
import UpdateClientDto from "@/types/dto/clients/UpdateClientDto";
import SetDietDto from "@/types/dto/clients/SetDietDto";

export default class ClientsModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "clients/");
  }

  list() {
    return this.get<Client[]>("");
  }
  add(addClientDto: AddClientDto) {
    return this.post("", addClientDto);
  }

  update(updateClientDto: UpdateClientDto) {
    return this.put("", updateClientDto);
  }

  drop(id: string) {
    return this.delete(id);
  }

  find(id: string) {
    return this.get<Client>(id);
  }
  setDiet(setDietDto: SetDietDto) {
    return this.patch("", setDietDto);
  }
}
