"use server";

import { cookies } from "next/headers";

export default async function tokenAction() {
  const token = cookies().get("token")?.value;
  return token;
}
