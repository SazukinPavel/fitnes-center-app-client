import { useRouter } from "vue-router";

export default function useGoTo() {
  const router = useRouter();
  const goTo = (params: { name: string; params?: any; querry?: any }) => {
    return router.push(params);
  };

  return goTo;
}
