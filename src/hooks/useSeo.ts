import {useI18n} from "vue-i18n";

export default function useSeo() {

  const {t}=useI18n()
  const setTitle = (val: string) => {
    document.title = val || t('pageTitle');
  };

  return {
    setTitle,
  };
}
