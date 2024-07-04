import { NextResponse, type NextRequest } from "next/server";
import { loginAutenticate } from "./actions/login/login-autenticate";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  let authenticated = false;
  if (token) {
    const validationResponse = await loginAutenticate();
    if (validationResponse) {
      authenticated = true;
    }
  }

  const { pathname } = request.nextUrl;

  // Redireciona usuários não autenticados para /login
  if (!authenticated && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redireciona usuários autenticados para a página inicial se tentarem acessar /login
  if (authenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/produtos",
    "/adicionar-produtos",
    "/cadastrar-nota",
    "/clientes",
    "/reclamacoes",
    "/login",
  ],
};
