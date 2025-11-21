import { useMemo, useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Typography } from "../../atoms/Typography/Typography";
import { useFavorites, type FavoriteItem } from "../../../context/FavoritesContext";
import ResourceRow from "../../molecules/ResourceRow/ResourceRow";

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
        <ResourceRow
          key={item.id}
          title={item.title}
          description={item.excerpt}
          category={item.category}
          actionLabel={actionLabel}
          onAction={() => {}}
          isFavorite={isActive(item.id)}
          onToggleFavorite={() => onToggle(item)}
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
