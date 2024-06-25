"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const credencials = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };
  const response = await fetch(
    "https://apikomode.altuori.com/wp-json/jwt-auth/v1/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credencials),
    }
  );
  const data = await response.json();
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 240);
  cookies().set("token", data.token, {
    secure: true,
    httpOnly: true,
    expires: expirationTime,
  });
  redirect("/");
}
