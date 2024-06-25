"use server";

import { cookies } from "next/headers";

export async function userGetAction() {
  const token = cookies().get("token")?.value;
  const response = await fetch(
    "https://apikomode.altuori.com/wp-json/api/usuario",
    {
      headers: {
        Authorization: "Bearer" + token,
      },
    }
  );
  const data = await response.json();
  return { data };
}
