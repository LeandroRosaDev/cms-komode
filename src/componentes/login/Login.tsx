"use client";
import { loginAction } from "@/actions/login/login-action";
import { Button } from "../form-componentes/Button";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action={loginAction}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>
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
        <Button className="w-full bg-red-700 text-white py-3 rounded-md transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
          Login
        </Button>
      </form>
    </div>
  );
}
