import { useUser } from "@/context/UserContext";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate({ to: "/profile" });
      return;
    }

    navigate({ to: "/login" });
  }, [currentUser]);

  return <div className="p-2"></div>;
}
