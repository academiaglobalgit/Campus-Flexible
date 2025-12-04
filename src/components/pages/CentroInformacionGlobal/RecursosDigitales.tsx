import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import Button from "../../atoms/Button/Button";
import { useFavorites, type FavoriteItem } from "../../../context/FavoritesContext";
import { useRecentlyViewed } from "../../../context/RecentlyViewedContext";
import ResourceRow from "../../molecules/ResourceRow/ResourceRow";

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

const RecursosDigitales: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { addItem: addRecentlyViewed } = useRecentlyViewed();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleViewResource = (resource: Resource) => {
    addRecentlyViewed({
      id: resource.id,
      title: resource.title,
      description: resource.excerpt,
      category: resource.category,
      type: "digital-resource",
      actionLabel: "Ver Recurso",
    });
  };

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
        <ResourceRow
          key={resource.id}
          title={resource.title}
          description={resource.excerpt}
          category={resource.category}
          actionLabel="Ver Recurso"
          onAction={() => handleViewResource(resource)}
          isFavorite={isFavorite(resource.id)}
          onToggleFavorite={() => toggleFavorite(toFavoriteItem(resource))}
        />
      ))}
    </ContainerDesktop>
  );
};

export default RecursosDigitales;
