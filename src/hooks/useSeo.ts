export default function useSeo() {
  const setTitle = (val: string) => {
    document.title = val;
  };

  return {
    setTitle,
  };
}
