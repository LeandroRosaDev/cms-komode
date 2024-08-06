// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProdutosAction } from "@/actions/produtos/delete-produtos-action";
import { putProdutosAction } from "@/actions/produtos/put-produtos-action";
import tokenAction from "@/actions/login/get-token";
import { url } from "@/app/api";
import PesquisaProdutos from "@/componentes/categorias/PesquisaProdutos";

const GetProdutoPromocao = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [situacao, setSituacao] = useState<string>("");
  const [disponibilidade, setDisponibilidade] = useState<string>("sim");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      setError(null);
      const token = await tokenAction();
      const urlRequisicao = `${url}/wp-json/api/produto?situacao=${situacao}&disponibilidade=${disponibilidade}&_limit=128&q=${searchTerm}`;

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

        const data = await response.json();
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
  }, [situacao, disponibilidade, searchTerm]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-center text-3xl mt-4 mb-20">{error}</p>;

  const handleDelete = async (produtoId: string) => {
    await deleteProdutosAction(produtoId);
    setProdutos(produtos.filter((produto) => produto.id !== produtoId));
  };

  const handleUpdate = async (
    produtoId: string,
    field: string,
    value: string
  ) => {
    const updatedProduct = produtos.find((produto) => produto.id === produtoId);
    if (updatedProduct) {
      (updatedProduct as any)[field] = value;
      await putProdutosAction(updatedProduct, produtoId);
      setProdutos([...produtos]);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-start items-center my-4 gap-2 bg-slate-100 mx-auto shadow-sm p-2 max-w-96 text-center">
        <h1 className="text-2xl">
          Selecione Abaixo a situação e disponibilidade do produto
        </h1>
        <select
          value={situacao}
          onChange={(e) => setSituacao(e.target.value)}
          className="border border-gray-300 p-2 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline w-80"
        >
          <option value="">Selecione</option>
          <option value="promocao">Promoção</option>
          <option value="destaque">Destaque</option>
          <option value="queima">Queima</option>
        </select>
        <select
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value)}
          className="border border-gray-300 p-2 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline w-80"
        >
          <option value="sim">Disponível</option>
          <option value="nao">Indisponível</option>
        </select>
        <PesquisaProdutos onSearch={(term) => setSearchTerm(term)} />
      </div>

      <section className="flex flex-wrap justify-center items-center gap-4 mx-auto my-8 max-w-screen-xl px-4">
        {produtos.length === 0 ? (
          <p>Nenhum produto encontrado em estoque.</p>
        ) : (
          produtos.map((produto) => (
            <div
              className="flex flex-col items-center justify-center relative transform transition duration-400 hover:scale-105 max-w-xs bg-slate-100 p-4 rounded-2xl shadow-sm"
              key={produto.id}
            >
              {produto.fotos && produto.fotos.length > 0 && (
                <Link href={`/produto/${produto.id}`} className="w-72">
                  <Image
                    className="opacity-100 block w-auto h-auto transition-opacity duration-500 ease-in-out hover:opacity-30"
                    src={
                      produto.fotos[1]
                        ? produto.fotos[1].src
                        : produto.fotos[0].src
                    }
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
                  Código: {produto?.produto_cod}
                </h1>
                <h1 className="text-center text-base m-0">
                  Preço parcelado: R${produto?.preco_parcelado}
                </h1>
                <h1 className="text-center text-base m-0">
                  Preço Original: R${produto?.preco_original}
                </h1>
                <h1 className="text-start text-base m-0">
                  Preço Atual: R$
                  <input
                    type="text"
                    value={produto?.preco}
                    onChange={(e) =>
                      handleUpdate(produto.id, "preco", e.target.value)
                    }
                    className="border mb-1 border-gray-300 w-24 ml-1 p-1 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
                  />
                </h1>
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
                <div className="flex items-center space-x-2">
                  <label>
                    <input
                      type="radio"
                      name={`disponibilidade-${produto.id}`}
                      value="sim"
                      checked={produto?.disponibilidade === "sim"}
                      onChange={(e) =>
                        handleUpdate(
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
                        handleUpdate(
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

export default GetProdutoPromocao;
