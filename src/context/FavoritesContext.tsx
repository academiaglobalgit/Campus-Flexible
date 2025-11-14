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

export type FavoriteKind =
  | "digital-resource"
  | "investigation-resource"
  | "top-read"
  | string;

export type FavoriteItem = {
  id: string;
  title: string;
  excerpt?: string;
  category?: string;
  type: FavoriteKind;
};

type FavoritesContextValue = {
  favorites: FavoriteItem[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const STORAGE_KEY = `${
  import.meta.env.VITE_APP_CIG_FAVORITES || "cig_favorites"
}${getSubdomainKey()}`;

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoritesMap, setFavoritesMap] = useState<Record<string, FavoriteItem>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn("FavoritesProvider: failed to parse stored favorites", error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritesMap));
    } catch (error) {
      console.warn("FavoritesProvider: failed to persist favorites", error);
    }
  }, [favoritesMap]);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setFavoritesMap((prev) => {
      const next = { ...prev };
      if (next[item.id]) {
        delete next[item.id];
      } else {
        next[item.id] = item;
      }
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavoritesMap((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites: Object.values(favoritesMap),
      isFavorite: (id: string) => Boolean(favoritesMap[id]),
      toggleFavorite,
      removeFavorite,
    }),
    [favoritesMap, toggleFavorite, removeFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
