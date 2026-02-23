import { Role } from "@/types/app";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  name: string;
  companyName: string;
  role: Role;
  avatar?: string;
};

type Preferences = {
  theme: "light" | "dark" | "system";
  language: "en" | "es" | "fr";
  currency: "NGN" | "USD" | "EUR" | "GBP";
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
};

type UserState = {
  user: User | null;
  preferences: Preferences;

  isAuthenticated: () => boolean;

  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;

  updatePreferences: (preferences: Partial<Preferences>) => void;
  toggleNotification: (type: keyof Preferences["notifications"]) => void;
};

const defaultPreferences: Preferences = {
  theme: "system",
  language: "en",
  currency: "NGN",
  notifications: { email: true, push: true, sms: false },
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        preferences: defaultPreferences,

        isAuthenticated: () => !!get().user,

        setUser: (user) => set({ user }),
        updateUser: (updates) =>
          set((s) => ({ user: s.user ? { ...s.user, ...updates } : null })),

        logout: () => set({ user: null }),

        updatePreferences: (preferences) =>
          set((s) => ({ preferences: { ...s.preferences, ...preferences } })),

        toggleNotification: (type) =>
          set((s) => ({
            preferences: {
              ...s.preferences,
              notifications: {
                ...s.preferences.notifications,
                [type]: !s.preferences.notifications[type],
              },
            },
          })),
      }),
      {
        name: "user-storage",
        partialize: (s) => ({
          user: s.user,
          preferences: s.preferences,
        }),
      },
    ),
    { name: "UserStore" },
  ),
);
