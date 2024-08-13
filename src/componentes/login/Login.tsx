"use client";
import { useRef } from "react";
import { loginAction } from "@/actions/login/login-action";
import { Button } from "../form-componentes/Button";
import Image from "next/image";

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      try {
        await loginAction(formData);
        window.location.reload();
      } catch (error) {
        console.error("Erro no login:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center"
      >
        <h1>
          <Image
            src="/assets/logotipo.png"
            alt="logotipo"
            width={200}
            height={200}
            className="w-14 sm:w-auto mb-12"
          />
        </h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Usuário
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
          />
        </div>
        <Button className="w-40 bg-red-700 text-white py-3 rounded-md transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
          Login
        </Button>
      </form>
    </div>
  );
}
