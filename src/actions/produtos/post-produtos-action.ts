"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { url } from "@/app/api";

export async function postProdutosAction(formData: FormData) {
  const token = cookies().get("token")?.value;
  const response = await fetch(
    url + "wp-json/api/produto",

    {
      next: {
        revalidate: 1,
      },
      method: "POST",
      headers: {
        Authorization: "Bearer" + token,
      },
      body: formData,
    }
  );
  await response.json();

  revalidatePath("/categorias");
}
