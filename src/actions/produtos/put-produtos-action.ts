"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface ProductData {
  id: string;
  nome_long: string;
  cor: string;
  estrutura: string;
  [key: string]: any; // Para permitir campos adicionais
}

export async function putProdutosAction(
  productData: ProductData,
  productId: string
) {
  const token = cookies().get("token")?.value;

  const response = await fetch(
    `https://apikomode.altuori.com/wp-json/api/produto/${productId}`,
    {
      next: {
        revalidate: 1,
      },
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(productData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  const data = await response.json();
  console.log("Response data:", data); // Logging to verify response data

  revalidatePath("/produtos");
}
