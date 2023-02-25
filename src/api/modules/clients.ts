import BaseApiModule from "@/types/BaseApiModule";
import Api from "@/api/api";
import Client from "@/types/Client";
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

  setDiet(setDietDto: SetDietDto) {
    return this.patch("", setDietDto);
  }
}
