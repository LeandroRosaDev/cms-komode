import { PageParams } from "@/Types";
import Image from "next/image";
import { ButtonBack } from "@/componentes/helpers/ButtonBack";
import ClientProdutoPage from "@/componentes/produtos/Put-produto";

export default async function ServerProdutoPage({ params }: PageParams) {
  const response = await fetch(
    `https://apikomode.altuori.com/wp-json/api/produto/${params.produto}`,
    {
      cache: "no-store",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaWtvbW9kZS5hbHR1b3JpLmNvbSIsImlhdCI6MTcxNTY0NDgwMCwibmJmIjoxNzE1NjQ0ODAwLCJleHAiOjI1Nzk2NDQ4MDAsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.tQ-Uuz58JbI2ksAdPJz-6OaBh6TUAE31jsbg84oXshQ",
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
          target="blank"
          href={data.link_1}
          className="text-white bg-green-500 hover:bg-green-400 mb-4 block text-center p-3 rounded-3xl mx-auto my-0 w-52"
        >
          Confira o Link do Wpp
        </a>
        <ClientProdutoPage data={data} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Imagens</h2>
        {data.fotos.length > 0 && (
          <div className="mb-6">
            <Image
              src={data.fotos[0].src}
              alt={data.fotos[0].titulo}
              width={500}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Todas as Imagens:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.fotos.map((foto: any, index: any) => (
              <Image
                key={index}
                src={foto.src}
                alt={foto.titulo}
                width={200}
                height={100}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
