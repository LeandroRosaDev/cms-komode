import { useState } from "react";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const PesquisaProdutos = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center items-center m-4 gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por nome"
        className="border p-2 rounded-md"
      />
      <button
        onClick={handleSearch}
        className="bg-red-700 text-white py-2 px-4 rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline"
      >
        Pesquisar
      </button>
    </div>
  );
};

export default PesquisaProdutos;
