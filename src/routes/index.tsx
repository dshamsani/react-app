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
  }, []);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
