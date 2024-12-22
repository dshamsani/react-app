import type { FC, FormEvent } from "react";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "@tanstack/react-router";

export const LoginPage: FC = () => {
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Login:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
