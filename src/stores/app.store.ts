import {create} from "zustand";

enum Pages {
    Home, Dashboard,
}

interface AppState {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    page: Pages
    setPage: (page: Pages) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDarkMode: false,
  page: Pages.Home,
  setPage: (page) => set({page}),
  toggleDarkMode: () => set((state) => ({isDarkMode: !state.isDarkMode}))}));


export {Pages};