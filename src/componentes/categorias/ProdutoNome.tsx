import { useState } from "react";

type ProdutoNomeProps = {
  nomes: string[]; // Nomes recebidos dinamicamente
  onSearch: (pesquisaNome: string) => void;
};

const ProdutoNome = ({ nomes, onSearch }: ProdutoNomeProps) => {
  const [pesquisaNome, setpesquisaNome] = useState<string>("");

  const handleSearch = (nome: string) => {
    onSearch(nome);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <select
        value={pesquisaNome}
        onChange={(e) => {
          setpesquisaNome(e.target.value);
          handleSearch(e.target.value);
        }}
        className="border border-gray-300 max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
      >
        <option value="">Nome</option>
        {nomes
          .filter((nome) => nome && nome.trim() !== "") // Filtra nomes vazios
          .map((nome, index) => (
            <option key={index} value={nome}>
              {nome}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ProdutoNome;
