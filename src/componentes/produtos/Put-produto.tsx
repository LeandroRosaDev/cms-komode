//@ts-nocheck
"use client";

import { putProdutosAction } from "@/actions/produtos/put-produtos-action";
import { useState, useEffect } from "react";

interface ProductData {
  id: string;
  nome_long: string;
  cor: string;
  estrutura: string;
  preco: number | string;
  preco_original: string;
  preco_parcelado: string;
  [key: string]: any;
}

interface ClientProdutoPageProps {
  data: ProductData;
}

export default function ClientProdutoPage({ data }: ClientProdutoPageProps) {
  const formatPrice = (value: number) => {
    if (isNaN(value)) return "R$ 0,00";
    const formattedValue = value.toFixed(2).replace(".", ",");
    return `R$ ${formattedValue}`;
  };

  const cleanPriceInput = (input: string) => {
    return parseFloat(input.replace(/[^\d,]/g, "").replace(",", "."));
  };

  // Inicializar o estado com o valor existente do produto
  const initialPreco = formatPrice(cleanPriceInput(data.preco.toString()) || 0);
  const [preco, setPreco] = useState<string>(initialPreco);

  const precoValue = cleanPriceInput(preco);
  const precoParcelado = formatPrice(precoValue / 10);
  const precoOriginal = formatPrice(precoValue * 1.1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const precoNumber = cleanPriceInput(preco);
    if (!preco || isNaN(precoNumber)) {
      alert("Preço inválido. Por favor, insira um valor válido.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set("preco", formatPrice(precoNumber));
    formData.set("preco_original", precoOriginal);
    formData.set("preco_parcelado", precoParcelado);
    const productData: ProductData = Object.fromEntries(
      formData.entries()
    ) as unknown as ProductData;
    await putProdutosAction(productData, data.id);
  };

  useEffect(() => {
    document.getElementById("preco_original").value = precoOriginal;
    document.getElementById("preco_parcelado").value = precoParcelado;
  }, [precoOriginal, precoParcelado]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex gap-3 items-center">
      <input type="hidden" name="id" value={data.id} />
      <div className="w-52">
        <label htmlFor="nome" className="block text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          defaultValue={data.nome}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52">
        <label htmlFor="nome_long" className="block text-gray-700">
          Nome Longo
        </label>
        <input
          type="text"
          id="nome_long"
          name="nome_long"
          defaultValue={data.nome_long}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52">
        <label htmlFor="cor" className="block text-gray-700">
          Cor
        </label>
        <input
          type="text"
          id="cor"
          name="cor"
          defaultValue={data.cor}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52">
        <label htmlFor="preco" className="block text-gray-700">
          Preço
        </label>
        <input
          type="text"
          id="preco"
          name="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          onBlur={() => setPreco(formatPrice(cleanPriceInput(preco)))}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52 hidden">
        <label htmlFor="preco_original" className="block text-gray-700">
          Preço Original
        </label>
        <input
          type="text"
          id="preco_original"
          name="preco_original"
          value={precoOriginal}
          readOnly
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52 hidden">
        <label htmlFor="preco_parcelado" className="block text-gray-700">
          Preço Parcelado
        </label>
        <input
          type="text"
          id="preco_parcelado"
          name="preco_parcelado"
          value={precoParcelado}
          readOnly
          className="border border-gray-300 w-52 p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52">
        <label htmlFor="disponibilidade" className="block text-gray-700">
          Disponibilidade
        </label>
        <input
          type="text"
          id="disponibilidade"
          name="disponibilidade"
          defaultValue={data.disponibilidade}
          className="border border-gray-300 w-52 p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52">
        <label htmlFor="situacao" className="block text-gray-700">
          Situação
        </label>
        <input
          type="text"
          id="situacao"
          name="situacao"
          defaultValue={data.situacao}
          className="border border-gray-300 w-52 p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52">
        <label htmlFor="rangedevalor" className="block text-gray-700">
          Range de Valor
        </label>
        <input
          type="text"
          id="rangedevalor"
          name="rangedevalor"
          defaultValue={data.rangedevalor}
          className="border border-gray-300 w-52 p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className=" bg-red-700 text-white p-2 rounded-md transition duration-320 hover:bg-red-600 focus:outline-none focus:shadow-outline text-center  w-44 h-10 -my-5"
      >
        Salvar Alterações
      </button>
    </form>
  );
}
