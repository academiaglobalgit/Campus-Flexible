import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import DsSvgIcon from "../../atoms/Icon/Icon";
import FavoriteBadge from "../../atoms/FavoriteBadge/FavoriteBadge";
import { CigBarFav } from "@iconsCustomizeds";
import { useFavorites, type FavoriteItem } from "../../../context/FavoritesContext";

type Resource = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
};

const categories: string[] = [
  "Categoría Aquí",
  "Programación",
  "Tecnología",
  "Administración",
  "Multimedia",
  "IA",
];

const resources: Resource[] = Array.from({ length: 4 }, (_, index) => ({
  id: `digital-${index + 1}`,
  title: "Nombre del artículo Aquí",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  category: categories[index % categories.length],
}));

const toFavoriteItem = (resource: Resource): FavoriteItem => ({
  id: resource.id,
  title: resource.title,
  excerpt: resource.excerpt,
  category: resource.category,
  type: "digital-resource",
});

type ThumbProps = {
  withFav?: boolean;
  isFavorite?: boolean;
  onToggle?: () => void;
};

const Thumb: React.FC<ThumbProps> = ({ withFav = true, isFavorite, onToggle }) => (
  <Box
    sx={{
      position: "relative",
      width: { xs: 64, sm: 72, md: 86 },
      height: { xs: 64, sm: 72, md: 86 },
    }}
  >
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 1,
        bgcolor: "#E6EFFC",
        border: "1px solid #F1F4F6",
      }}
    />
    {withFav && (
      <FavoriteBadge
        icon={
          <DsSvgIcon
            component={CigBarFav}
            color={isFavorite ? "white" : "primary"}
            sxProps={{ fontSize: 12 }}
          />
        }
        isActive={isFavorite}
        onToggle={onToggle}
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
        }}
      />
    )}
  </Box>
);

const ResourceRow: React.FC<Resource> = (resource) => {
  const { id, title, excerpt, category } = resource;
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { isFavorite, toggleFavorite } = useFavorites();

  const favoriteItem = toFavoriteItem(resource);
  const favoriteActive = isFavorite(id);

  return (
    <Box sx={{ py: { xs: 1.5, md: 1 } }}>
      <Grid
        container
        spacing={{ xs: 1.5, md: 2 }}
        sx={{
          alignItems: "center",
          minHeight: { xs: 96, md: 120 },
        }}
      >
        <Grid
          size={{
            xs: 2,
            sm: 1.8,
            md: 1,
          }}
          sx={{
            display: "flex",
          }}
        >
          <Thumb
            isFavorite={favoriteActive}
            onToggle={() => toggleFavorite(favoriteItem)}
          />
        </Grid>
        <Grid
          size={{
            xs: 7,
            sm: 9,
            md: 9,
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography
            component="p"
            variant="body2"
            
          >
            {excerpt}
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 3, md: 2 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button size={isSm ? "small" : "medium"} color="primary" onClick={() => {}}>
            Ver Recurso
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const RecursosDigitales: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ContainerDesktop
      title="Recursos Digitales"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", pb: 2 }}>
        {categories.map((c, i) => (
          <Button
            key={`${c}-${i}`}
            variant={i === 0 ? "contained" : "outlined"}
            color={i === 0 ? "primary" : undefined}
            onClick={() => {}}
            size={isSm ? "small" : "medium"}
            sxProps={i !== 0 ? { borderColor: theme.palette.grey[300] } : undefined}
          >
            {c}
          </Button>
        ))}
      </Box>

      {resources.map((resource) => (
        <ResourceRow key={resource.id} {...resource} />
      ))}
    </ContainerDesktop>
  );
};

export default RecursosDigitales;
