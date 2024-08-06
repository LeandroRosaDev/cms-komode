"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { url } from "@/app/api";

export async function deleteProdutosAction(nomeDoProduto: string) {
  const token = cookies().get("token")?.value;
  const response = await fetch(url + `wp-json/api/produto/${nomeDoProduto}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer" + token,
    },
  });
  revalidatePath("/produtos");
}
