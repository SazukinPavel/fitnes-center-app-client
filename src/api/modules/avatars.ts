import BaseApiModule from "@/types/utils/BaseApiModule";
import Api from "@/api/api";
import AddAvatarDto from "@/types/dto/avatars/AddAvatarDto";

export default class AvatarsModule extends BaseApiModule {
  constructor(api: Api) {
    super(api, "avatars/");
  }

  async add({ file, owner }: AddAvatarDto) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file, file.name);
    bodyFormData.append("owner", owner);

    return this.post("", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  drop(id: string) {
    return this.delete(id);
  }
}
