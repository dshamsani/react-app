import type { FC } from "react";

import { useUser } from "@/context/UserContext";
import { useHeader } from "@/hooks/layout/useHeader";

export const Header: FC = () => {
  const { currentUser } = useUser();
  const { handleLogout } = useHeader();

  if (!currentUser) return null;

  return (
    <header className="bg-white border-b border-gray-300">
      <div className="max-w-xl mx-auto py-4 px-4 flex justify-between items-center">
        <span className="font-medium text-gray-700">Hello, {currentUser.name}!</span>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
};
