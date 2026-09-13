"use client";

import { LocalizedText } from "@/lib/translation";

const openingHours = [
  { day: "Lundi", hours: "08:00 - 18:00" },
  { day: "Mardi", hours: "08:00 - 18:00" },
  { day: "Mercredi", hours: "08:00 - 18:00" },
  { day: "Jeudi", hours: "08:00 - 18:00" },
  { day: "Vendredi", hours: "08:00 - 18:00" },
  { day: "Samedi", hours: "09:00 - 17:00" },
  { day: "Dimanche", hours: "Fermé" },
];

export default function OpeningHours() {
  const todayIndex = (new Date().getDay() + 6) % 7; // 0 = Lundi, 6 = Dimanche
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour + currentMinute / 60;

  const isOpenNow = () => {
    const day = openingHours[todayIndex];
    if (day.hours === "Fermé") return false;
    const [start, end] = day.hours.split(" - ");
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const startTime = startHour + startMinute / 60;
    const endTime = endHour + endMinute / 60;
    return currentTime >= startTime && currentTime <= endTime;
  };

  const openNow = isOpenNow();

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-text">
          <LocalizedText>Horaires d'ouverture</LocalizedText>
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            openNow
              ? "bg-success/10 text-success"
              : "bg-error/10 text-error"
          }`}
        >
          {openNow ? (
            <LocalizedText>Ouvert maintenant</LocalizedText>
          ) : (
            <LocalizedText>Fermé actuellement</LocalizedText>
          )}
        </span>
      </div>
      <ul className="space-y-2">
        {openingHours.map((item, index) => (
          <li
            key={index}
            className={`flex justify-between text-sm ${
              index === todayIndex ? "font-semibold text-text" : "text-text-muted"
            }`}
          >
            <span>
              <LocalizedText>{item.day}</LocalizedText>
              {index === todayIndex && (
                <span className="ml-2 text-xs text-primary">•</span>
              )}
            </span>
            <span>
              <LocalizedText>{item.hours}</LocalizedText>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}