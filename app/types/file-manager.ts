export type FileType = "folder" | "file";

export type FileSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

export interface FileLinks {
  github?: string;
  live?: string;
}

export interface FileItem {
  name: string;
  type: FileType;
  content?: string | FileSegment[];
  description?: string;
  tech?: string[];
  links?: FileLinks;
}

export type FolderStructure = Record<string, FileItem[]>;
