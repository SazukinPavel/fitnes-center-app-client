import { ref } from "vue";

export default function useValidators() {
  const requiredRule = ref(
    (value: string) => !!value || "Это поле обязательно."
  );
  const passwordLengthRule = ref(
    (v: string) => v.length >= 8 || "Не менее 8 символов."
  );

  return { requiredRule, passwordLengthRule };
}
