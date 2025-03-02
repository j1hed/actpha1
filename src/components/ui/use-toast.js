export default function useToast() {
  const showToast = (message) => alert(message);
  return { showToast };
}
