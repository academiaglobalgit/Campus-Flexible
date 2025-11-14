import { useMemo, useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import FavoriteBadge from "../../atoms/FavoriteBadge/FavoriteBadge";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { CigBarFav } from "@iconsCustomizeds";
import { useFavorites, type FavoriteItem } from "../../../context/FavoritesContext";

type FavoriteRowProps = {
  item: FavoriteItem;
  actionLabel: string;
  isActive: boolean;
  onToggle: () => void;
};

const FavoriteThumb: React.FC<{ isActive: boolean; onToggle: () => void }> = ({
  isActive,
  onToggle,
}) => (
  <Box
    sx={{
      position: "relative",
      width: { xs: 64, sm: 72, md: 86 },
      height: { xs: 64, sm: 72, md: 86 },
      borderRadius: 1,
      bgcolor: "#E6EFFC",
      border: "1px solid #F1F4F6",
    }}
  >
    <FavoriteBadge
      icon={
        <DsSvgIcon
          component={CigBarFav}
          color={isActive ? "white" : "primary"}
          sxProps={{ fontSize: 12 }}
        />
      }
      isActive={isActive}
      onToggle={onToggle}
      sx={{
        position: "absolute",
        top: 6,
        right: 6,
        zIndex: 1,
      }}
    />
  </Box>
);

const FavoriteRow: React.FC<FavoriteRowProps> = ({ item, actionLabel, isActive, onToggle }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 2 }}>
      <Grid
        container
        spacing={{ xs: 1.5, md: 2 }}
        sx={{
          alignItems: "center",
        }}
      >
        <Grid
          size={{
            xs: 2,
            sm: 2,
            md: 1.5,
          }}
          sx={{
            display: "flex",
          }}
        >
          <FavoriteThumb isActive={isActive} onToggle={onToggle} />
        </Grid>

        <Grid
          size={{
            xs: 7,
            sm: 8,
            md: 8,
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography component="h5" variant="h5">
            {item.title}
          </Typography>
          <Typography component="p" variant="body2">
            {item.excerpt ||
              "Explora el recurso para conocer todo el contenido disponible para ti."}
          </Typography>
          {item.category && (
            <Typography component="span" variant="caption" sxProps={{ color: "text.secondary" }}>
              {item.category}
            </Typography>
          )}
        </Grid>

        <Grid
          size={{ xs: 3, sm: 2, md: 2.5 }}
          sx={{ display: "flex", justifyContent: { xs: "flex-end", md: "center" } }}
        >
          <Button size={isSm ? "small" : "medium"} color="primary" onClick={() => {}}>
            {actionLabel}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <Box
    sx={{
      px: 2,
      py: 4,
      bgcolor: "#F9FBFF",
      border: "1px dashed #D6E3F8",
      borderRadius: 2,
      textAlign: "center",
    }}
  >
    <Typography component="p" variant="body2" sxProps={{ color: "text.secondary" }}>
      {message}
    </Typography>
  </Box>
);

const SectionList: React.FC<{
  title: string;
  items: FavoriteItem[];
  actionLabel: string;
  onToggle: (item: FavoriteItem) => void;
  isActive: (id: string) => boolean;
}> = ({ title, items, actionLabel, onToggle, isActive }) => (
  <Box sx={{ mt: 5 }}>
    <Typography component="h4" variant="h4" sxProps={{ mb: 2 }}>
      {title}
    </Typography>
    {!items.length ? (
      <EmptyState message="Aún no has guardado favoritos en esta sección." />
    ) : (
      items.map((item) => (
        <FavoriteRow
          key={item.id}
          item={item}
          actionLabel={actionLabel}
          isActive={isActive(item.id)}
          onToggle={() => onToggle(item)}
        />
      ))
    )}
  </Box>
);

const Favoritos: React.FC = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredFavorites = useMemo(() => {
    if (!normalizedSearch) return favorites;
    return favorites.filter((fav) => {
      const haystack = `${fav.title} ${fav.excerpt ?? ""} ${fav.category ?? ""}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [favorites, normalizedSearch]);

  const investigationFavorites = useMemo(
    () => filteredFavorites.filter((fav) => fav.type === "investigation-resource"),
    [filteredFavorites]
  );

  const digitalFavorites = useMemo(
    () => filteredFavorites.filter((fav) => fav.type === "digital-resource"),
    [filteredFavorites]
  );

  return (
    <ContainerDesktop
      title="Mis Favoritos"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <TextField
        fullWidth
        placeholder="Buscar en favoritos..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <SectionList
        title="Recursos de Investigación"
        items={investigationFavorites}
        actionLabel="Leer Artículo"
        onToggle={toggleFavorite}
        isActive={isFavorite}
      />

      <SectionList
        title="Recursos Digitales"
        items={digitalFavorites}
        actionLabel="Ver Recurso"
        onToggle={toggleFavorite}
        isActive={isFavorite}
      />
    </ContainerDesktop>
  );
};

export default Favoritos;
