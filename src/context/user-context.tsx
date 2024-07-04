"use client";
import { IUserContext, User } from "@/Types";
import { loginAutenticate } from "@/actions/login/login-autenticate";
import React, { useEffect } from "react";

const UserContext = React.createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error("useContext deve estar dentro do Provider");
  }
  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [userState, setUser] = React.useState<User | null>(user);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const validateUserToken = async () => {
      const id = userState?.id;
      if (id) {
        const validationResponse = await loginAutenticate();
        if (validationResponse) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    validateUserToken();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUser, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}
