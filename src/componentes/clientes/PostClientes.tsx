"use client";

import { postClienteAction } from "@/actions/cliente/post-clientes-action";
import { useState } from "react";

export default function CadastrarClientePage() {
  const [nome, setNome] = useState("");
  const [nomeRecebedor, setNomeRecebedor] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone1, setTelefone1] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      nome,
      nomeRecebedor,
      endereco,
      cidade,
      estado,
      telefone1,
      telefone2,
      pontoReferencia,
      formaPagamento,
      observacoes,
    };
    await postClienteAction(formData);
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Cadastrar Cliente
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-gray-700">
              Nome do Cliente
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="nomeRecebedor" className="block text-gray-700">
              Nome de quem irá receber a entrega
            </label>
            <input
              type="text"
              id="nomeRecebedor"
              name="nomeRecebedor"
              value={nomeRecebedor}
              onChange={(e) => setNomeRecebedor(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="endereco" className="block text-gray-700">
              Endereço Completo
            </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="cidade" className="block text-gray-700">
              Cidade
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="estado" className="block text-gray-700">
              Estado
            </label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="telefone1" className="block text-gray-700">
              Telefone 1
            </label>
            <input
              type="text"
              id="telefone1"
              name="telefone1"
              value={telefone1}
              onChange={(e) => setTelefone1(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="telefone2" className="block text-gray-700">
              Telefone 2
            </label>
            <input
              type="text"
              id="telefone2"
              name="telefone2"
              value={telefone2}
              onChange={(e) => setTelefone2(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="pontoReferencia" className="block text-gray-700">
              Ponto de Referência
            </label>
            <input
              type="text"
              id="pontoReferencia"
              name="pontoReferencia"
              value={pontoReferencia}
              onChange={(e) => setPontoReferencia(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="formaPagamento" className="block text-gray-700">
              Forma de Pagamento
            </label>
            <input
              type="text"
              id="formaPagamento"
              name="formaPagamento"
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="observacoes" className="block text-gray-700">
              Observações
            </label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="border border-gray-300 w-full p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-3 rounded-md transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            Cadastrar Cliente
          </button>
        </form>
      </div>
    </section>
  );
}
