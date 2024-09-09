import { useState } from "react";

type SearchBarProps = {
  onSearch: (pesquisaSituacao: string) => void;
};

const ProdutoSituacao = ({ onSearch }: SearchBarProps) => {
  const [pesquisaSituacao, setpesquisaSituacao] = useState<string>("");

  const handleSearch = (medida: string) => {
    onSearch(medida);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <select
        value={pesquisaSituacao}
        onChange={(e) => {
          setpesquisaSituacao(e.target.value);
          handleSearch(e.target.value);
        }}
        className="border border-gray-300 max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
      >
        <option value="">Situação</option>
        <option value="Promocao">Promocão</option>
        <option value="Destaque">Destaque</option>
        <option value="Queima">Queima de Estoque</option>
      </select>
    </div>
  );
};

export default ProdutoSituacao;
