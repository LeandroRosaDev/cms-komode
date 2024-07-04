// @ts-nocheck
"use client";

import { getClientesAction } from "@/actions/cliente/get-clientes-action";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function GetClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getClientesAction();
      setClientes(data);
    }

    fetchData();
  }, []);

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Lista de Clientes
        </h1>
        <div className="flex flex-col gap-1">
          {clientes.map((cliente) => (
            <div
              className="flex justify-between border border-gray-300 p-4 rounded-md bg-gray-100"
              key={cliente.id}
            >
              <div className="flex items-center">
                <h2 className="mr-1">Nome:</h2>
                <h2 className="text-lg font-semibold text-gray-800 mr-2">
                  {cliente.nome}
                </h2>
                <h2 className="mr-1">Cidade:</h2>
                <p className="text-gray-700 mr-2">{cliente.cidade}</p>
                <h2 className="mr-1">Bairro:</h2>
                <p className="text-gray-700 mr-2">{cliente.bairro}</p>
              </div>
              <Link
                className="text-center bg-red-700 text-white p-4 rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline"
                href={`/clientes/${cliente.id}`}
              >
                Ver Detalhes
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
