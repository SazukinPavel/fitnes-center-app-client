export default function useSeo() {
  const setTitle = (val: string) => {
    document.title = val || "fitness-center-app";
  };

  return {
    setTitle,
  };
}
