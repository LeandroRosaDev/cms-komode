import { useState } from "react";
import Image from "next/image";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const PesquisaProdutos = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por nome"
        className="border p-2 rounded-md focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
      />
      <button
        onClick={handleSearch}
        className="bg-green-700 text-white py-2 px-4 rounded transition duration-100 hover:bg-green-600 flex items-center justify-center gap-1 "
      >
        <Image
          src="/assets/icones/25.svg"
          alt="logotipo"
          width={20}
          height={20}
        />
        Pesquisar
      </button>
    </div>
  );
};

export default PesquisaProdutos;
