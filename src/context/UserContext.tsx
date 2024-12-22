import type { User } from "../types/user";
import type { FC, PropsWithChildren } from "react";

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";

import { notImplemented } from "../utils/helpers";
import { predefinedUsers } from "../constants/users";

interface UserContextValue {
  currentUser: User | null;
  login: (login: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const UserContext = createContext<UserContextValue>({
  currentUser: null,
  login: notImplemented(),
  logout: notImplemented(),
  updateUser: notImplemented(),
});

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = useCallback((login: string, password: string): boolean => {
    const foundUser = predefinedUsers.find((u) => u.login === login && u.password === password);

    if (!foundUser) {
      return false;
    }

    setCurrentUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setCurrentUser((prev) => {
      if (!prev) {
        return null;
      }
      const updatedUser = { ...prev, ...data };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  useLayoutEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const value: UserContextValue = useMemo(
    () => ({
      currentUser,
      login,
      logout,
      updateUser,
    }),
    [currentUser, login, logout, updateUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
