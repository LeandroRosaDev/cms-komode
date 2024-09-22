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
  disponibilidade: string;
  situacao: string;
  rangedevalor: string;
  produto_cod: string;
  categoria: string;
  sub_categoria: string;
  descricao: string;
  profundidade_aberto: string;
  altura: string;
  largura: string;
}

interface ClientProdutoPageProps {
  data: ProductData;
}

export default function ClientProdutoPage({ data }: ClientProdutoPageProps) {
  // Função para formatar preço
  const formatPrice = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  const cleanPriceInput = (input: string) => {
    return parseFloat(input.replace(/[^\d,]/g, "").replace(",", "."));
  };

  // Estado inicial dos campos
  const [preco, setPreco] = useState<string>(
    formatPrice(cleanPriceInput(data.preco.toString()) || 0)
  );
  const [nome, setNome] = useState(data.produto_cod);
  const [nomeLong, setNomeLong] = useState(data.nome_long);
  const [cor, setCor] = useState(data.cor);
  const [disponibilidade, setDisponibilidade] = useState(data.disponibilidade);
  const [situacao, setSituacao] = useState(data.situacao);
  const [rangeDeValor, setRangeDeValor] = useState(data.rangedevalor);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(
    data.categoria
  );
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState(
    data.sub_categoria
  );
  const [descricao, setDescricao] = useState(data.descricao);
  const [profundidadeAberto, setProfundidadeAberto] = useState(
    data.profundidade_aberto
  );
  const [altura, setAltura] = useState(data.altura);
  const [largura, setLargura] = useState(data.largura);

  const precoValue = cleanPriceInput(preco);
  const precoParcelado = formatPrice((precoValue * 1.0269 * 1.05) / 12);
  const precoOriginal = formatPrice(precoValue * 1.1);

  // Função chamada ao sair de um campo (onBlur)
  const handleBlur = async (field: string, value: any) => {
    const updatedProduct = { ...data, [field]: value };

    // Caso o campo alterado seja o preço, atualizamos também o preço original e parcelado
    if (field === "preco") {
      updatedProduct.preco_original = precoOriginal;
      updatedProduct.preco_parcelado = precoParcelado;
    }

    await putProdutosAction(updatedProduct, data.id);
  };

  useEffect(() => {
    document.getElementById("preco_original").value = precoOriginal;
    document.getElementById("preco_parcelado").value = precoParcelado;
  }, [precoOriginal, precoParcelado]);

  return (
    <form className="space-y-4 flex gap-3 items-center flex-wrap">
      <input type="hidden" name="id" value={data.id} />

      {/* Nome */}
      <div className="w-52">
        <label htmlFor="nome" className="block text-gray-700">
          Código
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onBlur={() => handleBlur("produto_cod", nome)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>

      {/* Nome Longo */}
      <div className="w-52">
        <label htmlFor="nome_long" className="block text-gray-700">
          Nome Longo
        </label>
        <input
          type="text"
          id="nome_long"
          name="nome_long"
          value={nomeLong}
          onChange={(e) => setNomeLong(e.target.value)}
          onBlur={() => handleBlur("nome_long", nomeLong)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>

      {/* Cor - campo select */}
      <div className="w-52">
        <label htmlFor="cor" className="block text-gray-700">
          Cor
        </label>
        <select
          id="cor"
          name="cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          onBlur={() => handleBlur("cor", cor)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Selecione a Cor</option>
          <option value="Azul">Azul</option>
          <option value="Vermelho">Vermelho</option>
          <option value="Preto">Preto</option>
          <option value="Cinza">Cinza</option>
          <option value="Marrom">Marrom</option>
          {/* Adicione as outras cores aqui */}
        </select>
      </div>

      {/* Preço */}
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
          onBlur={() => {
            setPreco(formatPrice(cleanPriceInput(preco)));
            handleBlur("preco", preco);
          }}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>

      <input
        type="hidden"
        id="preco_original"
        name="preco_original"
        value={precoOriginal}
        readOnly
        className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
      />

      <input
        type="hidden"
        id="preco_parcelado"
        name="preco_parcelado"
        value={precoParcelado}
        readOnly
        className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
      />

      {/* Disponibilidade - campo select */}
      <div className="w-52">
        <label htmlFor="disponibilidade" className="block text-gray-700">
          Disponibilidade
        </label>
        <select
          id="disponibilidade"
          name="disponibilidade"
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value)}
          onBlur={() => handleBlur("disponibilidade", disponibilidade)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="sim">Disponível</option>
          <option value="nao">Indisponível</option>
        </select>
      </div>

      {/* Situação - campo select */}
      <div className="w-52">
        <label htmlFor="situacao" className="block text-gray-700">
          Situação
        </label>
        <select
          id="situacao"
          name="situacao"
          value={situacao}
          onChange={(e) => setSituacao(e.target.value)}
          onBlur={() => handleBlur("situacao", situacao)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="destaque">Destaque</option>
          <option value="promocao">Promoção</option>
          <option value="queima">Queima de estoque</option>
        </select>
      </div>

      {/* Range de valor - campo select */}
      <div className="w-52">
        <label htmlFor="rangedevalor" className="block text-gray-700">
          Range de Valor
        </label>
        <select
          id="rangedevalor"
          name="rangedevalor"
          value={rangeDeValor}
          onChange={(e) => setRangeDeValor(e.target.value)}
          onBlur={() => handleBlur("rangedevalor", rangeDeValor)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="499">Menor de R$500,00</option>
          <option value="999">Menor de R$1000,00</option>
          {/* Adicione outros ranges aqui */}
        </select>
      </div>

      {/* Categoria - campo select */}
      <div className="w-52">
        <label htmlFor="categoria" className="block text-gray-700">
          Categoria
        </label>
        <select
          id="categoria"
          name="categoria"
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          onBlur={() => handleBlur("categoria", categoriaSelecionada)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="Sala de estar">Sala de estar</option>
          <option value="Cozinha">Cozinha</option>
          {/* Adicione outras categorias aqui */}
        </select>
      </div>

      {/* Subcategoria - campo select */}
      <div className="w-52">
        <label htmlFor="sub_categoria" className="block text-gray-700">
          Sub Categoria
        </label>
        <select
          id="sub_categoria"
          name="sub_categoria"
          value={subcategoriaSelecionada}
          onChange={(e) => setSubcategoriaSelecionada(e.target.value)}
          onBlur={() => handleBlur("sub_categoria", subcategoriaSelecionada)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          {categoriaSelecionada === "Sala de estar" && (
            <>
              <option value="Sofa Retratil">Sofá Retrátil</option>
              <option value="Sofa Canto">Sofá de Canto</option>
              {/* Adicione outras subcategorias */}
            </>
          )}
          {/* Adicione subcategorias para outras categorias */}
        </select>
      </div>

      {/* Descrição */}
      <div className="w-52">
        <label htmlFor="descricao" className="block text-gray-700">
          Descrição
        </label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          onBlur={() => handleBlur("descricao", descricao)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>

      {/* Profundidade Aberto */}
      <div className="w-52">
        <label htmlFor="profundidade_aberto" className="block text-gray-700">
          Profundidade Aberto
        </label>
        <input
          type="text"
          id="profundidade_aberto"
          name="profundidade_aberto"
          value={profundidadeAberto}
          onChange={(e) => setProfundidadeAberto(e.target.value)}
          onBlur={() => handleBlur("profundidade_aberto", profundidadeAberto)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>

      {/* Altura */}
      <div className="w-52">
        <label htmlFor="altura" className="block text-gray-700">
          Altura
        </label>
        <input
          type="text"
          id="altura"
          name="altura"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          onBlur={() => handleBlur("altura", altura)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>

      {/* Largura */}
      <div className="w-52">
        <label htmlFor="largura" className="block text-gray-700">
          Largura
        </label>
        <input
          type="text"
          id="largura"
          name="largura"
          value={largura}
          onChange={(e) => setLargura(e.target.value)}
          onBlur={() => handleBlur("largura", largura)}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
    </form>
  );
}
