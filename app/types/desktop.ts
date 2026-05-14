export interface AppWindow {
  id: string;
  type:
    | "terminal"
    | "files"
    | "editor"
    | "browser"
    | "about"
    | "music"
    | "snake";
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  initialCommand?: string;
  initialPath?: string;
}

export interface WindowState {
  position: { x: number; y: number };
  size: { width: number; height: number };
}
