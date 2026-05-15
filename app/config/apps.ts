import {
  FileText,
  Folder,
  Gamepad2,
  Globe,
  Music,
  Terminal,
  Info,
} from "lucide-vue-next";

export const apps = {
  terminal: {
    title: "Terminal",
    icon: Terminal,
    size: {
      width: 700,
      height: 450,
    },
    desktop: true,
  },

  files: {
    title: "Files",
    icon: Folder,
    size: {
      width: 800,
      height: 500,
    },
    desktop: true,
  },

  editor: {
    title: "resume.txt - Editor",
    icon: FileText,
    size: {
      width: 700,
      height: 500,
    },
    desktop: true,
  },

  browser: {
    title: "Browser",
    icon: Globe,
    size: {
      width: 900,
      height: 600,
    },
    desktop: true,
  },

  music: {
    title: "Music Player",
    icon: Music,
    size: {
      width: 380,
      height: 580,
    },
    desktop: true,
  },

  snake: {
    title: "Snake Game",
    icon: Gamepad2,
    size: {
      width: 360,
      height: 480,
    },
    desktop: true,
  },

  about: {
    title: "About This System",
    icon: Info,
    size: {
      width: 450,
      height: 350,
    },
    desktop: false,
  },
} as const;

export type AppType = keyof typeof apps;
