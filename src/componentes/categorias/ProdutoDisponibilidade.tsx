import { useState } from "react";

type SearchBarProps = {
  onSearch: (pesquisaDisponibilidade: string) => void;
};

const ProdutoDisponibilidade = ({ onSearch }: SearchBarProps) => {
  const [pesquisaDisponibilidade, setpesquisaDisponibilidade] =
    useState<string>("");

  const handleSearch = (disponibilidade: string) => {
    onSearch(disponibilidade);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <select
        id="cor"
        name="cor"
        value={pesquisaDisponibilidade}
        onChange={(e) => {
          setpesquisaDisponibilidade(e.target.value);
          handleSearch(e.target.value);
        }}
        className="border border-gray-300 max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
      >
        <option value="">Disponibilidade</option>
        <option value="sim">sim</option>
        <option value="nao">não</option>
      </select>
    </div>
  );
};

export default ProdutoDisponibilidade;
