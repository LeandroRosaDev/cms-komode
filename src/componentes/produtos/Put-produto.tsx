"use client";

import { putProdutosAction } from "@/actions/produtos/put-produtos-action";

interface ProductData {
  id: string;
  nome_long: string;
  cor: string;
  estrutura: string;
  [key: string]: any;
}

interface ClientProdutoPageProps {
  data: ProductData;
}

export default function ClientProdutoPage({ data }: ClientProdutoPageProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const productData: ProductData = Object.fromEntries(
      formData.entries()
    ) as unknown as ProductData;
    await putProdutosAction(productData, data.id);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex gap-3 items-center">
      <input type="hidden" name="id" value={data.id} />
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
          preco
        </label>
        <input
          type="text"
          id="preco"
          name="preco"
          defaultValue={data.preco}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52">
        <label htmlFor="preco_original" className="block text-gray-700">
          preco original
        </label>
        <input
          type="text"
          id="preco_original"
          name="preco_original"
          defaultValue={data.preco_original}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52">
        <label htmlFor="preco_parcelado" className="block text-gray-700">
          preco_parcelado
        </label>
        <input
          type="text"
          id="preco_parcelado"
          name="preco_parcelado"
          defaultValue={data.preco_parcelado}
          className="border border-gray-300 w-52 p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="w-52">
        <label htmlFor="disponibilidade" className="block text-gray-700">
          disponibilidade
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
          situacao
        </label>
        <input
          type="text"
          id="situacao"
          name="situacao"
          defaultValue={data.situacao}
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
