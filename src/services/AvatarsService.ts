import { User } from "@/types/entitys/User";

export default class AvatarsService {
  private static serverPath = process.env.VUE_APP_API_URL;
  private static baseSubPath = process.env.VUE_APP_IMAGE_BASE_SUB_PATH;
  private static avatarsSubPath = process.env.VUE_APP_IMAGE_AVATARS_SUB_PATH;

  static getAvatarUrl(user: User | undefined) {
    if (user?.auth && user.auth?.avatar?.id) {
      return `${this.serverPath}/${this.avatarsSubPath}/${user.auth.avatar.name}`;
    } else if (user?.auth && user?.auth?.role) {
      return `${this.serverPath}/${this.baseSubPath}/${user?.auth?.role}.png`;
    }

    return null;
  }
}
