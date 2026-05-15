export type ProjectStatus = "public" | "private" | "wip";

export interface ProjectTech {
  name: string;
  color: string;
}

export interface Project {
  name: string;
  desc: string;
  tech: string[];

  id?: string;
  status?: ProjectStatus;
  url?: string;
  liveUrl?: string;
  githubUrl?: string;
  role?: string;
  period?: string;
  techDetail?: ProjectTech[];
  highlights?: string[];
  screenshots?: { src: string; alt: string; caption?: string }[];
  longDescription?: string;
}
