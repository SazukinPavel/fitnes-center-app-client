import { User } from "@/types/entitys/User";
import { computed } from "vue";
import AvatarsService from "@/services/AvatarsService";

export default function useUserAvatar(user: User | undefined) {
  return computed(() => AvatarsService.getAvatarUrl(user));
}
