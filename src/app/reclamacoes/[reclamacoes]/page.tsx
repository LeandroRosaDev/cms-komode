import { PageParams } from "@/Types";
import tokenAction from "@/actions/login/get-token";

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
      <section className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Não existem reclamações registradas para esse cliente!
          </h1>
        </div>
      </section>
    );
  }

  const data = await response.json();

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto flex flex-col gap-4">
        <h1 className="text-3xl text-center">Reclamação de {data.nome}</h1>
        <div className="flex gap-1">
          <h1 className="font-bold">Nome:</h1>
          <h1>{data.nome}</h1>
        </div>
        <div className="flex gap-1">
          <h1 className="font-bold">E-mail:</h1>
          <h1>{data.email}</h1>
        </div>
        <div className="flex gap-1">
          <h1 className="font-bold">Telefone:</h1>
          <h1>{data.telefone}</h1>
        </div>
        <div className="flex gap-1">
          <h1 className="font-bold">Área da Reclamação:</h1>
          <h1>{data.tipo_reclamacao}</h1>
        </div>
        <div className="flex gap-1">
          <h1 className="font-bold">Descrição da Reclamação:</h1>
          <h1>{data.reclamacao}</h1>
        </div>
      </div>
    </section>
  );
}
