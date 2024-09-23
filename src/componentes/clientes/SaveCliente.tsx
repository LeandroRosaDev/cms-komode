//@ts-nocheck
"use client";

import html2canvas from "html2canvas";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function SaveCliente({ cliente }) {
  const [saidaData, setSaidaData] = useState("");
  const [saidaHora, setSaidaHora] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");

  // const formatPhoneNumber = (phoneNumber) => {
  //   // Remove todos os caracteres que não são dígitos e adiciona "55" no início
  //   const cleanedNumber = phoneNumber.replace(/\D/g, ""); // Remove tudo que não é número
  //   const formattedNumber = `55${cleanedNumber}`;

  //   return formattedNumber;
  // };

  // const telefoneFormatado = formatPhoneNumber(cliente.telefone_2);
  const telefoneFormatado = 5521998404833;

  const total =
    (cliente.qtd_1 * cliente.subtotal_1 || 0) +
    (cliente.qtd_2 * cliente.subtotal_2 || 0) +
    (cliente.qtd_3 * cliente.subtotal_3 || 0) +
    (cliente.qtd_4 * cliente.subtotal_4 || 0) +
    (cliente.qtd_5 * cliente.subtotal_5 || 0);

  const pagamento = cliente.numero_parcelas
    ? `Parcelamento em ${cliente.numero_parcelas}x de R$${Math.ceil(
        ((cliente.qtd_1 * cliente.subtotal_1 || 0) +
          (cliente.qtd_2 * cliente.subtotal_2 || 0) +
          (cliente.qtd_3 * cliente.subtotal_3 || 0) +
          (cliente.qtd_4 * cliente.subtotal_4 || 0) +
          (cliente.qtd_5 * cliente.subtotal_5 || 0)) /
          cliente.numero_parcelas
      )},00 no cartão de crédito`
    : "Pagamento à vista";

  const produtos = [
    cliente.produto_1 && `👉🏻 ${cliente.produto_1} (Qtd: ${cliente.qtd_1})`,
    cliente.produto_2 && `👉🏻 ${cliente.produto_2} (Qtd: ${cliente.qtd_2})`,
    cliente.produto_3 && `👉🏻 ${cliente.produto_3} (Qtd: ${cliente.qtd_3})`,
    cliente.produto_4 && `👉🏻 ${cliente.produto_4} (Qtd: ${cliente.qtd_4})`,
    cliente.produto_5 && `👉🏻 ${cliente.produto_5} (Qtd: ${cliente.qtd_5})`,
  ]
    .filter(Boolean) // Remove entradas nulas ou falsas
    .join("\n");

  const whatsappMessage = `
    👩🏻‍🦱 Cliente
    👉🏻 ${cliente.nome}
    
    📍 Endereço
    👉🏻 ${cliente.rua}, ${cliente.numero} - ${cliente.bairro} - ${cliente.cidade}
    
    🚩 Ponto de Referência
    👉🏻 ${cliente.ponto_referencia}
    
    ☎️ Telefones
    👉🏻 ${cliente.telefone_1}
    👉🏻 ${cliente.telefone_2}
    
    🛋️ Produtos
    ${produtos}

    💰 Forma de Pagamento
    ${pagamento}

    💰 Total
    👉🏻 R$ ${total}`;

  const whatsappLink = `https://api.whatsapp.com/send?phone=${telefoneFormatado}&text=${encodeURIComponent(
    whatsappMessage
  )}`;

  useEffect(() => {
    // Ao carregar a página, atualiza a "Data Saída" e "Hora Saída"
    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    setSaidaData(formattedDate);
    setSaidaHora(formattedTime);
    setOriginalTitle(document.title);
  }, []); // Executa apenas uma vez, quando o componente é montado

  function handleSave() {
    document.title = `Nota fiscal de ${cliente.nome}`;

    setTimeout(() => {
      window.print();
      document.title = originalTitle;
    }, 200);
  }

  return (
    <section
      className="flex flex-col items-center justify-center bg-white rounded-lg mb-6 avoid-break-inside"
      id="printable-area"
    >
      <div className="element-visible p-6  min-h-screen print:hidden">
        <div className="bg-white p-6 rounded-lg sm:shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Detalhes do Cliente
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cliente.nome_receber && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Nome para receber:</h2>
                <p>{cliente.nome_receber}</p>
              </div>
            )}
            {cliente.cidade && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Cidade:</h2>
                <p>{cliente.cidade}</p>
              </div>
            )}
            {cliente.bairro && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Bairro:</h2>
                <p>{cliente.bairro}</p>
              </div>
            )}
            {cliente.rua && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Rua:</h2>
                <p>{cliente.rua}</p>
              </div>
            )}
            {cliente.numero && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Número:</h2>
                <p>{cliente.numero}</p>
              </div>
            )}
            {cliente.cep && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">CEP:</h2>
                <p>{cliente.cep}</p>
              </div>
            )}
            {cliente.ponto_referencia && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">
                  Ponto de Referência:
                </h2>
                <p>{cliente.ponto_referencia}</p>
              </div>
            )}
            {cliente.telefone_1 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Telefone 1:</h2>
                <p>{cliente.telefone_1}</p>
              </div>
            )}
            {cliente.telefone_2 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Telefone 2:</h2>
                <p>{cliente.telefone_2}</p>
              </div>
            )}
            {cliente.produto_1 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 1:</h2>
                <p>
                  {cliente.desc_1} (Qtd: {cliente.qtd_1})
                </p>
              </div>
            )}
            {cliente.produto_2 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 2:</h2>
                <p>
                  {cliente.desc_2} (Qtd: {cliente.qtd_2})
                </p>
              </div>
            )}
            {cliente.produto_3 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 3:</h2>
                <p>
                  {cliente.desc_3} (Qtd: {cliente.qtd_3})
                </p>
              </div>
            )}
            {cliente.produto_4 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 4:</h2>
                <p>
                  {cliente.desc_4} (Qtd: {cliente.qtd_4})
                </p>
              </div>
            )}
            {cliente.produto_5 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 5:</h2>
                <p>
                  {cliente.desc_5} (Qtd: {cliente.qtd_5})
                </p>
              </div>
            )}

            {cliente.forma_pgto && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Forma de pagamento:</h2>
                <p>{cliente.forma_pgto}</p>
              </div>
            )}
            {cliente.numero_parcelas && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Número de parcelas:</h2>
                <p>{cliente.numero_parcelas}</p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
              <h2 className="font-bold text-gray-700">Total:</h2>
              <p>R${total},00</p>
            </div>
          </div>
          <div className="flex mt-4 justify-center">
            <button
              onClick={handleSave}
              className="bg-green-700 text-white mx-2 px-4 py-4 rounded-lg shadow hover:bg-green-600 transition-colors duration-300 hidden sm:flex items-center justify-center gap-2"
            >
              <Image
                src="/assets/icones/27.svg"
                alt="icone de um telefone"
                width={30}
                height={30}
              />
              Emitir Nota
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              className="bg-green-700 mx-2 text-white px-4 py-4 rounded-lg shadow hover:bg-green-600 transition-colors duration-300 gap-2"
            >
              Enviar Entregador
            </a>
          </div>
        </div>
      </div>

      <div className="element-hidden p-6 w-[1200px]  mx-auto my-auto border border-black print:block ">
        <div className="mb-20 border-b border-dashed border-black pb-10 grid grid-cols-7 gap-3 ">
          <div className="col-span-6">
            <div className="grid ">
              <div className="text-left border border-black">
                <span className="block  p-1">
                  Recebemos de Komode Móveis os produtos constantes no CUPOM
                  FISCAL INDICADO AO LADO
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-left col-span-1">
                <span className="block font-bold text-xs border-x border-b border-black p-1 h-20 ">
                  Data de recebimento:
                </span>
              </div>
              <div className="text-left col-span-2">
                <span className="block border-r border-black border-b font-bold text-xs h-20 p-1">
                  Identificação e assinatura do recebedor
                </span>
              </div>
            </div>
          </div>
          <div className="text-center border flex flex-col justify-center border-black p-2 col-span-1">
            <span className="block font-bold">CF-e</span>
            <span className="block font-bold text-sm">
              Nº {cliente.numero_nota}
            </span>
            <span className="block font-bold">Série 1</span>
          </div>
        </div>
        <div className="flex justify-between items-center  mb-4">
          <div className="flex flex-col items-center justify-center gap-2 border border-black p-2 h-[250px] w-[500px]">
            <Image
              src="/assets/logotipo.png"
              alt="Logotipo Bling"
              width={228}
              height={62}
            />
            <span className="text-xs">Komode Móveis</span>

            <span className="text-xs">www.komodemoveis.com.br</span>
          </div>
          <div className="flex flex-col text-center px-14 py-2 ">
            <span className="font-bold">CUPOM FISCAL</span>
            <span className="text-sm">Documento fiscal de compra</span>
            <div className="flex items-center justify-center gap-2">
              <div className="flex flex-col">
                <span className="text-sm text-left mr-2">1 - Entrada</span>
                <span className="text-sm text-left">2 - Saida</span>
              </div>
              <span className="text-sm border border-black px-4 py-2">2</span>
            </div>
            <span className="text-sm">Página 1 de 1</span>
            <span className="text-base font-bold">
              Nº {cliente.numero_nota}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 border border-black p-2 h-[250px] w-[500px]">
            <span className="text-xs">Dúvidas sugestões ou reclamações:</span>
            <Image
              src="/assets/qrcode.png"
              alt="QrCode"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="text-left border border-black p-2 grid grid-cols-2">
          <div>
            <span className="block text-sm">Natureza da operação</span>
            <span className="block font-bold">Venda de mercadorias</span>
          </div>
        </div>
        <span className="block font-bold mt-2 pb-2">Dados da empresa</span>
        <div className="mb-10 border border-black">
          <div className="grid grid-cols-2">
            <div>
              <span className="block font-bold text-xs border-r border-black p-1">
                Nome Empresarial/Razão Social:
              </span>
              <span className="block border-r border-black border-b p-1">
                Komode Moveis e Decorados
              </span>
              <span className="block font-bold text-xs border-r border-black p-1">
                CNPJ:
              </span>
              <span className="block border-r border-black border-b p-1">
                54.251.497/0001-40
              </span>
              <span className="block font-bold text-xs border-r border-black p-1">
                Endereço:
              </span>
              <span className="block border-r border-black  p-1">
                Av. Presidente Vargas
              </span>
            </div>
            <div className="text-left">
              <span className="block font-bold text-xs p-1">Bairro:</span>
              <span className="block  border-black border-b p-1">Centro</span>
              <span className="block font-bold text-xs  p-1">CEP:</span>
              <span className="block  border-black border-b p-1">
                20230-010
              </span>
              <span className="block font-bold text-xs  p-1">Município:</span>
              <span className="block  border-black p-1">Rio de Janeiro</span>
            </div>
          </div>
        </div>
        <span className="block font-bold mt-2 pb-2">
          Destinatário/Remetente
        </span>
        <div className="mb-10 border border-black">
          <div className="grid grid-cols-2">
            <div>
              <span className="block font-bold text-xs border-r border-black p-1">
                Nome/Razão Social:
              </span>
              <span className="block border-r border-black border-b p-1">
                {cliente.nome}
              </span>

              <span className="block font-bold text-xs border-r border-black p-1">
                Endereço:
              </span>
              <span className="block border-r border-black border-b p-1">
                {cliente.rua}, {cliente.numero}
              </span>
              <span className="block font-bold text-xs border-r border-black p-1">
                Bairro:
              </span>
              <span className="block border-r border-black border-b p-1">
                {cliente.bairro}
              </span>
              <span className="block font-bold text-xs border-r border-black p-1">
                Município:
              </span>
              <span className="block border-b border-r border-black p-1">
                {cliente.cidade}
              </span>
              <span className="block font-bold text-xs border-r border-black p-1">
                CEP:
              </span>
              <span className="block border-r border-b border-black p-1">
                {cliente.cep}
              </span>
              <span className="block font-bold text-xs border-r border-black p-1">
                UF:
              </span>
              <span className="block border-r  border-black p-1">RJ</span>
            </div>
            <div className="text-left">
              <span className="block font-bold text-xs  p-1">CPF/CNPJ:</span>
              <span className="block  border-black border-b p-1">
                {cliente.cpf}
              </span>
              <span className="block font-bold text-xs  p-1">Telefone:</span>
              <span className="block  border-black border-b p-1">
                {cliente.telefone_1}
              </span>
              <span className="block font-bold text-xs  p-1">Telefone (2)</span>
              <span className="block border-b border-black p-1">
                {" "}
                {cliente.telefone_2}{" "}
              </span>
              <span className="block font-bold text-xs  p-1">
                Data emissão:
              </span>
              <span className="block  border-black border-b p-1">
                {cliente.data_emissao}
              </span>
              <span className="block font-bold text-xs  p-1">Data saída: </span>
              <span className="block  border-black border-b p-1">
                {saidaData}
              </span>
              <span className="block font-bold text-xs  p-1">Hora saída:</span>
              <span className="block  p-1">{saidaHora}</span>
            </div>
          </div>
        </div>
        <span className="block font-bold mt-2 pb-2">Itens do cupom fiscal</span>
        <div className="mb-10 border border-black">
          <div className="grid grid-cols-6 text-center bg-gray-200 font-bold">
            <div className="p-1 border-r border-black">Nome</div>
            <div className="p-1 border-r border-black col-span-2">
              Descrição
            </div>
            <div className="p-1 border-r border-black">Quantidade</div>
            <div className="p-1 border-r border-black">Valor Unitário</div>
            <div className="p-1">Valor Total</div>
          </div>
          <div className="grid grid-cols-6 text-center">
            <div className="p-1 border-r border-black">{cliente.produto_1}</div>
            <div className="p-1 border-r border-black col-span-2">
              {cliente.desc_1}
            </div>
            <div className="p-1 border-r border-black">{cliente.qtd_1}</div>
            <div className="p-1 border-r border-black">
              R${cliente.subtotal_1},00
            </div>
            <div className="p-1">R${cliente.subtotal_1 * cliente.qtd_1},00</div>
          </div>
          {cliente.produto_2 && (
            <div className="grid grid-cols-6 text-center">
              <div className="p-1 border-r border-black">
                {cliente.produto_2}
              </div>
              <div className="p-1 border-r border-black col-span-2">
                {cliente.desc_2}
              </div>
              <div className="p-1 border-r border-black">{cliente.qtd_2}</div>
              <div className="p-1 border-r border-black">
                R${cliente.subtotal_2},00
              </div>
              <div className="p-1">
                R${cliente.subtotal_2 * cliente.qtd_2},00
              </div>
            </div>
          )}
          {cliente.produto_3 && (
            <div className="grid grid-cols-6 text-center">
              <div className="p-1 border-r border-black">
                {cliente.produto_3}
              </div>
              <div className="p-1 border-r border-black col-span-2">
                {cliente.desc_3}
              </div>
              <div className="p-1 border-r border-black">{cliente.qtd_3}</div>
              <div className="p-1 border-r border-black">
                R${cliente.subtotal_3},00
              </div>
              <div className="p-1">
                R${cliente.subtotal_3 * cliente.qtd_3},00
              </div>
            </div>
          )}
          {cliente.produto_4 && (
            <div className="grid grid-cols-6 text-center">
              <div className="p-1 border-r border-black">
                {cliente.produto_4}
              </div>
              <div className="p-1 border-r border-black col-span-2">
                {cliente.desc_4}
              </div>
              <div className="p-1 border-r border-black">{cliente.qtd_4}</div>
              <div className="p-1 border-r border-black">
                R${cliente.subtotal_4},00
              </div>
              <div className="p-1">
                R${cliente.subtotal_4 * cliente.qtd_4},00
              </div>
            </div>
          )}
          {cliente.produto_5 && (
            <div className="grid grid-cols-6 text-center">
              <div className="p-1 border-r border-black">
                {cliente.produto_5}
              </div>
              <div className="p-1 border-r border-black col-span-2">
                {cliente.desc_5}
              </div>
              <div className="p-1 border-r border-black">{cliente.qtd_5}</div>
              <div className="p-1 border-r border-black">
                R${cliente.subtotal_5},00
              </div>
              <div className="p-1">
                R${cliente.subtotal_5 * cliente.qtd_5},00
              </div>
            </div>
          )}
        </div>
        <span className="block font-bold mt-2 pb-2">
          Total dos itens/serviços
        </span>
        <div className="mb-10 border border-black">
          <div className="grid grid-cols-4">
            <div>
              <span className="block font-bold text-xs border-r border-black p-1">
                Total dos itens
              </span>
              <span className="block border-r border-black p-1">
                R$
                {total}
                ,00
              </span>
            </div>
            <div className="text-left">
              <span className="block font-bold text-xs border-r border-black p-1 ">
                Método de Pagamento:
              </span>
              <span className="block border-r border-black   p-1">
                {cliente.forma_pgto}
              </span>
            </div>
            <div className="text-left">
              <span className="block font-bold text-xs border-r border-black p-1 ">
                Frete:
              </span>
              <span className="block border-r border-black   p-1">
                Não cobrado
              </span>
            </div>
            <div className="text-left">
              <span className="block font-bold text-xs p-1">
                Outros serviços:
              </span>
              <span className="block  p-1">Não cobrado</span>
            </div>
          </div>
        </div>
        <span className="block font-bold pb-2">Dados adicionais</span>
        <div className="border border-black h-36 p-2">
          <span className="block ">Observações:</span>
          {cliente.numero_parcelas && (
            <span className="block ">{pagamento}</span>
          )}
          {cliente.ponto_referencia && (
            <span className="block ">
              Ponto de referência: {cliente.ponto_referencia}
            </span>
          )}

          <span className="block ">
            Nome de quem receberá a entrega: {cliente.nome_receber}
          </span>
          {cliente.obs && (
            <span className="block ">Detalhes adicionais: {cliente.obs}</span>
          )}
        </div>
      </div>
    </section>
  );
}
