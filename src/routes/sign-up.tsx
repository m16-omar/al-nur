import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/sign-up")({
  component: SignUpRedirect,
});

function SignUpRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/signup", replace: true });
  }, [navigate]);

  return null;
}

