import { Box, useTheme } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { type KeyboardEvent, type ReactNode } from "react";
import { CigBarFavWhite } from "@iconsCustomizeds";

type FavoriteBadgeProps = BoxProps & {
  icon?: ReactNode;
  size?: number;
  isActive?: boolean;
  onToggle?: () => void;
};

const FavoriteBadge: React.FC<FavoriteBadgeProps> = ({
  icon = "*",
  size = 22,
  sx,
  isActive = false,
  onToggle,
  ...props
}) => {
  const theme = useTheme();
  const extraSx = Array.isArray(sx) ? sx : sx ? [sx] : [];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.key === "Enter" || event.key === " ") && onToggle) {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      {...props}
      sx={[
        {
          width: size,
          height: size,
          borderRadius: "50%",
          bgcolor: isActive ? theme.palette.primary.main : "#FFFFFF",
          color: isActive ? "#FFFFFF" : theme.palette.primary.main,
          boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
          display: "grid",
          placeItems: "center",
          fontSize: 12,
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "scale(1.08)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          },
        },
        ...extraSx,
      ]}
    >
      {icon}
    </Box>
  );
};

export default FavoriteBadge;
