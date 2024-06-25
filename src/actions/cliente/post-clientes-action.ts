"use server";
import { cookies } from "next/headers";

export async function postClienteAction(formData: any) {
  const token = cookies().get("token")?.value;

  const response = await fetch(
    `https://apikomode.altuori.com/wp-json/api/cliente`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create client");
  }

  const data = await response.json();
  console.log("Response data:", data); // Logging to verify response data
}
