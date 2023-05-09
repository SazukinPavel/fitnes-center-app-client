import { User } from "@/types/entitys/User";

export default class AvatarsService {
  private static serverPath = "http://localhost:4200";
  private static baseSubPath = "base";
  private static avatarsSubPath = "avatars";

  static getAvatarUrl(user: User | undefined) {
    if (user?.auth && user.auth?.avatar?.id) {
      return `${this.serverPath}/${this.avatarsSubPath}/${user.auth.avatar.name}`;
    } else if (user?.auth && user?.auth?.role) {
      return `${this.serverPath}/${this.baseSubPath}/${user?.auth?.role}.png`;
    }

    return null;
  }
}
