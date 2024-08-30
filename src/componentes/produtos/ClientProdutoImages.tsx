"use client";
import Image from "next/image";
import { useState } from "react";

type ClientProdutoImagesProps = {
  fotos: Array<{ src: string; titulo: string; id: string }>;
  produtoId: string;
  token: string;
};

export default function ClientProdutoImages({
  fotos,
  produtoId,
  token,
}: ClientProdutoImagesProps) {
  const [images, setImages] = useState(fotos);

  const handleDeleteImage = async (imageId: string) => {
    if (!imageId) {
      console.error("Image ID is undefined.");
      return;
    }

    try {
      const deleteResponse = await fetch(
        `https://apikomode.altuori.com/wp-json/api/imagem/${produtoId}/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (deleteResponse.ok) {
        setImages(images.filter((img) => img.id !== imageId));
        alert("Imagem deletada com sucesso!");
      } else {
        const errorData = await deleteResponse.json();
        alert(`Erro ao deletar a imagem: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao deletar a imagem:", error);
      alert("Erro ao deletar a imagem");
    }
  };

  const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file); // Certifique-se de que a API espera "file" como chave

      try {
        const addResponse = await fetch(
          `https://apikomode.altuori.com/wp-json/api/imagem/${produtoId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (addResponse.ok) {
          const data = await addResponse.json();
          const newImage = {
            src: data.image_urls[0], // Supondo que a API retorna a URL da nova imagem
            titulo: file.name,
            id: data.image_ids[0], // Supondo que a API retorna o ID da nova imagem
          };
          setImages([...images, newImage]);
          alert("Imagem adicionada com sucesso!");
        } else {
          const errorData = await addResponse.json();
          alert(`Erro ao adicionar a imagem: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erro ao adicionar a imagem:", error);
        alert("Erro ao adicionar a imagem");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Imagens</h2>
      {images.length > 0 && (
        <div className="relative mb-6">
          <Image
            src={images[0].src}
            alt={images[0].titulo}
            width={500}
            height={400}
            className="rounded-lg shadow-md"
          />
          <button
            onClick={() => handleDeleteImage(images[0].id)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          >
            X
          </button>
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Todas as Imagens:
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((foto, index) => (
            <div key={index} className="relative">
              <Image
                src={foto.src}
                alt={foto.titulo}
                width={200}
                height={100}
                className="rounded-lg shadow-md"
              />
              <button
                onClick={() => handleDeleteImage(foto.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Adicionar Imagem:
        </h3>
        <label className="cursor-pointer flex items-center">
          <span className="text-white bg-green-500 hover:bg-green-400 p-3 rounded-3xl">
            +
          </span>
          <input type="file" className="hidden" onChange={handleAddImage} />
        </label>
      </div>
    </div>
  );
}
