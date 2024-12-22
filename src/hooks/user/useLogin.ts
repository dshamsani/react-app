import type { Dispatch, FormEvent, SetStateAction } from "react";

import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

interface UseLogin {
  loginValue: string;
  passwordValue: string;
  error: string;
  handleSubmit: (e: FormEvent) => void;
  setLoginValue: Dispatch<SetStateAction<string>>;
  setPasswordValue: Dispatch<SetStateAction<string>>;
}

export const useLogin = (): UseLogin => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginValue || !passwordValue) {
      setError("Fields cannot be empty");
      return;
    }

    const success = login(loginValue, passwordValue);

    if (success) {
      navigate({ to: "/profile" });
      return;
    }

    setError("Invalid login or password");
  };

  return {
    error,
    loginValue,
    passwordValue,
    handleSubmit,
    setLoginValue,
    setPasswordValue,
  };
};
