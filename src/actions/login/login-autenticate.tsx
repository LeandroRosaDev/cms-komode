"use server";
import { cookies } from "next/headers";

export async function loginAutenticate() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      throw new Error("Não autorizado");
    }

    const response = await fetch(
      "https://apikomode.altuori.com/wp-json/jwt-auth/v1/token/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Falha de acesso: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro de validação de token:", error);
    return null;
  }
}
