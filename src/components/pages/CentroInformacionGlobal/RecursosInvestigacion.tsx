import { Box, Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useCallback } from "react";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import { useFavorites, type FavoriteItem } from "../../../context/FavoritesContext";
import { useRecentlyViewed } from "../../../context/RecentlyViewedContext";
import ResourceRow from "../../molecules/ResourceRow/ResourceRow";
import ResourceThumb from "../../atoms/ResourceThumb/ResourceThumb";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
};

const categories = [
  "Categoría Aquí",
  "Programación",
  "Tecnología",
  "Administración",
  "Multimedia",
  "IA",
];

const leftArticles: Article[] = Array.from({ length: 5 }, (_, index) => ({
  id: `investigation-${index + 1}`,
  title: "Nombre del artículo Aquí",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  category: categories[index % categories.length],
}));

const topReads: Article[] = Array.from({ length: 3 }, (_, index) => ({
  id: `top-read-${index + 1}`,
  title: "Nombre del artículo Aquí",
  excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  category: "Top Reads",
}));

const toFavoriteItem = (
  article: Article,
  type: FavoriteItem["type"] = "investigation-resource"
): FavoriteItem => ({
  id: article.id,
  title: article.title,
  excerpt: article.excerpt,
  category: article.category,
  type,
});

const RecursosInvestigacion: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { addItem: addRecentlyViewed } = useRecentlyViewed();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleReadArticle = useCallback(
    (article: Article, type: FavoriteItem["type"]) => {
      addRecentlyViewed({
        id: article.id,
        title: article.title,
        description: article.excerpt,
        category: article.category,
        type,
        actionLabel: "Leer Artículo",
      });
    },
    [addRecentlyViewed]
  );

  type TopReadArticleProps = {
    article: Article;
    onRead: () => void;
    isFavorite: boolean;
    onToggleFavorite: () => void;
  };

  const TopReadArticle: React.FC<TopReadArticleProps> = ({
    article,
    onRead,
    isFavorite,
    onToggleFavorite,
  }) => (
    <Box sx={{ py: { xs: 2, md: 1.5 } }}>
      <Grid container spacing={{ xs: 1.5, md: 1.5 }} alignItems="center">
        <Grid
          size={{
            xs: 4,
            sm: 4,
            md: 1.3,
            lg: 3,
          }}
          sx={{ display: "flex" }}
        >
          <ResourceThumb
            sx={{
              width: "100%",
              height: "200px",
            }}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        </Grid>

        <Grid
          size={{
            xs: 7,
            sm: 7.5,
            md: 8.7,
            lg: 9,
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 0.75,
            minHeight: "200px",
          }}
        >
          <Typography component="h5" variant="h5">
            {article.title}
          </Typography>
          <Typography component="p" variant="body2">
            {article.excerpt}
          </Typography>

          <Button size={isSm ? "small" : "medium"} color="primary" onClick={onRead}>
            Leer Articulo
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <ContainerDesktop
      title="Recursos de Investigación"
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

      <Grid
        container
        size={{
          lg: 12,
        }}
      >
        <Grid
          size={{
            xs: 12,
            md: 8,
            lg: 8,
            xl: 8,
          }}
        >
          {leftArticles.map((article) => (
            <ResourceRow
              key={article.id}
              title={article.title}
              description={article.excerpt}
              category={article.category}
              actionLabel="Leer Artículo"
              onAction={() => handleReadArticle(article, "investigation-resource")}
              isFavorite={isFavorite(article.id)}
              onToggleFavorite={() => toggleFavorite(toFavoriteItem(article))}
            />
          ))}
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, display: { xs: "none", md: "block" } }}
        />

        <Grid
          size={{
            md: 3,
            xs: 12,
            lg: 3,
          }}
        >
          <Typography component="h4" variant="h4" sxProps={{ color: "#231F20" }}>
            Top Más Leídos
          </Typography>

          {topReads.map((article) => (
            <TopReadArticle
              key={article.id}
              article={article}
              onRead={() => handleReadArticle(article, "top-read")}
              isFavorite={isFavorite(article.id)}
              onToggleFavorite={() => toggleFavorite(toFavoriteItem(article, "top-read"))}
            />
          ))}

        </Grid>

      </Grid>
    </ContainerDesktop>
  );
};

export default RecursosInvestigacion;
