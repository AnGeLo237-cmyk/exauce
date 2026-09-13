"use client";

import Link from "next/link";
import { LocalizedText } from "@/lib/translation";
import { Icons } from "@/components/shared/ui/icons";

type ProcessStepProps = {
  step: {
    icon?: keyof typeof Icons;
    title: string;
    description: string;
    href?: string;
  };
  index: number;
  active: boolean;
  onClick?: () => void;
  isLast?: boolean;
  layout?: "horizontal" | "vertical";
};

export default function ProcessStep({ step, index, active, onClick, isLast, layout = "horizontal" }: ProcessStepProps) {
  const content = (
    <>
      <div
        className={`flex z-10 h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
          active
            ? "border-primary bg-primary text-white"
            : "border-border bg-surface text-text-muted"
        }`}
        onClick={onClick}
      >
        {step.icon ? Icons[step.icon]("w-5 h-5") : index + 1}
      </div>
      <h3 className={`mt-2 text-base font-semibold ${active ? "text-text" : "text-text-muted"}`}>
        <LocalizedText>{step.title}</LocalizedText>
      </h3>
      <p className={`mt-1 text-sm leading-relaxed ${active ? "text-text-muted" : "text-text-muted/70"}`}>
        <LocalizedText>{step.description}</LocalizedText>
      </p>
    </>
  );

  if (step.href) {
    return (
      <Link
        href={step.href}
        className={`flex flex-col items-center text-center ${layout === "horizontal" ? "w-full md:w-1/4 px-2" : "w-full"} ${
          active ? "opacity-100" : "opacity-70 hover:opacity-100"
        } transition-opacity`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`flex flex-col items-center text-center ${layout === "horizontal" ? "w-full md:w-1/4 px-2" : "w-full"} cursor-pointer ${
        active ? "opacity-100" : "opacity-70 hover:opacity-100"
      } transition-opacity`}
      onClick={onClick}
    >
      {content}
    </div>
  );
}