//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProdutosAction } from "@/actions/produtos/delete-produtos-action";
import { putProdutosAction } from "@/actions/produtos/put-produtos-action";
import tokenAction from "@/actions/login/get-token";
import { url } from "@/app/api";
import PesquisaProdutos from "@/componentes/categorias/PesquisaProdutos";
import ProdutoDisponibilidade from "../categorias/ProdutoDisponibilidade";
import ProdutoSituacao from "../categorias/ProdutoSituacao";
import { Produto } from "@/Types"; // Importando a tipagem de Produto

const GetProdutoPromocao = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]); // Tipando como array de Produto
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pesquisaDisponibilidade, setpesquisaDisponibilidade] =
    useState<string>("");
  const [pesquisaSituacao, setpesquisaSituacao] = useState<string>("");

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      setError(null);
      const token = await tokenAction();
      const urlRequisicao = `${url}/wp-json/api/produto?&_limit=128&q=${searchTerm}&situacao=${pesquisaSituacao}&${pesquisaDisponibilidade}`;

      try {
        const response = await fetch(urlRequisicao, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar dados");
        }

        const data: Produto[] = await response.json();

        if (!data || data.length === 0) {
          setError("Nenhum produto encontrado em estoque.");
        } else {
          const updatedData = await Promise.all(
            data.map(async (produto: Produto) => {
              const customImageSrc = await fetchCustomImage(
                produto.produto_cod
              );
              return { ...produto, customFotoSrc: customImageSrc };
            })
          );
          setProdutos(updatedData);
        }
      } catch (error: any) {
        console.error("Erro na requisição:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [searchTerm, pesquisaDisponibilidade, pesquisaSituacao]);

  const fetchCustomImage = async (
    produto_cod: string
  ): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://apikomode.altuori.com/wp-json/api/produto?cor=img&produto_cod=${produto_cod}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data[0] && data[0].fotos && data[0].fotos.length > 0) {
          return data[0].fotos[0].src; // Retorna a primeira imagem encontrada
        }
      }
    } catch (error) {
      console.error("Erro ao buscar imagem customizada", error);
    }
    return null;
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-center text-3xl mt-4 mb-20">{error}</p>;

  const formatPrice = (value: number): string => {
    if (isNaN(value)) return "R$ 0,00";
    const formattedValue = value.toFixed(2).replace(".", ",");
    return `R$ ${formattedValue}`;
  };

  const cleanPriceInput = (input: string): number => {
    return parseFloat(input.replace(/[^\d,]/g, "").replace(",", "."));
  };

  const handleBlur = async (
    produtoId: string,
    field: string,
    value: string
  ): Promise<void> => {
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
          updatedProduct.preco_parcelado = formatPrice(
            (preco * 1.0269 * 1.05) / 12
          );
        }
      } else {
        (updatedProduct as any)[field] = value;
      }
      await putProdutosAction(updatedProduct, produtoId);
      setProdutos([...produtos]);
    }
  };

  const handleDelete = async (produtoId: string): Promise<void> => {
    await deleteProdutosAction(produtoId);
    setProdutos(produtos.filter((produto) => produto.id !== produtoId));
  };

  return (
    <section className="p-1 border ">
      <div className="flex flex-col justify-start items-center gap-2 bg-white shadow rounded-xl p-2 max-w-screen-md text-center px-4 mx-4 sm:mx-auto my-8">
        <h1 className="text-2xl">
          Selecione Abaixo a situação e disponibilidade do produto
        </h1>
        <div className="flex gap-2">
          <PesquisaProdutos onSearch={(term) => setSearchTerm(term)} />
          <ProdutoDisponibilidade onSearch={(term) => setSearchTerm(term)} />
          <ProdutoSituacao onSearch={(term) => setSearchTerm(term)} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mx-auto my-8 max-w-screen-2xl px-4">
        {produtos.length === 0 ? (
          <p>Nenhum produto encontrado em estoque.</p>
        ) : (
          produtos.map((produto: Produto) => (
            <div
              className="flex flex-col items-center justify-center relative transform transition duration-400 hover:scale-105 max-w-xs bg-white p-4 rounded-2xl shadow"
              key={produto.id}
            >
              <Link href={`/produto/${produto.id}`} className="w-72">
                <Image
                  className="opacity-100 block w-auto h-auto rounded-2xl transition-opacity duration-500 ease-in-out hover:opacity-30"
                  src={produto.customFotoSrc || produto.fotos[0]?.src}
                  alt={`Imagem de ${produto.nome}`}
                  width={300}
                  height={250}
                />
              </Link>

              <div className="p-2 w-full flex flex-col items-start overflow-hidden">
                <h1 className="text-center text-base m-0 truncate">
                  {produto?.nome} {produto?.cor}
                </h1>
                <h1 className="text-center text-base m-0">
                  Código: {produto?.produto_cod}
                </h1>
                <h1 className="text-center text-base m-0">
                  Preço parcelado: {produto?.preco_parcelado}
                </h1>
                <h1 className="text-center text-base m-0">
                  Preço Original: {produto?.preco_original}
                </h1>
                <h1 className="text-start text-base m-0">
                  Preço Atual: R$
                  <input
                    type="text"
                    defaultValue={produto?.preco}
                    onBlur={(e) =>
                      handleBlur(produto.id, "preco", e.target.value)
                    }
                    className="border mb-1 border-gray-300 w-24 ml-1 p-1 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
                  />
                </h1>
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
                <div className="flex items-center space-x-2 mb-2">
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
                  className="bg-red-700 text-white py-2 px-4 mx-auto rounded flex items-center justify-center gap-1"
                  onClick={() => handleDelete(produto.id)}
                >
                  <Image
                    src="/assets/icones/21.svg"
                    alt="logotipo"
                    width={20}
                    height={20}
                  />
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default GetProdutoPromocao;
