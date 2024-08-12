import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/componentes/Menu";
import { userGetAction } from "@/actions/user/user-get-action";
import { UserContextProvider } from "@/context/user-context";

export const metadata: Metadata = {
  title: "Komode CMS",
  description: "Este é um CMS para Komode Móveis",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await userGetAction();

  return (
    <html lang="pt-br">
      <body className="bg-red-100">
        <UserContextProvider user={user}>
          <Menu />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
