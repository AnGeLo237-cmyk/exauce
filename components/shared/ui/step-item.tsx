"use client";

import { LocalizedText } from "@/lib/translation";
import { Icons } from "./icons";

type StepIcon =
  | "search"
  | "select"
  | "catalog"
  | "chat"
  | "calendar"
  | "truck"
  | "star"
  | "comment"
  | "phone"
  | "email"
  | "cash"
  | "file"
  | "card"
  | "mob";

export type Step = {
  icon: StepIcon;
  title: string;
  description: string;
};

type StepItemProps = {
  step: Step;
  index: number;
  active: boolean;
  isLast: boolean;
};

export function StepItem({ step, index, active, isLast }: StepItemProps) {
  return (
    <div className={`relative flex items-start gap-4 ${isLast ? "" : "pb-8"}`}>
      {/* Ligne verticale de connexion (mobile) / horizontale (desktop) */}
      {!isLast && (
        <div
          className={`absolute left-5 top-10 h-full w-0.5 bg-border md:hidden ${
            active ? "bg-primary" : ""
          }`}
        />
      )}

      <div className="flex flex-col items-center">
        {/* Cercle numéroté ou icône */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
            active
              ? "border-primary bg-primary text-white"
              : "border-border bg-surface text-text-muted"
          }`}
        >
          {Icons[step.icon as keyof typeof Icons]?.("w-5 h-5")}
        </div>
        {active && (
          <span className="mt-1 text-xs font-bold text-primary">
            {index + 1}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3
          className={`text-base font-semibold ${
            active ? "text-text" : "text-text-muted"
          }`}
        >
          <LocalizedText>{step.title}</LocalizedText>
        </h3>
        <p
          className={`mt-1 text-sm leading-relaxed ${
            active ? "text-text-muted" : "text-text-muted/70"
          }`}
        >
          <LocalizedText>{step.description}</LocalizedText>
        </p>
      </div>
    </div>
  );
}