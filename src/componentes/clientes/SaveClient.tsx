// @ts-nocheck
"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function SaveClient({ cliente }) {
  async function handleSave() {
    const hiddenElements = document.querySelectorAll(".element-hidden");
    const visibleElements = document.querySelectorAll(".element-visible");

    visibleElements.forEach((el) => {
      el.classList.add("hidden");
    });
    hiddenElements.forEach((el) => {
      el.classList.remove("hidden");
    });

    const content = document.querySelector("#printable-area");

    const canvas = await html2canvas(content, {
      scale: 2,
    });

    visibleElements.forEach((el) => {
      el.classList.remove("hidden");
    });
    hiddenElements.forEach((el) => {
      el.classList.add("hidden");
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    pdf.save(`nota_de_${cliente.nome.replace(/\s+/g, "_").toLowerCase()}.pdf`);
  }

  return (
    <section
      className="flex flex-col items-center justify-center bg-white  rounded-lg  mb-6"
      id="printable-area"
    >
      <div class="element-visible text-start font-normal text-lg p-8 flex flex-col gap-6 bg-red-700 shadow-lg rounded-3xl mx-auto max-w-[1000px]">
        <h1 class="text-3xl font-medium text-white mb-6 text-center">
          {cliente.nome}
        </h1>
        <div class="grid grid-cols-2 gap-4">
          {cliente.nome_receber && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Nome para receber: </span>
              {cliente.nome_receber}
            </p>
          )}
          {cliente.cidade && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Cidade: </span>
              {cliente.cidade}
            </p>
          )}
          {cliente.bairro && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Bairro: </span>
              {cliente.bairro}
            </p>
          )}
          {cliente.rua && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Rua: </span>
              {cliente.rua}
            </p>
          )}
          {cliente.numero && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Número: </span>
              {cliente.numero}
            </p>
          )}
          {cliente.cep && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">CEP: </span>
              {cliente.cep}
            </p>
          )}
          {cliente.ponto_referencia && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Ponto de Referência: </span>
              {cliente.ponto_referencia}
            </p>
          )}
          {cliente.telefone_1 && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Telefone 1: </span>
              {cliente.telefone_1}
            </p>
          )}
          {cliente.telefone_2 && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Telefone 2: </span>
              {cliente.telefone_2}
            </p>
          )}
          {cliente.turno && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Turno: </span>
              {cliente.turno}
            </p>
          )}
          {cliente.produto_1 && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Produto 1: </span>
              {cliente.produto_1} (Qtd: {cliente.qtd_1})
            </p>
          )}
          {cliente.produto_2 && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Produto 2: </span>
              {cliente.produto_2} (Qtd: {cliente.qtd_2})
            </p>
          )}
          {cliente.produto_3 && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Produto 3: </span>
              {cliente.produto_3} (Qtd: {cliente.qtd_3})
            </p>
          )}
          {cliente.produto_4 && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Produto 4: </span>
              {cliente.produto_4} (Qtd: {cliente.qtd_4})
            </p>
          )}
          {cliente.produto_5 && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner">
              <span class="font-semibold">Produto 5: </span>
              {cliente.produto_5} (Qtd: {cliente.qtd_5})
            </p>
          )}
          {cliente.total && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner col-span-2">
              <span class="font-semibold">Total: </span>
              R$
              {(
                (cliente.qtd_1 * cliente.subtotal_1 || 0) +
                (cliente.qtd_2 * cliente.subtotal_2 || 0) +
                (cliente.qtd_3 * cliente.subtotal_3 || 0) +
                (cliente.qtd_4 * cliente.subtotal_4 || 0) +
                (cliente.qtd_5 * cliente.subtotal_5 || 0)
              ).toFixed(2)}
            </p>
          )}
          {cliente.forma_pgto && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner col-span-2">
              <span class="font-semibold">Forma de pagamento: </span>
              {cliente.forma_pgto}
            </p>
          )}
          {cliente.numero_parcelas && (
            <p class="bg-gray-50 p-2 rounded-md shadow-inner col-span-2">
              <span class="font-semibold">Número de parcelas: </span>
              {cliente.numero_parcelas}
            </p>
          )}
        </div>
        <button
          onClick={handleSave}
          class="border-2 p-3 w-44 text-center mx-auto border-red-500 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition-colors duration-300"
        >
          Emitir Nota
        </button>
      </div>

      <div class="element-hidden hidden p-14 flex flex-col justify-between w-[1400px] h-[1000px] mx-auto border rounded-lg mt-[200px]">
        <div>
          <div class="flex flex-col mb-4">
            <img
              src="/assets/logotipo.png"
              alt="Imagem do logotipo da nota"
              class="w-96 m-auto"
            />
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm font-bold mb-6 mt-[100px]">
            <div>
              <h1>Data: {cliente.data} 28/06/2024</h1>
              <h1>Nome: {cliente.nome}</h1>
              <h1>Numero da nota: 394</h1>
              <h1>
                Endereço: Rua {cliente.rua} nº{cliente.numero} -{" "}
                {cliente.bairro} {cliente.cep} - {cliente.cidade} RJ
              </h1>
            </div>

            <div>
              <h1>Método de Pagamento: {cliente.forma_pgto}</h1>
              <h1>Contato: {cliente.telefone_1}</h1>
              <h1>Contato 2: {cliente.telefone_2}</h1>
              <h1>Ponto de Referência: {cliente.ponto_referencia}</h1>
            </div>
          </div>
          <div class="grid grid-cols-6 gap-2 bg-white">
            <div class="border p-2 text-center font-bold bg-slate-200">
              Produto
            </div>
            <div class="border p-2 text-center font-bold col-span-2 bg-slate-200">
              Descrição Produto
            </div>
            <div class="border p-2 text-center font-bold bg-slate-200">
              Preço
            </div>
            <div class="border p-2 text-center font-bold bg-slate-200">Qtd</div>
            <div class="border p-2 text-center font-bold bg-slate-200">
              SubTotal
            </div>

            {cliente.data && (
              <div class="border p-2 text-center col-span-1">
                {cliente.data}
              </div>
            )}

            {cliente.produto_1 && (
              <>
                <div class="border p-2 text-center col-span-1">
                  {cliente.produto_1}
                </div>
                <div class="border p-2 text-center col-span-2">
                  {cliente.desc_1}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.subtotal_1}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_1}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_1 * cliente.subtotal_1}
                </div>
              </>
            )}

            {cliente.produto_2 && (
              <>
                <div class="border p-2 text-center col-span-1">
                  {cliente.produto_2}
                </div>
                <div class="border p-2 text-center col-span-2">
                  {cliente.desc_2}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.subtotal_2}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_2}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_2 * cliente.subtotal_2}
                </div>
              </>
            )}

            {cliente.produto_3 && (
              <>
                <div class="border p-2 text-center col-span-1">
                  {cliente.produto_3}
                </div>
                <div class="border p-2 text-center col-span-2">
                  {cliente.desc_3}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.subtotal_3}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_3}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_3 * cliente.subtotal_3}
                </div>
              </>
            )}

            {cliente.produto_4 && (
              <>
                <div class="border p-2 text-center col-span-1">
                  {cliente.produto_4}
                </div>
                <div class="border p-2 text-center col-span-2">
                  {cliente.desc_4}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.subtotal_4}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_4}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_4 * cliente.subtotal_4}
                </div>
              </>
            )}

            {cliente.produto_5 && (
              <>
                <div class="border p-2 text-center col-span-1">
                  {cliente.produto_5}
                </div>
                <div class="border p-2 text-center col-span-2">
                  {cliente.desc_5}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.subtotal_5}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_5}
                </div>
                <div class="border p-2 text-center col-span-1">
                  {cliente.qtd_5 * cliente.subtotal_5}
                </div>
              </>
            )}
          </div>
        </div>

        <div class="mt-4 flex flex-row justify-between gap-3">
          <div className="flex flex-col gap-3">
            <div class="mt-6 mb-12">
              <h1 class="text-5xl font-bold text-red-700">MUITO OBRIGADO</h1>
              <p class="text-2xl text-red-700">AGRADECEMOS A PREFERÊNCIA!</p>
            </div>
            <div class="flex gap-1 items-center ">
              <img
                src="/assets/icones/1.svg"
                alt="icone de um telefone"
                class="h-6"
              />
              <p class="text-sm">+55 (21) 97899-1540</p>
            </div>
            <div class="flex gap-1 items-center ">
              <img
                src="/assets/icones/2.svg"
                alt="icone de um telefone"
                class="h-6"
              />
              <p class="text-sm">contato@komode.com</p>
            </div>
            <div class="flex gap-1 items-center ">
              <img
                src="/assets/icones/3.svg"
                alt="icone de um telefone"
                class="h-6"
              />
              <p class="text-sm">www.komodemoveis.com.br</p>
            </div>
          </div>
          <div class="mt-[150px] text-right col-span-5">
            <p class="text-2xl border p-4 font-medium bg-slate-200">
              Total: R$
              {(
                (cliente.qtd_1 * cliente.subtotal_1 || 0) +
                (cliente.qtd_2 * cliente.subtotal_2 || 0) +
                (cliente.qtd_3 * cliente.subtotal_3 || 0) +
                (cliente.qtd_4 * cliente.subtotal_4 || 0) +
                (cliente.qtd_5 * cliente.subtotal_5 || 0)
              ).toFixed(2)}
            </p>
            <p class="text-xl font-bold"></p>
          </div>
        </div>
      </div>
    </section>
  );
}
