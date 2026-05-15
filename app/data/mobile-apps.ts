import type { MobileApp } from "~/types/mobile";

export const MOBILE_APPS: MobileApp[] = [
  { id: "terminal", label: "Terminal", color: "#52525b" },
  { id: "files", label: "Files", color: "#2563eb" },
  { id: "editor", label: "Resume", color: "#059669" },
  { id: "browser", label: "Projects", color: "#ea580c" },
  { id: "music", label: "Music", color: "#db2777" },
  { id: "snake", label: "Games", color: "#9333ea" },
  { id: "contact", label: "Contact", color: "#0891b2" },
];

export const DOCK_APPS = MOBILE_APPS.slice(0, 4);
