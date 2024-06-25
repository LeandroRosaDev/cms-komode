// @ts-nocheck

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageParams } from "@/Types";
import { deleteProdutosAction } from "@/actions/produtos/delete-produtos-action";
import { putProdutosAction } from "@/actions/produtos/put-produtos-action";

const CategoriasPage = ({ params }: PageParams) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      const url = `https://apikomode.altuori.com/wp-json/api/produto?sub_categoria=${params.categorias}&_limit=120`;

      try {
        const response = await fetch(url, {
          cache: "no-store",
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaWtvbW9kZS5hbHR1b3JpLmNvbSIsImlhdCI6MTcxNTY0NDgwMCwibmJmIjoxNzE1NjQ0ODAwLCJleHAiOjI1Nzk2NDQ4MDAsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.tQ-Uuz58JbI2ksAdPJz-6OaBh6TUAE31jsbg84oXshQ",
          },
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar dados");
        }

        const data: any = await response.json();
        console.log("Dados recebidos:", data);
        if (!data || data.length === 0) {
          console.log(params.categorias);
        }

        setProdutos(data);
      } catch (error: any) {
        console.error("Erro na requisição:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [params]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const handleDelete = async (produtoId: string) => {
    await deleteProdutosAction(produtoId);
    setProdutos(produtos.filter((produto: any) => produto.id !== produtoId));
  };

  const handleUpdate = async (
    produtoId: string,
    field: string,
    value: string
  ) => {
    const updatedProduct = produtos.find(
      (produto: any) => produto.id === produtoId
    );
    if (updatedProduct) {
      updatedProduct[field] = value;
      await putProdutosAction(updatedProduct, produtoId);
      setProdutos([...produtos]);
    }
  };

  return (
    <section className="flex flex-wrap justify-center items-center gap-4 mx-auto my-8 max-w-screen-xl">
      {produtos.map((produto: any) => (
        <div
          className="flex flex-col items-center justify-center relative transform transition duration-400 hover:scale-105"
          key={produto.id}
        >
          {produto.fotos && produto.fotos.length > 0 && (
            <Link href={`/produto/${produto.id}`} className="w-72">
              <Image
                className="opacity-100 block w-auto h-auto transition-opacity duration-500 ease-in-out hover:opacity-30"
                src={produto.fotos[1].src}
                alt={`Imagem de ${produto.nome}`}
                width={300}
                height={250}
              />
            </Link>
          )}

          <div className="p-2 w-full flex flex-col items-start">
            <h1 className="text-center text-base m-0">
              {produto?.nome} {produto?.cor}
            </h1>
            <h1 className="text-center text-base m-0">
              {produto?.produto_cod}
            </h1>
            <h1 className="text-center text-base m-0">
              {produto?.preco_parcelado}
            </h1>

            <h1 className="text-center text-base m-0">
              {produto?.preco_original}
            </h1>

            <input
              type="text"
              value={produto?.preco}
              onChange={(e) =>
                handleUpdate(produto.id, "preco", e.target.value)
              }
              className="border mb-1 border-gray-300 w-full p-1 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
            <select
              value={produto?.situacao}
              onChange={(e) =>
                handleUpdate(produto.id, "situacao", e.target.value)
              }
              className="border border-gray-300 w-full p-1 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            >
              <option value="normal">Selecione</option>
              <option value="destaque">Produto em Destaque</option>
              <option value="promocao">Produto em Promoção</option>
              <option value="queima">Produto em Queima de estoque</option>
            </select>
            <a
              target="blank"
              href={produto?.link_1}
              className="text-center block"
            >
              Conferir Link
            </a>
            <div className="flex items-center space-x-2">
              <label>
                <input
                  type="radio"
                  name={`disponibilidade-${produto.id}`}
                  value="sim"
                  checked={produto?.disponibilidade === "sim"}
                  onChange={(e) =>
                    handleUpdate(produto.id, "disponibilidade", e.target.value)
                  }
                  className="mr-1"
                />
                Disponível
              </label>
              <label>
                <input
                  type="radio"
                  name={`disponibilidade-${produto.id}`}
                  value="nao"
                  checked={produto?.disponibilidade === "nao"}
                  onChange={(e) =>
                    handleUpdate(produto.id, "disponibilidade", e.target.value)
                  }
                  className="mr-1"
                />
                Indisponível
              </label>
            </div>
            <button
              className="bg-red-700 hidden text-white py-2 px-4 mt-2 rounded"
              onClick={() => handleDelete(produto.id)}
            >
              Deletar
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoriasPage;
