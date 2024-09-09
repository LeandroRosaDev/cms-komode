"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { url } from "@/app/api";

export async function deleteClientesAction(nomeDoProduto: string) {
  const token = cookies().get("token")?.value;
  const response = await fetch(url + `wp-json/api/cliente/${nomeDoProduto}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer" + token,
    },
  });
  revalidatePath("/clientes");
}
