import { Box, Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import FavoriteBadge from "../../atoms/FavoriteBadge/FavoriteBadge";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { CigBarFav } from "@iconsCustomizeds";
import { useFavorites, type FavoriteItem } from "../../../context/FavoritesContext";

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

const toFavoriteItem = (article: Article, type: FavoriteItem["type"] = "investigation-resource"): FavoriteItem => ({
  id: article.id,
  title: article.title,
  excerpt: article.excerpt,
  category: article.category,
  type,
});

type ThumbProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

const Thumb: React.FC<ThumbProps> = ({ isFavorite, onToggle }) => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      height: "100%",
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
  </Box>
);

const ThumbTwo = () => (
  <Box
    sx={{
      width: 60,
      height: "100%",
      borderRadius: "6px",
      background: "#E6EFFC",
      border: "1px solid #F1F4F6",
    }}
  />
);

const ArticleRow: React.FC<Article> = (article) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { isFavorite, toggleFavorite } = useFavorites();
  const favoriteItem = toFavoriteItem(article);
  const favoriteActive = isFavorite(article.id);

  return (
    <Box sx={{ py: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "stretch",
        }}
      >
        <Grid
          size={{ md: 2, lg: 2 }}
          sx={{
            display: "flex",
            height: "auto",
          }}
        >
          <Thumb
            isFavorite={favoriteActive}
            onToggle={() => toggleFavorite(favoriteItem)}
          />
        </Grid>

        <Grid
          size={{ md: 7, lg: 7 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
            height: "100%",
          }}
        >
          <Typography component="h5" variant="h5">
            {article.title}
          </Typography>
          <Typography
            component="p"
            variant="body2"
          >
            {article.excerpt}
          </Typography>
        </Grid>

        <Grid
          size={{ md: 3, lg: 3 }}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            pr: 3,
            height: "100%",
          }}
        >
          <Button size={isSm ? "small" : "medium"} color="primary" onClick={() => {}}>
            Leer Artículo
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const TopReadRow: React.FC<Article> = ({ title, excerpt }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        <Box>
          <ThumbTwo />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography component="span" variant="subtitle1">
            {title}
          </Typography>
          <Typography component="p" variant="body2">
            {excerpt}
          </Typography>
          <Box
            sx={{
              paddingTop: 1,
            }}
          >
            <Button size={isSm ? "small" : "medium"} onClick={() => {}}>
              Leer Artículo
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const RecursosInvestigacion: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

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
            md: 7,
            lg: 7,
            xl: 7,
          }}
        >
          {leftArticles.map((article) => (
            <ArticleRow key={article.id} {...article} />
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
            <TopReadRow key={article.id} {...article} />
          ))}
        </Grid>
      </Grid>
    </ContainerDesktop>
  );
};

export default RecursosInvestigacion;
