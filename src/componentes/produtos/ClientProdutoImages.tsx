//@ts-nocheck
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Foto = { src: string; titulo: string; id: string };

type ClientProdutoImagesProps = {
  codigo: string; // Código do produto, por exemplo "SAZ"
  tamanho: Foto | Foto[]; // Agora pode ser uma lista de fotos ou uma única foto
};

export default function ClientProdutoImages({
  codigo,
  tamanho,
}: ClientProdutoImagesProps) {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar imagens pelo código
  useEffect(() => {
    const fetchImagens = async () => {
      try {
        const response = await fetch(
          `https://apikomode.altuori.com/wp-json/api/produto?cor=img&produto_cod=${codigo}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar imagens");
        }
        const data = await response.json();

        // Aqui garantimos que a estrutura de dados está correta
        if (data && data[0] && data[0].fotos) {
          setFotos(data[0].fotos); // Acessando o array 'fotos' corretamente
        } else {
          setFotos([]); // Caso não haja imagens, definimos como array vazio
        }
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
        setFotos([]); // Em caso de erro, não exibimos imagens
      } finally {
        setLoading(false);
      }
    };

    fetchImagens();
  }, [codigo]);

  if (loading) {
    return <p>Carregando imagens...</p>;
  }

  // Função auxiliar para garantir que sempre teremos uma lista de imagens
  const garantirListaDeImagens = (imagens: Foto | Foto[]): Foto[] => {
    return Array.isArray(imagens) ? imagens : [imagens]; // Se for apenas uma imagem, coloca-a dentro de um array
  };

  // Verifica se há imagens na requisição principal, caso contrário, utiliza as imagens da variável `tamanho`
  const imagensParaExibir =
    fotos.length > 0 ? fotos : garantirListaDeImagens(tamanho);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Imagens</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imagensParaExibir.map((foto, index) => (
          <Image
            className="block w-auto h-auto"
            src={foto.src}
            alt={foto.titulo}
            width={300}
            height={250}
            key={index} // Use index como key para garantir que o loop funcione corretamente
          />
        ))}
        <Image
          className="block w-auto h-auto"
          src={tamanho[0].src}
          alt={tamanho[0].titulo}
          width={300}
          height={250}
        />
      </div>
    </div>
  );
}
