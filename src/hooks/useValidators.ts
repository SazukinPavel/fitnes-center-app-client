import { ref } from "vue";
import { useI18n } from "vue-i18n";

export default function useValidators() {
  const { t } = useI18n();

  const requiredRule = ref((value: string) => !!value || t("rules.required"));
  const passwordLengthRule = ref(
    (v: string) => v.length >= 8 || t("rules.minPass")
  );

  const weightRule = ref((weight: number) => {
    if (!weight || !+weight || weight < 0 || weight > 500) {
      return t("rules.badWeight");
    }
    return true;
  });

  const heightRule = ref((height: number) => {
    if (!height || !+height || height < 0 || height > 300) {
      return t("rules.badHeight");
    }
    return true;
  });

  const telephoneRule = ref((val: string) => {
    if (
      val &&
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(val)
    ) {
      return t("rules.badNumber");
    }
    return true;
  });

  const durationRule = ref((val: string) => {
    if (val && (+val < 0 || +val > 10000)) {
      return t("rules.badDuration");
    }
    return true;
  });

  const emailRule = ref((val: string) => {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.toLowerCase()) ||
      t("rules.badEmail")
    );
  });

  return {
    requiredRule,
    passwordLengthRule,
    weightRule,
    heightRule,
    telephoneRule,
    durationRule,
    emailRule,
  };
}
