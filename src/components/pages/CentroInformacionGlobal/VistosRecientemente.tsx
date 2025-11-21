import { Box, Chip, Grid, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import ResourceRow from "../../molecules/ResourceRow/ResourceRow";
import FavoriteBadge from "../../atoms/FavoriteBadge/FavoriteBadge";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { CigBarFav } from "@iconsCustomizeds";
import {
  useRecentlyViewed,
  type RecentlyViewedItem,
} from "../../../context/RecentlyViewedContext";
import { useFavorites, type FavoriteItem } from "../../../context/FavoritesContext";

const actionLabels: Record<string, string> = {
  "investigation-resource": "Leer Artículo",
  "top-read": "Leer Artículo",
  "digital-resource": "Ver Recurso",
  multimedia: "Ver Video",
};

const toFavoriteItem = (item: RecentlyViewedItem): FavoriteItem => ({
  id: item.id,
  title: item.title,
  excerpt: item.description,
  category: item.category,
  type: item.type as FavoriteItem["type"],
});

const formatViewedAt = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <Box
    sx={{
      px: 3,
      py: 4,
      borderRadius: 2,
      border: "1px dashed #D5E3F8",
      backgroundColor: "#F9FBFF",
      textAlign: "center",
    }}
  >
    <Typography component="p" variant="body2" sxProps={{ color: "text.secondary" }}>
      {message}
    </Typography>
  </Box>
);

type MultimediaCardProps = {
  item: RecentlyViewedItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const MultimediaCard: React.FC<MultimediaCardProps> = ({ item, isFavorite, onToggleFavorite }) => (
  <Box
    sx={{
      borderRadius: 3,
      overflow: "hidden",
      border: "1px solid #E5ECF7",
      boxShadow: "0 10px 30px rgba(6, 46, 92, 0.08)",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <Box sx={{ position: "relative" }}>
      {item.thumbnail ? (
        <Box
          component="img"
          src={item.thumbnail}
          alt={item.title}
          sx={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16/9",
            bgcolor: "#E6EFFC",
            borderBottom: "1px solid #DDE7F5",
          }}
        />
      )}
      {item.duration && (
        <Chip
          label={item.duration}
          size="small"
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            bgcolor: "rgba(0, 0, 0, 0.65)",
            color: "HighlightText",
            fontWeight: 600,
            height: 24,
          }}
        />
      )}
      <FavoriteBadge
        icon={
          <DsSvgIcon
            component={CigBarFav}
            color={isFavorite ? "white" : "primary"}
            sxProps={{ fontSize: 12 }}
          />
        }
        isActive={isFavorite}
        onToggle={onToggleFavorite}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      />
    </Box>

    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}>
      <Typography component="h5" variant="subtitle1">
        {item.title}
      </Typography>
      {item.author && (
        <Typography component="span" variant="body1" sxProps={{ color: "#0C4D88" }}>
          {item.author}
        </Typography>
      )}
      <Typography component="p" variant="subtitle2" sxProps={{ color: "GrayText" }}>
        {item.description ?? "Descubre más contenido relacionado y continúa aprendiendo."}
      </Typography>
    </Box>
  </Box>
);

const VistosRecientemente: React.FC = () => {
  const { items, clear } = useRecentlyViewed();
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const researchTypes = new Set(["investigation-resource", "top-read", "digital-resource"]);
  const researchItems = items.filter((item) => researchTypes.has(item.type));
  const multimediaItems = items.filter((item) => item.type === "multimedia");
  const hasRecents = Boolean(items.length);

  const renderMetadata = (item: RecentlyViewedItem) => (
    <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
      {item.category && (
        <Typography component="span" variant="caption" sxProps={{ color: "text.secondary" }}>
          {item.category}
        </Typography>
      )}
      <Typography component="span" variant="caption" sxProps={{ color: "text.secondary" }}>
        Visto el {formatViewedAt(item.timestamp)}
      </Typography>
    </Box>
  );

  return (
    <ContainerDesktop
      title="Recursos vistos recientemente"
      description="Retoma los artículos, videos y recursos digitales que consultaste en tus últimas visitas al Centro de Información Global."
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button
          variant="text"
          color="primary"
          size={isSm ? "small" : "medium"}
          onClick={clear}
          disabled={!hasRecents}
        >
          Limpiar historial
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography component="h3" variant="h3">
          Recursos de Investigación
        </Typography>

        {researchItems.length ? (
          researchItems.map((item) => (
            <ResourceRow
              key={item.id}
              title={item.title}
              description={item.description}
              actionLabel={item.actionLabel ?? actionLabels[item.type] ?? "Abrir"}
              onAction={() => {}}
              thumbnailSrc={item.thumbnail}
              metadata={renderMetadata(item)}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={() => toggleFavorite(toFavoriteItem(item))}
            />
          ))
        ) : (
          <EmptyState message="Aún no tienes artículos o recursos en tu historial reciente. Explora el Centro de Información Global y verás tus últimos accesos aquí." />
        )}
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography component="h3" variant="h3">
          Recursos Multimedia
        </Typography>

        {multimediaItems.length ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{
              paddingTop: 3,
            }}
          >
            {multimediaItems.map((item) => (
              <Grid
                key={item.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <MultimediaCard
                  item={item}
                  isFavorite={isFavorite(item.id)}
                  onToggleFavorite={() => toggleFavorite(toFavoriteItem(item))}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState message="Reproduce un video para que aparezca automáticamente en esta sección." />
        )}
      </Box>
    </ContainerDesktop>
  );
};

export default VistosRecientemente;

