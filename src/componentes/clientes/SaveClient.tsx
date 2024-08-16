// @ts-nocheck
"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { Button } from "../form-componentes/Button";

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
      <div className="element-visible p-6  min-h-screen">
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
            {cliente.turno && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Turno:</h2>
                <p>{cliente.turno}</p>
              </div>
            )}
            {cliente.produto_1 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 1:</h2>
                <p>
                  {cliente.produto_1} (Qtd: {cliente.qtd_1})
                </p>
              </div>
            )}
            {cliente.produto_2 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 2:</h2>
                <p>
                  {cliente.produto_2} (Qtd: {cliente.qtd_2})
                </p>
              </div>
            )}
            {cliente.produto_3 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 3:</h2>
                <p>
                  {cliente.produto_3} (Qtd: {cliente.qtd_3})
                </p>
              </div>
            )}
            {cliente.produto_4 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 4:</h2>
                <p>
                  {cliente.produto_4} (Qtd: {cliente.qtd_4})
                </p>
              </div>
            )}
            {cliente.produto_5 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3">
                <h2 className="font-bold text-gray-700">Produto 5:</h2>
                <p>
                  {cliente.produto_5} (Qtd: {cliente.qtd_5})
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
            {cliente.total && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 col-span-3 sm:col-span-1">
                <h2 className="font-bold text-gray-700">Total:</h2>
                <p>
                  R$
                  {(
                    (cliente.qtd_1 * cliente.subtotal_1 || 0) +
                    (cliente.qtd_2 * cliente.subtotal_2 || 0) +
                    (cliente.qtd_3 * cliente.subtotal_3 || 0) +
                    (cliente.qtd_4 * cliente.subtotal_4 || 0) +
                    (cliente.qtd_5 * cliente.subtotal_5 || 0)
                  ).toFixed(2)}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-green-700 text-white mx-auto px-4 py-4 rounded-lg shadow hover:bg-green-600 transition-colors duration-300 hidden sm:flex items-center justify-center gap-2"
            >
              <Image
                src="/assets/icones/27.svg"
                alt="icone de um telefone"
                width={30}
                height={30}
              />
              Emitir Nota
            </button>
          </div>
        </div>
      </div>

      <div class="element-hidden  p-14 sm:flex flex-col justify-between w-[1600px] h-[1000px] mx-auto border rounded-lg mt-[200px] hidden">
        <div>
          <div class="flex flex-col mb-4">
            <Image
              src="/assets/logotipo.png"
              alt="Imagem do logotipo da nota"
              class="w-96 m-auto"
              width={400}
              height={40}
            />
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm font-bold mb-6 mt-[100px]">
            <div>
              <h1>Data: {cliente.data} 10/08/2024</h1>
              <h1>Nome: {cliente.nome}</h1>
              <h1>Numero da nota: 398</h1>
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
              <Image
                src="/assets/icones/5.svg"
                alt="icone de um telefone"
                width={20}
                height={6}
                class="h-6 mt-2"
              />
              <p class="text-sm">+55 (21) 97899-1540</p>
            </div>
            <div class="flex gap-1 items-center ">
              <Image
                src="/assets/icones/7.svg"
                alt="icone de um telefone"
                width={20}
                height={6}
                class="h-6 mt-2"
              />
              <p class="text-sm">contato@komode.com</p>
            </div>
            <div class="flex gap-1 items-center ">
              <Image
                src="/assets/icones/6.svg"
                alt="icone de um telefone"
                width={20}
                height={6}
                class="h-6 mt-2"
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
