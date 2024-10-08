import { PageParams } from "@/Types";
import tokenAction from "@/actions/login/get-token";
import Link from "next/link";
import Image from "next/image";

interface ReclamacaoData {
  nome: string;
  email: string;
  telefone: string;
  tipo_reclamacao: string;
  reclamacao: string;
}

export default async function ReclamacaoPage({ params }: PageParams) {
  const token = await tokenAction();

  const response = await fetch(
    `https://apikomode.altuori.com/wp-json/api/reclamacao/${params.reclamacoes}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    console.log("Failed to fetch client data", response.status);
    return (
      <section className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-700">
            Não existem reclamações registradas para esse cliente!
          </h1>
        </div>
      </section>
    );
  }

  const data: ReclamacaoData = await response.json();

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Reclamação de {data.nome}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-bold text-gray-700">Nome:</h2>
            <p>{data.nome}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-bold text-gray-700">E-mail:</h2>
            <p>{data.email}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-bold text-gray-700">Telefone:</h2>
            <p>{data.telefone}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="font-bold text-gray-700">Área da Reclamação:</h2>
            <p>{data.tipo_reclamacao}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow col-span-1 sm:col-span-2">
            <h2 className="font-bold text-gray-700">
              Descrição da Reclamação:
            </h2>
            <p>{data.reclamacao}</p>
          </div>
          <div className="border col-span-2 border-red-400 my-6"></div>
          <textarea
            placeholder="Responda a essa reclamação"
            name="reclamacao"
            id="reclamacao"
            className=" p-2 border border-gray-300 rounded focus:border-red-600 focus:outline-none  h-32 resize-vertical col-span-2"
          />
          <div className="flex items-center justify-center gap-3 col-span-2">
            <Link
              href="/"
              className="bg-green-600 text-white px-3 py-3 rounded w-full sm:w-auto flex gap-1 items-center justify-center duration-200 hover:bg-green-700"
            >
              <Image
                src="/assets/wpp icon.png"
                alt="logotipo"
                width={30}
                height={30}
              />
              Responder Via Whatsapp
            </Link>
            <Link
              href="/"
              className="bg-red-700 text-white px-3 py-3 rounded w-full sm:w-auto flex gap-2 items-center justify-center duration-200 hover:bg-red-600"
            >
              <Image
                src="/assets/icones/26.svg"
                alt="logotipo"
                width={30}
                height={30}
              />
              Responder Via E-mail
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
