"use client";

import { useEffect, useState } from "react";
import { LocalizedText } from "@/lib/translation";

// Bureaux avec leurs horaires et fuseaux
type Hub = {
  city: string;
  country: string;
  flag: string;
  timezone: string; // fuseau IANA
  schedule: { day: string; hours: string; }[];
};

const HUBS: Hub[] = [
  {
    city: "Shanghai",
    country: "Chine",
    flag: "🇨🇳",
    timezone: "Asia/Shanghai",
    schedule: [
      { day: "Lundi", hours: "09:00 - 18:00" },
      { day: "Mardi", hours: "09:00 - 18:00" },
      { day: "Mercredi", hours: "09:00 - 18:00" },
      { day: "Jeudi", hours: "09:00 - 18:00" },
      { day: "Vendredi", hours: "09:00 - 18:00" },
      { day: "Samedi", hours: "09:00 - 13:00" },
      { day: "Dimanche", hours: "Fermé" },
    ],
  },
  {
    city: "Dubaï",
    country: "Émirats Arabes Unis",
    flag: "🇦🇪",
    timezone: "Asia/Dubai",
    schedule: [
      { day: "Lundi", hours: "09:00 - 18:00" },
      { day: "Mardi", hours: "09:00 - 18:00" },
      { day: "Mercredi", hours: "09:00 - 18:00" },
      { day: "Jeudi", hours: "09:00 - 18:00" },
      { day: "Vendredi", hours: "09:00 - 12:00" },
      { day: "Samedi", hours: "Fermé" },
      { day: "Dimanche", hours: "09:00 - 18:00" },
    ],
  },
];

// Récupérer l'heure locale et le jour de la semaine pour un fuseau donné
function getLocalTime(timezone: string): { hour: number; dayIndex: number } {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value || "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value || "0");
  const weekday = parts.find((p) => p.type === "weekday")?.value || "";

  // Convertir le jour de la semaine en index (0 = Lundi, 6 = Dimanche)
  const daysMap: Record<string, number> = {
    lundi: 0,
    mardi: 1,
    mercredi: 2,
    jeudi: 3,
    vendredi: 4,
    samedi: 5,
    dimanche: 6,
  };
  const dayIndex = daysMap[weekday.toLowerCase()] ?? 0;

  return { hour: hour + minute / 60, dayIndex };
}

// Vérifier si un hub est ouvert actuellement
function isHubOpen(hub: Hub): boolean {
  const { hour, dayIndex } = getLocalTime(hub.timezone);
  const todaySchedule = hub.schedule[dayIndex];
  if (!todaySchedule || todaySchedule.hours === "Fermé") return false;
  const [start, end] = todaySchedule.hours.split(" - ");
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  const startTime = startH + startM / 60;
  const endTime = endH + endM / 60;
  return hour >= startTime && hour <= endTime;
}

export default function OpeningHours() {
  // État pour forcer le recalcul toutes les minutes
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      {/* Titre */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-text">
            <LocalizedText>Horaires d'ouverture</LocalizedText>
          </h3>
          <p className="text-xs text-text-muted">
            <LocalizedText>Heures locales de chaque bureau</LocalizedText>
          </p>
        </div>
      </div>

      {/* Les 2 hubs côte à côte */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {HUBS.map((hub) => {
          const open = isHubOpen(hub);
          const { dayIndex } = getLocalTime(hub.timezone);
          return (
            <div key={hub.city}>
              {/* En-tête du hub */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0" aria-hidden="true">
                    {hub.flag}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-text text-sm truncate">
                      <LocalizedText>{hub.city}</LocalizedText>
                    </p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider truncate">
                      <LocalizedText>{hub.country}</LocalizedText>
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                    open
                      ? "bg-success/10 text-success"
                      : "bg-error/10 text-error"
                  }`}
                >
                  {open ? (
                    <LocalizedText>Ouvert</LocalizedText>
                  ) : (
                    <LocalizedText>Fermé</LocalizedText>
                  )}
                </span>
              </div>

              {/* Horaires */}
              <ul className="space-y-1">
                {hub.schedule.map((item, index) => (
                  <li
                    key={index}
                    className={`flex justify-between text-xs ${
                      index === dayIndex
                        ? "font-semibold text-text"
                        : "text-text-muted"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {index === dayIndex && (
                        <span className="w-1 h-1 rounded-full bg-primary" />
                      )}
                      <LocalizedText>{item.day}</LocalizedText>
                    </span>
                    <span>
                      <LocalizedText>{item.hours}</LocalizedText>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Note de bas */}
      <p className="mt-5 pt-4 border-t border-border text-[11px] text-text-muted text-center">
        <LocalizedText>
          Les horaires sont donnés en heure locale de chaque bureau.
        </LocalizedText>
      </p>
    </div>
  );
}