import { Box, Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";

type Article = {
  title: string;
  excerpt: string;
};

const categories = [
  "Categoría Aquí",
  "Programación",
  "Tecnología",
  "Administración",
  "Multimedia",
  "IA",
];

const leftArticles: Article[] = new Array(5).fill(0).map(() => ({
  title: "Nombre del artículo Aquí",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}));

const topReads: Article[] = new Array(3).fill(0).map(() => ({
  title: "Nombre del artículo Aquí",
  excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}));

const Thumb = () => (
  <Box
    sx={{
        width: "100%",     // que se adapte al ancho de su columna
      height: "100%",    // 🔑 se estira al alto del Grid padre
      borderRadius: "6px",
      background: "#E6EFFC",
      border: "1px solid #F1F4F6",
    }}
  />
);

const ThumbTwo = () => (
  <Box
    sx={{
      width: 60,     // que se adapte al ancho de su columna
      height: '100%',    // 🔑 se estira al alto del Grid padre
      borderRadius: "6px",
      background: "#E6EFFC",
      border: "1px solid #F1F4F6",
    }}
  />
);

const ArticleRow: React.FC<Article> = ({ title, excerpt }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "stretch",
        }}
      >
        {/* Columna del Thumb */}
        <Grid
          size={{ md: 2, lg: 2 }}
          sx={{
            display: "flex",
            height: "auto",
          }}
        >
          <Thumb />
        </Grid>

        {/* Columna del texto */}
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
            {title}
          </Typography>
          <Typography component="p" variant="body2">
            {excerpt}
          </Typography>
        </Grid>

        {/* Columna del botón */}
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
          <Button size={isSm ? "small" : "medium"} onClick={() => {}}>
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
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <Box>
          <ThumbTwo />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            
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
              paddingTop: 1
            }}
          >
             <Button size={'small'} onClick={() => {}}>
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
                lg: 12
            }}

        >
            {/* <Grid item xs={12} md={7}> */}
            <Grid 
                size={{
                    xs: 12,
                    md: 7,
                    lg: 7,
                    xl: 7
                }}
            >
                {leftArticles.map((a, idx) => (
                    <ArticleRow key={`a-${idx}`} {...a} />
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
                <Typography 
                    component="h4" 
                    variant="h4" 
                    sxProps={{ color: "#231F20" }}
                >
                    Top Más Leídos
                </Typography>
                
                {topReads.map((a, idx) => (
                    <TopReadRow key={`t-${idx}`} {...a} />
                ))}
            </Grid>
        </Grid>

    </ContainerDesktop>
  );
};

export default RecursosInvestigacion;
