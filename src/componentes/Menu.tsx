"use client";
import Link from "next/link";
import { ButtonBack } from "./helpers/ButtonBack";
import { Button } from "./form-componentes/Button";
import logout from "@/actions/login/logout-action";
import { useUser } from "@/context/user-context";

export default function Menu() {
  const { isAuthenticated } = useUser();
  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    await logout();
    window.location.reload();
  };

  return (
    <header>
      {isAuthenticated && (
        <nav className="bg-gray-500 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <ul className="flex items-center gap-4">
              <li className="group relative">
                <Link href="/" className="text-white hover:text-red-500 p-5">
                  Home
                </Link>
              </li>
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
              <div className="flex gap-4">
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
        </nav>
      )}
    </header>
  );
}
