"use server";

import { cookies } from "next/headers";

export async function getReclamacaoAction() {
  const token = cookies().get("token")?.value;
  const response = await fetch(
    "https://apikomode.altuori.com/wp-json/api/reclamacao?&_limit=120",
    {
      cache: "no-store",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await response.json();
  console.log(data);

  return { data };
}
