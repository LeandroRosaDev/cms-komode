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
    <section className="p-4 sm:p-6 bg-red-100 min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-700 mb-4 sm:mb-6">
          Lista de Clientes
        </h1>
        <div className="flex flex-col gap-2">
          {clientes.map((cliente) => (
            <div
              className="flex flex-col sm:flex-row justify-between border border-gray-300 p-3 sm:p-4 rounded-md bg-gray-100"
              key={cliente.id}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex flex-wrap">
                  <h2 className="font-semibold mr-1">Nome:</h2>
                  <h2 className="text-lg font-semibold text-gray-800 mr-2">
                    {cliente.nome}
                  </h2>
                </div>
                <div className="flex flex-wrap">
                  <h2 className="font-semibold mr-1">Cidade:</h2>
                  <p className="text-gray-700 mr-2">{cliente.cidade}</p>
                </div>
                <div className="flex flex-wrap">
                  <h2 className="font-semibold mr-1">Bairro:</h2>
                  <p className="text-gray-700">{cliente.bairro}</p>
                </div>
              </div>
              <Link
                className="mt-2 sm:mt-0 text-center bg-green-700 text-white px-4 py-2 rounded transition duration-100 hover:bg-green-600 focus:outline-none focus:shadow-outline"
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
