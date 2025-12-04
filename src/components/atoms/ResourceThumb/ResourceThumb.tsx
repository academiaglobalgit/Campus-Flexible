import { Box, type SxProps, type Theme } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";
import FavoriteBadge from "../FavoriteBadge/FavoriteBadge";
import DsSvgIcon from "../Icon/Icon";
import { CigBarFav } from "@iconsCustomizeds";

export type ResourceThumbProps = {
  imageSrc?: string;
  alt?: string;
  size?: ResponsiveStyleValue<number | string>;
  height?: ResponsiveStyleValue<number | string>;
  borderRadius?: number | string;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  badgeOffset?: {
    top?: number;
    right?: number;
  };
  sx?: SxProps<Theme>;
};

const DEFAULT_SIZE = { xs: 64, sm: 72, md: 86 };

const ResourceThumb: React.FC<ResourceThumbProps> = ({
  imageSrc,
  alt = "Vista previa del recurso",
  size = DEFAULT_SIZE,
  height,
  borderRadius = 1,
  showFavorite = true,
  isFavorite = false,
  onToggleFavorite,
  badgeOffset = { top: 6, right: 6 },
  sx,
}) => (
  <Box
    sx={{
      position: "relative",
      width: size,
      height: height ?? size,
      borderRadius,
      overflow: "hidden",
      border: "1px solid #E6EFFC",
      background: "linear-gradient(180deg, #E6EFFC 0%, #F8FBFF 100%)",
      ...sx,
    }}
  >
    {imageSrc ? (
      <Box
        component="img"
        src={imageSrc}
        alt={alt}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : null}
    {showFavorite && (
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
          top: badgeOffset.top ?? 6,
          right: badgeOffset.right ?? 6,
        }}
      />
    )}
  </Box>
);

export default ResourceThumb;
