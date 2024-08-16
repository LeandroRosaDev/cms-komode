"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getReclamacaoAction } from "@/actions/reclamacoes/get-reclamacao.action";
import { Button } from "../form-componentes/Button";
import Image from "next/image";

interface Reclamacao {
  id: string;
  nome: string;
  email: string;
  tipo_reclamacao: string;
}

export default function GetReclamacao() {
  const [reclamacao, setReclamacao] = useState<Reclamacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await getReclamacaoAction();
        if (error) {
          setError(error);
        } else {
          setReclamacao(data);
        }
      } catch (err) {
        setError("Erro ao buscar as reclamações.");
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

  return (
    <section className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-700 mb-6">
          Reclamações (Site)
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {reclamacao.map((reclamacoes) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center border justify-around border-gray-300 p-4 rounded-lg bg-gray-50"
              key={reclamacoes.id}
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {reclamacoes.nome}
                </h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Motivo da Reclamação:</span>{" "}
                  {reclamacoes.tipo_reclamacao}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span>{" "}
                  {reclamacoes.email}
                </p>
              </div>
              <div className="flex justify-end">
                <Link
                  className="text-center w-36 bg-green-700 text-white px-3 py-2 rounded transition duration-100 hover:bg-green-600 focus:outline-none focus:shadow-outline flex gap-1 items-center justify-center"
                  href={`/reclamacoes/${reclamacoes.id}`}
                >
                  <Image
                    src="/assets/icones/20.svg"
                    alt="icone de detalhes"
                    width={20}
                    height={20}
                  />
                  Ver Detalhes
                </Link>
                <Button className="bg-red-600 text-white px-3 py-2 rounded w-36 ml-1 hover:bg-red-700 duration-200 flex gap-1 items-center justify-center">
                  <Image
                    src="/assets/icones/21.svg"
                    alt="icone de detalhes"
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
    </section>
  );
}
