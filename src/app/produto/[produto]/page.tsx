//@ts-nocheck
import { PageParams } from "@/Types";
import { ButtonBack } from "@/componentes/helpers/ButtonBack";
import ClientProdutoPage from "@/componentes/produtos/Put-produto";
import tokenAction from "@/actions/login/get-token";
import ClientProdutoImages from "@/componentes/produtos/ClientProdutoImages";

export default async function ServerProdutoPage({ params }: PageParams) {
  const token = await tokenAction();

  const response = await fetch(
    `https://apikomode.altuori.com/wp-json/api/produto/${params.produto}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {data.nome}
        </h1>
        <ButtonBack className="mb-4">Voltar</ButtonBack>
        <a
          target="_blank"
          href={data.link_1}
          className="text-white bg-green-500 hover:bg-green-400 mb-4 block text-center p-3 rounded-3xl mx-auto my-0 w-52"
        >
          Confira o Link do Wpp
        </a>
        <ClientProdutoPage data={data} />
      </div>

      {/* Passando o código do produto (por exemplo, SAZ) para o componente de imagem */}
      <ClientProdutoImages codigo={data.produto_cod} tamanho={data.fotos} />
    </section>
  );
}
