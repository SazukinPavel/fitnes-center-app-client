import { useRouter } from "vue-router";

export default function useGoBack() {
  const router = useRouter();
  const goBack = () => {
    return router.go(-1);
  };

  return goBack;
}
