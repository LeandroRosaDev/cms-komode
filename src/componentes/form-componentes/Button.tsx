import { useFormStatus } from "react-dom";

export function Button({ children, className }: any) {
  const status = useFormStatus();
  return (
    <button type="submit" disabled={status.pending} className={className}>
      {children}
    </button>
  );
}
