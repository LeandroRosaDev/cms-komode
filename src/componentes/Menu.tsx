"use client";
import { useState, useEffect } from "react";
import { Conta } from "@/Types";
import { userGetAction } from "@/actions/user/user-get-action";
import Link from "next/link";
import { ButtonBack } from "./helpers/ButtonBack";
import { Button } from "./form-componentes/Button";
import logout from "@/actions/login/logout-action";

export default function Menu() {
  const [conta, setConta] = useState<Conta>({
    autorizado: false,
    nome: " ",
  });

  useEffect(() => {
    async function fetchUserData() {
      const { data } = await userGetAction();
      if (data.nome === undefined) {
        setConta({ autorizado: false, nome: " " });
      } else {
        setConta({ autorizado: true, nome: data.nome });
      }
    }

    fetchUserData();
  }, []);

  return (
    <header>
      {conta.autorizado && (
        <nav className="bg-gray-500 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <ul className="flex items-center gap-4">
              <>
                <li>
                  <Link href="/" className="text-white hover:text-red-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/produtos"
                    className="text-white hover:text-red-500"
                  >
                    Visualizar Produtos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/adicionar-produtos"
                    className="text-white hover:text-red-500"
                  >
                    Adicionar Produtos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cadastrar-nota"
                    className="text-white hover:text-red-500"
                  >
                    Cadastrar Notas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clientes"
                    className="text-white hover:text-red-500"
                  >
                    Clientes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reclamacoes"
                    className="text-white hover:text-red-500"
                  >
                    Reclamações
                  </Link>
                </li>
                <li>
                  <ButtonBack className="text-white hover:text-red-500">
                    Voltar
                  </ButtonBack>
                </li>
              </>
            </ul>
            {conta.autorizado && (
              <form action={logout} className="ml-auto">
                <Button className="bg-red-700 text-white py-2 px-4 rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
                  Sair
                </Button>
              </form>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
