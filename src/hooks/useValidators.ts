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

  const telephoneRule = ref((val: string) => {
    if (
      val &&
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(val)
    ) {
      return "Некоректный номер";
    }
    return true;
  });

  const durationRule = ref((val: string) => {
    if (val && (+val < 0 || +val > 10000)) {
      return "Неккоректная длительность занятия";
    }
    return true;
  });

  return {
    requiredRule,
    passwordLengthRule,
    weightRule,
    heightRule,
    telephoneRule,
    durationRule,
  };
}
