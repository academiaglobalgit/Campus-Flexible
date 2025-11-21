import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getSubdomainKey } from "../utils/Helpers";

export type RecentlyViewedKind =
  | "investigation-resource"
  | "top-read"
  | "digital-resource"
  | "multimedia"
  | string;

export type RecentlyViewedItem = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  type: RecentlyViewedKind;
  thumbnail?: string;
  actionLabel?: string;
  author?: string;
  duration?: string;
  timestamp: number;
};

type RecentlyViewedInput = Omit<RecentlyViewedItem, "timestamp">;

type RecentlyViewedContextValue = {
  items: RecentlyViewedItem[];
  addItem: (item: RecentlyViewedInput) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(undefined);

const STORAGE_KEY = `${
  import.meta.env.VITE_APP_CIG_RECENTS || "cig_recent"
}${getSubdomainKey()}`;
const MAX_ITEMS = Number(import.meta.env.VITE_APP_CIG_RECENTS_LIMIT ?? 15);

export const RecentlyViewedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<RecentlyViewedItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn("RecentlyViewedProvider: failed to parse stored items", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn("RecentlyViewedProvider: failed to persist items", error);
    }
  }, [items]);

  const addItem = useCallback((item: RecentlyViewedInput) => {
    setItems((prev) => {
      const filtered = prev.filter((existing) => existing.id !== item.id);
      const next = [{ ...item, timestamp: Date.now() }, ...filtered];
      return next.slice(0, MAX_ITEMS);
    });
  }, []);

  const removeItem = useCallback(
    (id: string) => setItems((prev) => prev.filter((item) => item.id !== id)),
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<RecentlyViewedContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      clear,
    }),
    [items, addItem, removeItem, clear]
  );

  return (
    <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return context;
};

