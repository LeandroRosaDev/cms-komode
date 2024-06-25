"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteProdutosAction(nomeDoProduto: string) {
  const token = cookies().get("token")?.value;
  const response = await fetch(
    `https://apikomode.altuori.com/wp-json/api/produto/${nomeDoProduto}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer" + token,
      },
    }
  );
  revalidatePath("/produtos");
}
