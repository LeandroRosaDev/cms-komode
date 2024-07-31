"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageParams, Produto } from "@/Types";
import { deleteProdutosAction } from "@/actions/produtos/delete-produtos-action";
import { putProdutosAction } from "@/actions/produtos/put-produtos-action";
import tokenAction from "@/actions/login/get-token";
import PesquisaProdutos from "@/componentes/categorias/PesquisaProdutos";

const CategoriasPage = ({ params }: PageParams) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchProdutos = async () => {
      const token = await tokenAction();
      const url = `https://apikomode.altuori.com/wp-json/api/produto?sub_categoria=${params.categorias}&_limit=120&q=${searchTerm}`;

      try {
        const response = await fetch(url, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar dados");
        }

        const data: Produto[] = await response.json();
        console.log("Dados recebidos:", data);

        if (!data || data.length === 0) {
          setError("Nenhum produto encontrado em estoque.");
        } else {
          setProdutos(data);
        }
      } catch (error: any) {
        console.error("Erro na requisição:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [params, searchTerm]);

  if (loading) return <p>Carregando...</p>;
  if (error)
    return (
      <p className="text-center text-3xl mt-4">Ocorreu um erro: {error}</p>
    );

  const formatPrice = (value: number) => {
    if (isNaN(value)) return "R$ 0,00";
    const formattedValue = value.toFixed(2).replace(".", ",");
    return `R$ ${formattedValue}`;
  };

  const cleanPriceInput = (input: string) => {
    return parseFloat(input.replace(/[^\d,]/g, "").replace(",", "."));
  };

  const handleBlur = async (
    produtoId: string,
    field: string,
    value: string
  ) => {
    const updatedProduct = produtos.find((produto) => produto.id === produtoId);
    if (updatedProduct) {
      if (field === "preco") {
        const preco = cleanPriceInput(value);
        if (isNaN(preco)) {
          updatedProduct.preco = "R$ 0,00";
          updatedProduct.preco_original = "R$ 0,00";
          updatedProduct.preco_parcelado = "R$ 0,00";
        } else {
          updatedProduct.preco = formatPrice(preco);
          updatedProduct.preco_original = formatPrice(preco * 1.1);
          updatedProduct.preco_parcelado = formatPrice(preco / 10);
        }
      } else {
        (updatedProduct as any)[field] = value;
      }
      await putProdutosAction(updatedProduct, produtoId);
      setProdutos([...produtos]);
    }
  };

  const handleDelete = async (produtoId: string) => {
    await deleteProdutosAction(produtoId);
    setProdutos(produtos.filter((produto) => produto.id !== produtoId));
  };

  return (
    <div>
      <PesquisaProdutos onSearch={(term) => setSearchTerm(term)} />
      <section className="flex flex-wrap justify-center items-center gap-4 mx-auto my-8 max-w-screen-xl">
        {produtos.length === 0 ? (
          <p>Nenhum produto encontrado em estoque.</p>
        ) : (
          produtos.map((produto) => (
            <div
              className="flex flex-col items-center justify-center relative transform transition duration-400 hover:scale-105 max-w-[300px] max-h-[500px] bg-slate-100 p-4 rounded-2xl shadow-sm"
              key={produto.id}
            >
              {produto.fotos && produto.fotos.length > 0 && (
                <Link href={`/produto/${produto.id}`} className="w-72">
                  <Image
                    className="opacity-100 block w-auto h-auto transition-opacity duration-500 ease-in-out hover:opacity-30"
                    src={produto.fotos[0].src}
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
                  defaultValue={produto?.preco}
                  onBlur={(e) =>
                    handleBlur(produto.id, "preco", e.target.value)
                  }
                  className="border mb-1 border-gray-300 w-full p-1 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
                />
                <select
                  value={produto?.situacao}
                  onChange={(e) =>
                    handleBlur(produto.id, "situacao", e.target.value)
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
                        handleBlur(
                          produto.id,
                          "disponibilidade",
                          e.target.value
                        )
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
                        handleBlur(
                          produto.id,
                          "disponibilidade",
                          e.target.value
                        )
                      }
                      className="mr-1"
                    />
                    Indisponível
                  </label>
                </div>
                <button
                  className="bg-red-700 text-white py-2 px-4 mt-2 rounded"
                  onClick={() => handleDelete(produto.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default CategoriasPage;
