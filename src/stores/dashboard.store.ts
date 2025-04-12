import { create } from "zustand";

enum Chapters {
  Dashboard,
  Users,
  Image_Editor,
  Settings,
}

interface DashboardState {
  currentChapter: Chapters;
  setCurrentChapter: (chapter: Chapters) => void;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  currentChapter: Chapters.Dashboard,
  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  isExpanded: true,
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));

export default useDashboardStore;
export { Chapters };
