"use client";
import Link from "next/link";
import { useState } from "react";
import { ButtonBack } from "./helpers/ButtonBack";
import { Button } from "./form-componentes/Button";
import logout from "@/actions/login/logout-action";
import { useUser } from "@/context/user-context";

export default function Menu() {
  const { isAuthenticated } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    await logout();
    window.location.reload();
  };

  return (
    <header className="bg-gray-500">
      {isAuthenticated && (
        <nav className="p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <Link href="/" className="text-white hover:text-red-500 text-lg">
                Home
              </Link>
              <button
                className="sm:hidden ml-auto text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  ></path>
                </svg>
              </button>
            </div>
            <ul
              className={`${
                isOpen ? "block" : "hidden"
              } sm:flex items-center gap-4 mt-4 sm:mt-0`}
            >
              <li className="group relative">
                <Link href="#" className="text-white hover:text-red-500 p-5">
                  Produtos
                </Link>
                <ul className="absolute hidden group-hover:block bg-gray-500 mt-1 rounded shadow-lg">
                  <li>
                    <Link
                      href="/produto"
                      className="block px-4 py-2 text-white hover:text-red-500"
                    >
                      Visualizar Estoque
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/adicionar-produtos"
                      className="block px-4 py-2 text-white hover:text-red-500"
                    >
                      Adicionar Produtos
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="group relative">
                <Link href="#" className="text-white hover:text-red-500 p-5">
                  Clientes
                </Link>
                <ul className="absolute hidden group-hover:block bg-gray-500 mt-1 rounded shadow-lg">
                  <li>
                    <Link
                      href="/cadastrar-nota"
                      className="block px-4 py-2 text-white hover:text-red-500"
                    >
                      Cadastrar Clientes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/clientes"
                      className="block px-4 py-2 text-white hover:text-red-500"
                    >
                      Lista de Clientes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reclamacoes"
                      className="block px-4 py-2 text-white hover:text-red-500"
                    >
                      Reclamações
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {isAuthenticated && (
              <div className="hidden sm:flex gap-4 ml-auto">
                <ButtonBack className="bg-red-700 text-white py-2 px-4 rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
                  Voltar
                </ButtonBack>
                <form onSubmit={handleLogout} className="ml-auto">
                  <Button className="bg-red-700 text-white py-2 px-4 rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
                    Sair
                  </Button>
                </form>
              </div>
            )}
          </div>
          {isOpen && (
            <div className="sm:hidden mt-4">
              <ul className="flex flex-col items-start gap-2">
                <li>
                  <Link
                    href="/produto"
                    className="block px-4 py-2 text-white hover:text-red-500"
                  >
                    Visualizar Estoque
                  </Link>
                </li>
                <li>
                  <Link
                    href="/adicionar-produtos"
                    className="block px-4 py-2 text-white hover:text-red-500"
                  >
                    Adicionar Produtos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cadastrar-nota"
                    className="block px-4 py-2 text-white hover:text-red-500"
                  >
                    Cadastrar Clientes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clientes"
                    className="block px-4 py-2 text-white hover:text-red-500"
                  >
                    Lista de Clientes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reclamacoes"
                    className="block px-4 py-2 text-white hover:text-red-500"
                  >
                    Reclamações
                  </Link>
                </li>
                <li>
                  <form onSubmit={handleLogout} className="w-full">
                    <Button className="w-full bg-red-700 text-white py-2 px-4 rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
                      Sair
                    </Button>
                  </form>
                </li>
              </ul>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
