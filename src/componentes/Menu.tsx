"use client";
import Link from "next/link";
import { useState } from "react";
import { ButtonBack } from "./helpers/ButtonBack";
import { Button } from "./form-componentes/Button";
import logout from "@/actions/login/logout-action";
import { useUser } from "@/context/user-context";
import Image from "next/image";

export default function Menu() {
  const { isAuthenticated } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isClientsOpen, setIsClientsOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    await logout();
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
  const toggleClients = () => setIsClientsOpen(!isClientsOpen);
  const toggleHome = () => setIsHomeOpen(!isHomeOpen);

  return (
    <header className="bg-red-700">
      {isAuthenticated && (
        <nav className="p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <Link
                href="/"
                className="flex items-center gap-1 text-white hover:scale-105 duration-300 text-lg mr-8"
              >
                <Image
                  src="/assets/icons/10.svg"
                  alt="logotipo"
                  width={20}
                  height={20}
                />
                Home
              </Link>
              <button
                className="sm:hidden ml-auto text-white"
                onClick={toggleMenu}
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
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  ></path>
                </svg>
              </button>
            </div>
            <ul className="hidden sm:flex items-center gap-4 mt-4 sm:mt-0">
              <li className="relative group">
                <Link
                  href="#"
                  className="flex items-center gap-1 text-white hover:scale-105 duration-300 px-5 text-lg"
                >
                  <Image
                    src="/assets/icons/11.svg"
                    alt="logotipo"
                    width={20}
                    height={20}
                  />
                  Produtos
                </Link>
                <ul className="absolute hidden group-hover:block bg-red-700 w-56 rounded shadow-lg p-4">
                  <li>
                    <Link
                      href="/produto"
                      className="flex items-center gap-2 w-full text-white p-2 hover:scale-105 duration-300"
                      onClick={closeMenu}
                    >
                      <Image
                        src="/assets/icons/13.svg"
                        alt="logotipo"
                        width={20}
                        height={20}
                      />
                      Visualizar Estoque
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/adicionar-produtos"
                      className="flex items-center gap-2 w-full text-white p-2 hover:scale-105 duration-300"
                      onClick={closeMenu}
                    >
                      <Image
                        src="/assets/icons/12.svg"
                        alt="logotipo"
                        width={20}
                        height={20}
                      />
                      Adicionar Produtos
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative group">
                <Link
                  href="#"
                  className="flex items-center gap-1 text-white hover:scale-105 duration-300 px-5 text-lg"
                >
                  <Image
                    src="/assets/icons/14.svg"
                    alt="logotipo"
                    width={20}
                    height={20}
                  />
                  Clientes
                </Link>
                <ul className="absolute hidden group-hover:block bg-red-700 w-56 rounded shadow-lg p-4">
                  <li>
                    <Link
                      href="/cadastrar-nota"
                      className="flex items-center gap-2 w-full text-white p-2 hover:scale-105 duration-300"
                      onClick={closeMenu}
                    >
                      <Image
                        src="/assets/icons/15.svg"
                        alt="logotipo"
                        width={20}
                        height={20}
                      />
                      Cadastrar Clientes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/clientes"
                      className="flex items-center gap-2 w-full text-white p-2 hover:scale-105 duration-300"
                      onClick={closeMenu}
                    >
                      <Image
                        src="/assets/icons/16.svg"
                        alt="logotipo"
                        width={20}
                        height={20}
                      />
                      Lista de Clientes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reclamacoes"
                      className="flex items-center gap-1 w-full text-white p-2 hover:scale-105 duration-300"
                      onClick={closeMenu}
                    >
                      <Image
                        src="/assets/icons/17.svg"
                        alt="logotipo"
                        width={20}
                        height={20}
                      />
                      Reclamações
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {isAuthenticated && (
              <div className="hidden sm:flex gap-4 ml-auto">
                <ButtonBack className="bg-red-500 text-white py-2 px-4 rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
                  Voltar
                </ButtonBack>
                <form onSubmit={handleLogout} className="ml-auto">
                  <Button className="bg-red-500 text-white py-2 px-4 rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
                    Sair
                  </Button>
                </form>
              </div>
            )}
          </div>
          {isMenuOpen && (
            <div className="sm:hidden mt-4 bg-red-700 text-white w-full h-screen fixed top-0 left-0 z-50 p-4">
              <button className="text-white ml-auto mb-4" onClick={closeMenu}>
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <ul className="flex flex-col items-center gap-6">
                <li>
                  <button className=" w-full text-white flex items-center gap-2 uppercase">
                    <Image
                      src="/assets/icons/10.svg"
                      alt="logotipo"
                      width={20}
                      height={20}
                    />
                    <Link
                      href="/"
                      className="block px-4 text-white hover:text-red-500"
                      onClick={closeMenu}
                    >
                      Home
                    </Link>
                  </button>
                </li>
                <li>
                  <button
                    className=" w-full text-white flex items-center gap-2 uppercase"
                    onClick={toggleProducts}
                  >
                    <Image
                      src="/assets/icons/11.svg"
                      alt="logotipo"
                      width={20}
                      height={20}
                    />
                    Produtos
                  </button>
                  {isProductsOpen && (
                    <ul className="pl-4">
                      <li>
                        <Link
                          href="/produto"
                          className="flex gap-1 px-4 py-2 text-white hover:text-red-500"
                          onClick={closeMenu}
                        >
                          <Image
                            src="/assets/icons/13.svg"
                            alt="logotipo"
                            width={20}
                            height={20}
                          />
                          Visualizar Estoque
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/adicionar-produtos"
                          className="flex gap-1 px-4 py-2 text-white hover:text-red-500"
                          onClick={closeMenu}
                        >
                          <Image
                            src="/assets/icons/12.svg"
                            alt="logotipo"
                            width={20}
                            height={20}
                          />
                          Adicionar Produtos
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button
                    className="text-left w-full text-white flex items-center gap-2 uppercase"
                    onClick={toggleClients}
                  >
                    <Image
                      src="/assets/icons/14.svg"
                      alt="logotipo"
                      width={20}
                      height={20}
                    />
                    Clientes
                  </button>
                  {isClientsOpen && (
                    <ul className="pl-4">
                      <li>
                        <Link
                          href="/cadastrar-nota"
                          className="flex gap-1 px-4 py-2 text-white hover:text-red-500"
                          onClick={closeMenu}
                        >
                          <Image
                            src="/assets/icons/15.svg"
                            alt="logotipo"
                            width={20}
                            height={20}
                          />
                          Cadastrar Clientes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/clientes"
                          className="flex gap-1 px-4 py-2 text-white hover:text-red-500"
                          onClick={closeMenu}
                        >
                          <Image
                            src="/assets/icons/16.svg"
                            alt="logotipo"
                            width={20}
                            height={20}
                          />
                          Lista de Clientes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/reclamacoes"
                          className="flex gap-1 px-4 py-2 text-white hover:text-red-500"
                          onClick={closeMenu}
                        >
                          <Image
                            src="/assets/icons/17.svg"
                            alt="logotipo"
                            width={20}
                            height={20}
                          />
                          Reclamações
                        </Link>
                      </li>
                    </ul>
                  )}
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
