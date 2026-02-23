import { ToastType, ModalId } from "@/types/app";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Toast = {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
};

type UIState = {
  // Sidebar
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;

  // Modal
  activeModal: ModalId | null;

  // Toasts
  toasts: Toast[];

  // Loading
  isLoading: boolean;
  loadingMessage?: string;

  // Page title                          // ← ADD
  pageTitle: string; // ← ADD

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  toggleSidebarCollapse: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  openModal: (modalId: ModalId) => void;
  closeModal: () => void;

  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  setLoading: (isLoading: boolean, message?: string) => void;
  setPageTitle: (title: string) => void; // ← ADD
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      isSidebarOpen: true,
      isSidebarCollapsed: false,
      activeModal: null,
      toasts: [],
      isLoading: false,
      loadingMessage: undefined,
      pageTitle: "Dashboard", // ← ADD

      toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),

      toggleSidebarCollapse: () =>
        set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
      setSidebarCollapsed: (collapsed) =>
        set({ isSidebarCollapsed: collapsed }),

      openModal: (modalId) => set({ activeModal: modalId }),
      closeModal: () => set({ activeModal: null }),

      addToast: (toast) => {
        const id = uid();
        set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
        return id;
      },

      removeToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

      clearToasts: () => set({ toasts: [] }),

      setLoading: (isLoading, message) =>
        set({ isLoading, loadingMessage: message }),

      setPageTitle: (title) => set({ pageTitle: title }),
    }),
    { name: "UIStore" },
  ),
);
