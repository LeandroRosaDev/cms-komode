//@ts-nocheck
"use client";
import { postProdutosAction } from "@/actions/produtos/post-produtos-action";
import { useState } from "react";
import { Button } from "../form-componentes/Button";

export default function PostProduto() {
  const [situacao, setSituacao] = useState("");
  const [rangedevalor, setRangedevalor] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [subcategoriaSelecionada, setsubCategoriaSelecionada] = useState("");
  const [preco, setPreco] = useState(0);
  const [nome, setNome] = useState("");
  const [produtoCod, setProdutoCod] = useState("");
  const [cor, setCor] = useState("");

  const formatPrice = (value) => {
    const formattedValue = value.toFixed(2).replace(".", ",");
    return `R$ ${formattedValue}`;
  };

  const precoParcelado = formatPrice(preco / 10);
  const precoOriginal = formatPrice(preco * 1.1);
  const precoFormatted = formatPrice(preco);

  const link_1 = `//api.whatsapp.com/send?phone=5521978991540&text=Olá tudo bem? Eu estava olhando o site de vocês e gostaria de mais informações sobre o produto ${nome} ${produtoCod} ${cor}, poderia me passar mais informações sobre?`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    const imagens = event.currentTarget.img.files;
    for (let i = 0; i < imagens.length; i++) {
      formData.append(imagens[i].name, imagens[i]);
    }

    // Garantir que todos os campos de formulário necessários estão presentes
    formData.append("nome", nome || "");
    formData.append("nome_long", event.currentTarget.nome_long?.value || "");
    formData.append("produto_cod", produtoCod || "");
    formData.append("situacao", situacao || "");
    formData.append("rangedevalor", rangedevalor || "");
    formData.append("categoria", categoriaSelecionada || "");
    formData.append("sub_categoria", subcategoriaSelecionada || "");
    formData.append("descricao", event.currentTarget.descricao?.value || "");
    formData.append("preco", precoFormatted);
    formData.append("preco_original", precoOriginal);
    formData.append("preco_parcelado", precoParcelado);
    formData.append("altura", event.currentTarget.altura?.value || "");
    formData.append("largura", event.currentTarget.largura?.value || "");
    formData.append("cor", cor || "");
    formData.append("link_1", link_1);
    formData.append("link_2", event.currentTarget.link_2?.value || "");
    formData.append(
      "disponibilidade",
      event.currentTarget.disponibilidade?.value || ""
    );
    formData.append(
      "profundidade_aberto",
      event.currentTarget.profundidade_aberto?.value || ""
    );
    formData.append("estrutura", event.currentTarget.estrutura?.value || "");

    if (subcategoriaSelecionada === "Sofa Retratil") {
      formData.append("assento", event.currentTarget.assento?.value || "");
      formData.append("encosto", event.currentTarget.encosto?.value || "");
      formData.append("braco", event.currentTarget.braco?.value || "");
      formData.append(
        "revestimento",
        event.currentTarget.revestimento?.value || ""
      );
      formData.append(
        "profundidade_fechado",
        event.currentTarget.profundidade_fechado?.value || ""
      );
    }

    try {
      await postProdutosAction(formData);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-col m-5">
      <div className="flex flex-wrap gap-6 items-center p-6 justify-center">
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="text"
          id="nome_long"
          name="nome_long"
          placeholder="Nome longo do Produto"
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="text"
          id="produto_cod"
          name="produto_cod"
          placeholder="Código do Produto"
          value={produtoCod}
          onChange={(e) => setProdutoCod(e.target.value)}
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <select
          id="situacao"
          name="situacao"
          value={situacao}
          onChange={(e) => setSituacao(e.target.value)}
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Situação do Produto</option>
          <option value="destaque">Produto em Destaque</option>
          <option value="promocao">Produto em Promoção</option>
          <option value="queima">Produto em Queima de estoque</option>
        </select>
        <select
          id="categoria"
          name="categoria"
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Categoria</option>
          <option value="Sala de estar">Sala de estar</option>
          <option value="Cozinha">Cozinha</option>
          <option value="Banheiro">Banheiro</option>
          <option value="Quarto de casal">Quarto de casal</option>
          <option value="Quarto de solteiro">Quarto de solteiro</option>
          <option value="Escritorio">Escritório</option>
          <option value="Lavanderia">Lavanderia</option>
        </select>
        <select
          id="sub_categoria"
          name="sub_categoria"
          value={subcategoriaSelecionada}
          onChange={(e) => setsubCategoriaSelecionada(e.target.value)}
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Sub Categoria</option>
          {categoriaSelecionada === "Sala de estar" && (
            <>
              <option value="Sofa Retratil">Sofá Retrátil</option>
              <option value="Sofa Canto">Sofá de Canto</option>
              <option value="Sofa 2 e 3 lugares">Sofá de 2 e 3 lugares</option>
              <option value="Poltronas">Poltronas</option>
              <option value="Estante">Estante</option>
              <option value="Painel">Painel</option>
              <option value="Armario">Armário</option>
              <option value="Mesa de jantar">Mesa de Jantar</option>
            </>
          )}
          {categoriaSelecionada === "Cozinha" && (
            <>
              <option value="Balcao de Cozinha">Balcão de cozinha</option>
              <option value="Mesa de aluminio">Mesa de aluminio</option>
              <option value="Kit de cozinha">Kit Cozinha</option>
            </>
          )}
          {categoriaSelecionada === "Banheiro" && (
            <>
              <option value="Armario de banheiro">Armário de Banheiro</option>
            </>
          )}
          {categoriaSelecionada === "Quarto de casal" && (
            <>
              <option value="Cama de Casal">Cama de Casal</option>
              <option value="Guarda Roupa Casal">Guarda Roupa Casal</option>
              <option value="Base de Casal">Base de Casal</option>
              <option value="Colchão de Casal">Colchão de Casal</option>
            </>
          )}
          {categoriaSelecionada === "Quarto de solteiro" && (
            <>
              <option value="Cama de Solteiro">Cama de Solteiro</option>
              <option value="Base de Solteiro">Base de Solteiro</option>
              <option value="Colchão de Solteiro">Colchão de Solteiro</option>
              <option value="Guarda Roupa Solteiro">
                Guarda Roupa Solteiro
              </option>
            </>
          )}
          {categoriaSelecionada === "Escritório" && (
            <>
              <option value="Escrivaninha">Escrivaninha</option>
              <option value="Estante de livros">Estante de Livros</option>
            </>
          )}
          {categoriaSelecionada === "Lavanderia" && (
            <>
              <option value="Multiuso">Multiuso</option>
            </>
          )}
        </select>
        <input
          type="text"
          id="descricao"
          name="descricao"
          placeholder="Descrição"
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="text"
          id="profundidade_aberto"
          name="profundidade_aberto"
          placeholder="Profundidade/Profundidade Aberto (Retrátil)"
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <select
          id="rangedevalor"
          name="rangedevalor"
          value={rangedevalor}
          onChange={(e) => setRangedevalor(e.target.value)}
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Selecione o Range de Valor</option>
          <option value="499">Menor de R$500,00</option>
          <option value="999">Menor de R$1000,00</option>
          <option value="1499">Menor de R$1500,00</option>
          <option value="1999">Menor de R$2000,00</option>
          <option value="2499">Menor de R$2500,00</option>
          <option value="2999">Menor de R$3000,00</option>
          <option value="3999">Menor de R$4000,00</option>
          <option value="4999">Menor de R$5000,00</option>
        </select>
        <input
          type="number"
          id="preco"
          name="preco"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(parseFloat(e.target.value) || 0)}
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="hidden"
          id="preco_original"
          name="preco_original"
          value={precoOriginal}
        />
        <input
          type="hidden"
          id="preco_parcelado"
          name="preco_parcelado"
          value={precoParcelado}
        />
        <input
          type="text"
          id="altura"
          name="altura"
          placeholder="Altura"
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="text"
          id="largura"
          name="largura"
          placeholder="Largura"
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <select
          id="cor"
          name="cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Cor</option>
          <option value="Azul">Azul</option>
          <option value="Vermelho">Vermelho</option>
          <option value="Preto">Preto</option>
          <option value="Cinza">Cinza</option>
          <option value="Marrom">Marrom</option>
          <option value="Terracota">Terracota</option>
          <option value="Verde">Verde</option>
          <option value="Bege">Bege</option>
          <option value="Rosa Escuro">Rosa Escuro</option>
          <option value="Vinho">Vinho</option>
          <option value="Rose">Rose</option>
          <option value="Bege Claro">Bege Claro</option>
          <option value="Cinza Claro">Cinza Claro</option>
          <option value="Amarelo">Amarelo</option>
          <option value="Branco">Branco</option>
          <option value="Off white">Off white</option>
          <option value="Capuccino">Capuccino</option>
          <option value="Cinza/Grafite">Cinza/Grafite</option>
          <option value="Mel">Mel</option>
        </select>
        <input type="hidden" id="link_1" name="link_1" value={link_1} />
        <input
          type="hidden"
          id="link_2"
          name="link_2"
          placeholder="Link Opcional"
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        {subcategoriaSelecionada === "Sofa Retratil" && (
          <>
            <input
              type="text"
              id="profundidade_fechado"
              name="profundidade_fechado"
              placeholder="Profundidade fechado"
              className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
            <input
              type="text"
              id="assento"
              name="assento"
              placeholder="Assento"
              className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
            <input
              type="text"
              id="encosto"
              name="encosto"
              placeholder="Encosto"
              className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
            <input
              type="text"
              id="braco"
              name="braco"
              placeholder="Braços"
              className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
            <input
              type="text"
              id="revestimento"
              name="revestimento"
              placeholder="Revestimento"
              className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
          </>
        )}
        <input
          type="hidden"
          id="disponibilidade"
          name="disponibilidade"
          placeholder="Disponibilidade"
          value="sim"
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="file"
          name="img"
          id="img"
          multiple
          className="border border-gray-300 w-full max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <Button className="bg-red-700 text-white py-4 px-6 text-2xl rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
        Adicionar
      </Button>
    </form>
  );
}
