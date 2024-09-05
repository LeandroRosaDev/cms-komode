import { PageParams } from "@/Types";
import tokenAction from "@/actions/login/get-token";
import { ButtonBack } from "@/componentes/helpers/ButtonBack";
import SaveCliente from "@/componentes/clientes/SaveCliente";

export default async function ClientePage({ params }: PageParams) {
  const token = await tokenAction();

  const response = await fetch(
    `https://apikomode.altuori.com/wp-json/api/cliente/${params.clientes}`,
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
      <section className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Erro ao buscar dados do cliente
          </h1>
          <ButtonBack className="mb-4">Voltar</ButtonBack>
        </div>
      </section>
    );
  }

  const data = await response.json();

  return (
    <section className="p-6  min-h-screen mx-auto">
      <div className="p-6 mb-6 mx-auto">
        {/* <SaveClient cliente={data} /> */}
        <SaveCliente cliente={data} />
        <ButtonBack className="mb-4 print:hidden">Voltar</ButtonBack>
      </div>
    </section>
  );
}
