export type MobileAppId =
  | "terminal"
  | "files"
  | "editor"
  | "contact"
  | "music"
  | "snake"
  | "browser";

export interface MobileApp {
  id: MobileAppId;
  label: string;
  color: string;
}
