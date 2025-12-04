import {
  type FC,
  useMemo,
  forwardRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Grow,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import type { TransitionProps } from "@mui/material/transitions";
import { useAuth } from "../../../hooks";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

type RecentSearchEntry = {
  id: string;
  query: string;
  author: string;
  createdAt: string;
};

const recommendedTopics = [
  "Comunicación",
  "Educación",
  "Tecnología",
  "Innovación",
];

const STORAGE_KEY = "cig-recent-searches";
const MAX_RECENT = 8;

const createEntryId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `search-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const loadStoredSearches = (): RecentSearchEntry[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RecentSearchEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Unable to parse recent searches", error);
    return [];
  }
};

const persistStoredSearches = (entries: RecentSearchEntry[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.warn("Unable to save recent searches", error);
  }
};

const queueSearchSync = async (entry: RecentSearchEntry) => {
  // Placeholder for upcoming API integration:
  // await searchService.register(entry)
  return Promise.resolve(entry);
};

const formatRelativeTime = (isoDate: string) => {
  const createdAt = new Date(isoDate);
  const diffSeconds = Math.floor((Date.now() - createdAt.getTime()) / 1000);

  if (diffSeconds < 60) return "Hace unos segundos";
  if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60);
    return `Hace ${minutes} min`;
  }
  if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600);
    return `Hace ${hours} h`;
  }
  if (diffSeconds < 604800) {
    const days = Math.floor(diffSeconds / 86400);
    return `Hace ${days} d`;
  }

  return createdAt.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });
};

const ModalTransition = forwardRef(function ModalTransition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Grow ref={ref} style={{ transformOrigin: "center top" }} {...props} />;
});

const CigSearchModal: FC<SearchModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<RecentSearchEntry[]>([]);

  useEffect(() => {
    setRecentSearches(loadStoredSearches());
  }, []);

  const addRecentSearch = useCallback(
    async (query: string) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;

      const newEntry: RecentSearchEntry = {
        id: createEntryId(),
        query: trimmedQuery,
        author: user?.name ?? "Tú",
        createdAt: new Date().toISOString(),
      };

      setRecentSearches((prev) => {
        const withoutDuplicates = prev.filter(
          (item) => item.query.toLowerCase() !== trimmedQuery.toLowerCase(),
        );

        const updated = [newEntry, ...withoutDuplicates].slice(0, MAX_RECENT);
        persistStoredSearches(updated);
        return updated;
      });

      // Prepare sync with the backend when the endpoint becomes available.
      queueSearchSync(newEntry).catch((error) =>
        console.warn("Failed to queue search history sync", error),
      );
    },
    [user?.name],
  );

  const handleSubmitSearch = useCallback(() => {
    void addRecentSearch(searchQuery);
    setSearchQuery("");
  }, [addRecentSearch, searchQuery]);

  const sectionStyles = useMemo(
    () => ({
      title: {
        fontWeight: 600,
        color: theme.palette.text.primary,
      },
      listItem: {
        borderRadius: 2,
        px: 1.5,
        py: 1,
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }),
    [theme],
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={ModalTransition}
      keepMounted
      fullWidth
      maxWidth="md"
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(4, 9, 25, 0.5)" },
        },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <SearchRoundedIcon sx={{ color: "common.white", fontSize: 26 }} />
          <InputBase
            placeholder="Buscar videos educativos..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmitSearch();
              }
            }}
            sx={{
              flex: 1,
              color: "common.white",
              fontSize: 18,
              "::placeholder": {
                color: "rgba(255, 255, 255, 0.72)",
              },
            }}
          />
        </Box>

        <IconButton onClick={onClose} sx={{ color: "common.white" }}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 4, py: 4 }}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="subtitle2" sx={sectionStyles.title}>
              Búsquedas Recientes
            </Typography>

            {recentSearches.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Aún no tienes búsquedas registradas.
              </Typography>
            ) : (
              <Stack spacing={1}>
                {recentSearches.map((item) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={sectionStyles.listItem}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        border: `2px solid ${theme.palette.grey[400]}`,
                      }}
                    />
                    <Box>
                      <Typography variant="body1" color="text.primary">
                        {item.query}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.author} · {formatRelativeTime(item.createdAt)}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>

          <Stack spacing={2}>
            <Typography variant="subtitle2" sx={sectionStyles.title}>
              Recomendaciones
            </Typography>

            <Stack spacing={1}>
              {recommendedTopics.map((item) => (
                <Stack
                  key={item}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={sectionStyles.listItem}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: 1,
                      backgroundColor: theme.palette.primary.light,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme.palette.primary.main,
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.charAt(0)}
                  </Box>
                  <Typography variant="body1" color="text.primary">
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CigSearchModal;
