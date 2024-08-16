"use client";

import { postClienteAction } from "@/actions/cliente/post-clientes-action";
import { useState } from "react";
import Image from "next/image";

export default function CadastrarClientePage() {
  const [formData, setFormData] = useState({
    nome: "",
    nome_receber: "",
    telefone_1: "",
    telefone_2: "",
    rua: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    ponto_referencia: "",
    turno: "",
    produto_1: "",
    desc_1: "",
    qtd_1: "",
    subtotal_1: "",
    produto_2: "",
    desc_2: "",
    qtd_2: "",
    subtotal_2: "",
    produto_3: "",
    desc_3: "",
    qtd_3: "",
    subtotal_3: "",
    produto_4: "",
    desc_4: "",
    qtd_4: "",
    subtotal_4: "",
    produto_5: "",
    desc_5: "",
    qtd_5: "",
    subtotal_5: "",
    total: "",
    forma_pgto: "",
    numero_parcelas: "",
  });

  const [numProdutos, setNumProdutos] = useState(1);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await postClienteAction(formData);
  };

  const handleNumProdutosChange = (e: any) => {
    const { value } = e.target;
    setNumProdutos(Number(value));
  };

  const renderProdutoFields = (index: number) => (
    <div
      key={index}
      className="col-span-6 grid grid-cols-6 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    >
      <div className="col-span-6 sm:col-span-1">
        <label htmlFor={`produto_${index}`} className="block text-gray-700">
          Nome Produto {index}
        </label>
        <input
          type="text"
          id={`produto_${index}`}
          name={`produto_${index}`}
          value={(formData as any)[`produto_${index}`]}
          onChange={handleChange}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="col-span-6 sm:col-span-1">
        <label htmlFor={`desc_${index}`} className="block text-gray-700">
          Desc Produto {index}
        </label>
        <input
          type="text"
          id={`desc_${index}`}
          name={`desc_${index}`}
          value={(formData as any)[`desc_${index}`]}
          onChange={handleChange}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <div className="col-span-3 sm:col-span-1">
        <label htmlFor={`qtd_${index}`} className="block text-gray-700">
          Qtd {index}
        </label>
        <select
          id={`qtd_${index}`}
          name={`qtd_${index}`}
          value={(formData as any)[`qtd_${index}`]}
          onChange={handleChange}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="col-span-3 sm:col-span-1">
        <label htmlFor={`subtotal_${index}`} className="block text-gray-700">
          Subtotal {index}
        </label>
        <input
          type="text"
          id={`subtotal_${index}`}
          name={`subtotal_${index}`}
          value={(formData as any)[`subtotal_${index}`]}
          onChange={handleChange}
          className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
    </div>
  );

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Cadastrar Cliente
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4">
          <div className="col-span-6 sm:col-span-6 md:col-span-3">
            <label htmlFor="nome" className="block text-gray-700">
              Nome do Cliente
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-3">
            <label htmlFor="nome_receber" className="block text-gray-700">
              Nome de quem irá receber a entrega
            </label>
            <input
              type="text"
              id="nome_receber"
              name="nome_receber"
              value={formData.nome_receber}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-3">
            <label htmlFor="rua" className="block text-gray-700">
              Rua
            </label>
            <input
              type="text"
              id="rua"
              name="rua"
              value={formData.rua}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-1">
            <label htmlFor="numero" className="block text-gray-700">
              Número
            </label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2">
            <label htmlFor="bairro" className="block text-gray-700">
              Bairro
            </label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-1">
            <label htmlFor="cep" className="block text-gray-700">
              CEP
            </label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2">
            <label htmlFor="cidade" className="block text-gray-700">
              Cidade
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-3">
            <label htmlFor="ponto_referencia" className="block text-gray-700">
              Ponto de Referência
            </label>
            <input
              type="text"
              id="ponto_referencia"
              name="ponto_referencia"
              value={formData.ponto_referencia}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-2">
            <label htmlFor="telefone_1" className="block text-gray-700">
              Telefone 1
            </label>
            <input
              type="text"
              id="telefone_1"
              name="telefone_1"
              value={formData.telefone_1}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-2">
            <label htmlFor="telefone_2" className="block text-gray-700">
              Telefone 2
            </label>
            <input
              type="text"
              id="telefone_2"
              name="telefone_2"
              value={formData.telefone_2}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
          </div>

          <div className="col-span-3 sm:col-span-3 md:col-span-1">
            <label htmlFor="turno" className="block text-gray-700">
              Turno
            </label>
            <select
              id="turno"
              name="turno"
              value={formData.turno}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            >
              <option value="Manha">Manhã</option>
              <option value="Tarde">Tarde</option>
            </select>
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-1">
            <label htmlFor="num_produtos" className="block text-gray-700">
              Qtd de Produtos
            </label>
            <select
              id="num_produtos"
              name="num_produtos"
              value={numProdutos}
              onChange={handleNumProdutosChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          {Array.from({ length: numProdutos }, (_, i) =>
            renderProdutoFields(i + 1)
          )}

          <div className="col-span-6 sm:col-span-6 md:col-span-2">
            <label htmlFor="forma_pgto" className="block text-gray-700">
              Forma de Pagamento
            </label>
            <select
              id="forma_pgto"
              name="forma_pgto"
              value={formData.forma_pgto}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            >
              <option value={"Selecione"}>Selecione</option>
              <option value={"Dinheiro"}>Dinheiro</option>
              <option value={"Cartão de Crédito"}>Cartão de Crédito</option>
              <option value={"Cartão de Débito"}>Cartão de Débito</option>
              <option value={"Cartão | Pix"}>Cartão | Pix</option>
              <option value={"Cartão | Dinheiro"}>Cartão | Dinheiro</option>
              <option value={"Cartão Débito | Cartão Crédito"}>
                Cartão Débito | Cartão Crédito
              </option>
              <option value={"Pix | Dinheiro "}>Pix | Dinheiro </option>
              <option value={"Pix"}>Pix</option>
            </select>
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-1">
            <label htmlFor="numero_parcelas" className="block text-gray-700">
              Nº de Parcelas
            </label>
            <select
              id="numero_parcelas"
              name="numero_parcelas"
              value={formData.numero_parcelas}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-1">
            <label htmlFor="total" className="block text-gray-700">
              Total
            </label>
            <input
              type="number"
              id="total"
              name="total"
              value={formData.total}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-2 flex gap-1">
            <button
              type="reset"
              className="bg-red-700 text-white py-2 px-4 text-xl rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline flex items-center gap-1"
            >
              <Image
                src="/assets/icones/18.svg"
                alt="logotipo"
                width={20}
                height={20}
              />
              Resetar
            </button>
            <button
              type="submit"
              className="bg-green-700 text-white py-2 px-4 text-xl rounded transition duration-100 hover:bg-green-600 focus:outline-none focus:shadow-outline flex items-center gap-1"
            >
              <Image
                src="/assets/icones/19.svg"
                alt="logotipo"
                width={20}
                height={20}
              />
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
