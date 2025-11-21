import {
  Box,
  Grid,
  useMediaQuery,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import ResourceThumb, {
  type ResourceThumbProps,
} from "../../atoms/ResourceThumb/ResourceThumb";
import type { ReactNode } from "react";

type ResourceRowProps = {
  title: string;
  description?: string;
  category?: string;
  metadata?: ReactNode;
  actionLabel: string;
  onAction?: () => void;
  thumbnailSrc?: string;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  thumbSize?: ResourceThumbProps["size"];
  thumbHeight?: ResourceThumbProps["height"];
  thumbSx?: SxProps<Theme>;
  actionAlign?: "flex-end" | "center" | "flex-start";
  actionFullWidth?: boolean;
  descriptionFallback?: string;
};

const ResourceRow: React.FC<ResourceRowProps> = ({
  title,
  description,
  descriptionFallback = "Explora este recurso para conocer todo el contenido disponible para ti.",
  category,
  metadata,
  actionLabel,
  onAction,
  thumbnailSrc,
  showFavorite = true,
  isFavorite,
  onToggleFavorite,
  thumbSize,
  thumbHeight,
  thumbSx,
  actionAlign = "flex-end",
  actionFullWidth = false,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: { xs: 2, md: 1.5 } }}>
      <Grid container spacing={{ xs: 1.5, md: 1 }} alignItems="center">
        <Grid
          size={{
            xs: 2,
            sm: 2,
            md: 1.3,
          }}
          sx={{ display: "flex" }}
        >
          <ResourceThumb
            imageSrc={thumbnailSrc}
            showFavorite={showFavorite}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            size={thumbSize}
            height={thumbHeight}
            sx={thumbSx}
          />
        </Grid>
        <Grid
          size={{
            xs: 7,
            sm: 7.5,
            md: 8.7,
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.75,
            paddingLeft: '0.5rem'
          }}
        >
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography component="p" variant="body2">
            {description ?? descriptionFallback}
          </Typography>
          {metadata
            ? metadata
            : category && (
                <Typography
                  component="span"
                  variant="subtitle2"
                  sxProps={{ color: "text.secondary" }}
                >
                  {category}
                </Typography>
              )}
        </Grid>
        <Grid
          size={{
            xs: 3,
            sm: 2.5,
            md: 2,
          }}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-end", md: actionAlign },
            alignSelf: "stretch",
            alignItems: actionAlign,
          }}
        >
          <Button
            size={isSm ? "small" : "medium"}
            color="primary"
            onClick={onAction}
            fullWidth={actionFullWidth}
          >
            {actionLabel}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourceRow;
