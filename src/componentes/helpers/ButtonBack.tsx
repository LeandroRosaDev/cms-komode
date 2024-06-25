"use client";
import { useRouter } from "next/navigation";

export function ButtonBack({ children, className }: any) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button type="button" onClick={handleClick} className={`btn ${className}`}>
      {children}
    </button>
  );
}
