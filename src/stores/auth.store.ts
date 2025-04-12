import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  user: any | null; // Replace 'any' with your user type if available

  setUser: (user: any) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearStore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  clearStore: () => set({ accessToken: null, refreshToken: null, user: null }),
  setUser: (user) => set({ user }),
}));
