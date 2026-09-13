"use client";

import { useEffect, useState } from "react";
import { LocalizedText } from "@/lib/translation";

type FormFeedbackProps = {
  successMessage?: string;
  errorMessage?: string;
};

export default function FormFeedback({
  successMessage = "Message envoyé avec succès !",
  errorMessage = "Une erreur est survenue. Veuillez réessayer.",
}: FormFeedbackProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const handleSuccess = () => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    };
    const handleError = () => {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    };

    window.addEventListener("formspree:success", handleSuccess);
    window.addEventListener("formspree:error", handleError);

    return () => {
      window.removeEventListener("formspree:success", handleSuccess);
      window.removeEventListener("formspree:error", handleError);
    };
  }, []);

  if (status === "idle") return null;

  return (
    <div
      className={`p-3 rounded-md text-sm ${
        status === "success"
          ? "bg-success/10 text-success"
          : "bg-error/10 text-error"
      }`}
    >
      <LocalizedText>
        {status === "success" ? successMessage : errorMessage}
      </LocalizedText>
    </div>
  );
}