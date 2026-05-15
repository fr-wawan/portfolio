import { PORTFOLIO_DATA } from "./portfolio";
import type { FolderStructure } from "~/types/file-manager";

export const FILE_SYSTEM: FolderStructure = {
  Home: [
    { name: "Projects", type: "folder" },
    { name: "Skills", type: "folder" },
    { name: "About", type: "folder" },
  ],
  Projects: PORTFOLIO_DATA.projects.map((p) => ({
    name: p.name,
    type: "file" as const,
    description: p.desc,
  })),
  Skills: PORTFOLIO_DATA.skills.map((s) => ({
    name: `${s.toLowerCase().replace(/\s+/g, "-")}.txt`,
    type: "file" as const,
    content: s,
  })),
  About: [
    {
      name: "profile.txt",
      type: "file" as const,
      content: [
        { type: "text", value: `Name     : ${PORTFOLIO_DATA.name}\n` },
        { type: "text", value: `Age      : ${PORTFOLIO_DATA.age}\n` },
        { type: "text", value: `Role     : ${PORTFOLIO_DATA.role}\n` },
        { type: "text", value: `Location : ${PORTFOLIO_DATA.location}\n` },
        { type: "text", value: `Email    : ${PORTFOLIO_DATA.email}\n` },
        { type: "text", value: `GitHub   : ` },
        {
          type: "link",
          label: PORTFOLIO_DATA.github,
          href: PORTFOLIO_DATA.github,
        },
        { type: "text", value: `\nLinkedIn : ` },
        {
          type: "link",
          label: PORTFOLIO_DATA.linkedin,
          href: PORTFOLIO_DATA.linkedin,
        },
      ],
    },
  ],
};

export const SIDEBAR_FOLDERS = Object.keys(FILE_SYSTEM);
