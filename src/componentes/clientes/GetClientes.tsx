//@ts-nocheck
"use client";

import { getClientesAction } from "@/actions/cliente/get-clientes-action";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../form-componentes/Button";
import Image from "next/image";
import { deleteClientesAction } from "@/actions/cliente/delete-clientes-action";

interface Cliente {
  id: string;
  nome: string;
  cidade: string;
  bairro: string;
}

export default function GetClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await getClientesAction();
        if (error) {
          setError(error);
        } else {
          setClientes(data);
        }
      } catch (err) {
        setError("Erro ao buscar os clientes.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Erro: {error}</div>;
  }

  const handleDelete = async (clienteID: string) => {
    await deleteClientesAction(clienteID);
    setClientes(clientes.filter((cliente) => cliente.id !== clienteID));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-gray-700 text-center sm:text-left">
            Lista de Clientes
          </h1>
          <div className="mt-2 sm:mt-0 flex space-x-2">
            <Link
              href="/cadastrar-nota"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Adicionar Cliente
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:gap-4 border-b py-2 font-semibold">
            <span>Nome</span>
            <span>Cidade</span>
            <span>Bairro</span>
            <span>Produto</span>
            <span>Valor Nota</span>
            <span>Data Emissão</span>
            <span className="text-right">Ações</span>
          </div>
          {clientes.map((cliente) => (
            <div
              key={cliente.id}
              className="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:gap-4 items-center border-b py-2"
            >
              <span>{cliente.nome}</span>
              <span>{cliente.cidade}</span>
              <span>{cliente.bairro}</span>
              <span>{cliente.produto_1}</span>
              <span>
                R$
                {(cliente.qtd_1 * cliente.subtotal_1 || 0) +
                  (cliente.qtd_2 * cliente.subtotal_2 || 0) +
                  (cliente.qtd_3 * cliente.subtotal_3 || 0) +
                  (cliente.qtd_4 * cliente.subtotal_4 || 0) +
                  (cliente.qtd_5 * cliente.subtotal_5 || 0)}
                ,00
              </span>
              <span>{cliente.data_emissao}</span>

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Link href={`/clientes/${cliente.id}`}>
                  <Button className="bg-green-700 text-white px-3 py-2 rounded w-full sm:w-auto flex gap-1 items-center justify-center hover:bg-green-600 duration-200">
                    <Image
                      src="/assets/icones/20.svg"
                      alt="icone de detalhes"
                      width={20}
                      height={20}
                    />
                    Ver Detalhes
                  </Button>
                </Link>
                <Button
                  className="bg-red-600 text-white px-3 py-2 rounded w-full sm:w-auto flex gap-1 items-center justify-center hover:bg-red-700"
                  onClick={() => handleDelete(cliente.id)}
                >
                  <Image
                    src="/assets/icones/21.svg"
                    alt="logotipo"
                    width={20}
                    height={20}
                  />
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
