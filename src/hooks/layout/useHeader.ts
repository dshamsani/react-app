import { useUser } from "@/context/UserContext";
import { useNavigate } from "@tanstack/react-router";

interface UseHeader {
  handleLogout: () => void;
}

export const useHeader = (): UseHeader => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return { handleLogout };
};
