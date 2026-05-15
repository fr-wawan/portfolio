import { FILE_SYSTEM } from "~/data/file-system";
import type { FileItem } from "~/types/file-manager";

export type ViewMode = "grid" | "list";

export function useFileManager(initialPath = "Home") {
  const currentPath = ref<string>(initialPath);
  const selectedFile = ref<FileItem | null>(null);
  const viewMode = ref<ViewMode>("list");

  const currentFiles = computed<FileItem[]>(
    () => FILE_SYSTEM[currentPath.value] ?? [],
  );

  function navigateTo(path: string) {
    currentPath.value = path;
    selectedFile.value = null;
  }

  function navigateToHome() {
    navigateTo("Home");
  }

  function selectFile(file: FileItem) {
    selectedFile.value = file;
  }

  function handleItemClick(item: FileItem) {
    item.type === "folder" ? navigateTo(item.name) : selectFile(item);
  }

  function setViewMode(mode: ViewMode) {
    viewMode.value = mode;
  }

  return {
    currentPath,
    selectedFile,
    viewMode,
    currentFiles,
    navigateTo,
    navigateToHome,
    handleItemClick,
    setViewMode,
  };
}
