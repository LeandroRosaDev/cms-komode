import { useState, useEffect } from "react";
import Image from "next/image";

type SearchBarProps = {
  onSearch: (pesquisaNome: string) => void;
};

const PesquisaProdutos2 = ({ onSearch }: SearchBarProps) => {
  const [pesquisaNome, setpesquisaNome] = useState<string>("");
  const [debouncedPesquisaNome, setDebouncedPesquisaNome] =
    useState<string>("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedPesquisaNome(pesquisaNome);
    }, 500); // Aguarda 500ms antes de realizar a busca

    return () => {
      clearTimeout(timerId);
    };
  }, [pesquisaNome]);

  useEffect(() => {
    onSearch(debouncedPesquisaNome);
  }, [debouncedPesquisaNome, onSearch]);

  return (
    <div className="flex justify-center items-center gap-2">
      <input
        type="text"
        value={pesquisaNome}
        onChange={(e) => setpesquisaNome(e.target.value)}
        placeholder="Buscar por nome"
        className="border p-2 rounded-md focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
      />
      <button
        onClick={() => onSearch(pesquisaNome)}
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

export default PesquisaProdutos2;
