import { ref } from "vue";

export default function useValidators() {
  const requiredRule = ref(
    (value: string) => !!value || "Это поле обязательно."
  );
  const passwordLengthRule = ref(
    (v: string) => v.length >= 8 || "Не менее 8 символов."
  );

  const weightRule = ref((weight: number) => {
    if (!weight || !+weight || weight < 0 || weight > 500) {
      return "Некоректный вес";
    }
    return true;
  });

  const heightRule = ref((height: number) => {
    if (!height || !+height || height < 0 || height > 300) {
      return "Некоректный рост";
    }
    return true;
  });

  return { requiredRule, passwordLengthRule, weightRule, heightRule };
}
