import { useState } from "react";

type ProdutoCorProps = {
  cores: string[]; // Cores recebidas dinamicamente
  onSearch: (pesquisaCor: string) => void;
};

const ProdutoCor = ({ cores, onSearch }: ProdutoCorProps) => {
  const [pesquisaCor, setpesquisaCor] = useState<string>("");

  const handleSearch = (cor: string) => {
    onSearch(cor);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <select
        id="cor"
        name="cor"
        value={pesquisaCor}
        onChange={(e) => {
          setpesquisaCor(e.target.value);
          handleSearch(e.target.value);
        }}
        className="border border-gray-300 max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
      >
        <option value="">Cor</option>
        {cores
          .filter((cor) => cor && cor.trim() !== "")
          .map((cor, index) => (
            <option key={index} value={cor}>
              {cor}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ProdutoCor;
