import { createI18n } from "vue-i18n";
// @ts-ignore
import ru from "./locales/ru.json";

const messages = Object.assign({ ru });

export default createI18n({
  locale: "ru",
  legacy: false,
  messages,
});
