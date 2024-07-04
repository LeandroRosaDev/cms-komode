import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ children, className, onClick }: ButtonProps) {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      disabled={status.pending}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
