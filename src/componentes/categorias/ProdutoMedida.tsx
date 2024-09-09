import { useState } from "react";

type ProdutoMedidaProps = {
  medidas: string[]; // Medidas recebidas dinamicamente
  onSearch: (pesquisaMedida: string) => void;
};

const ProdutoMedida = ({ medidas, onSearch }: ProdutoMedidaProps) => {
  const [pesquisaMedida, setpesquisaMedida] = useState<string>("");

  const handleSearch = (medida: string) => {
    onSearch(medida);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <select
        id="medida"
        name="medida"
        value={pesquisaMedida}
        onChange={(e) => {
          setpesquisaMedida(e.target.value);
          handleSearch(e.target.value);
        }}
        className="border border-gray-300 max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
      >
        <option value="">Medida</option>
        {medidas
          .filter((medida) => medida && medida.trim() !== "") // Filtra medidas vazias
          .map((medida, index) => (
            <option key={index} value={medida}>
              {medida}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ProdutoMedida;
