"use server";

import { cookies } from "next/headers";

export async function getClientesAction() {
  const token = cookies().get("token")?.value;
  const response = await fetch(
    "https://apikomode.altuori.com/wp-json/api/cliente",
    {
      cache: "no-store",
      headers: {
        Authorization: "Bearer" + token,
      },
    }
  );
  const data = await response.json();

  return { data };
}
