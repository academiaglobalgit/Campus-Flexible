import type { SxProps, Theme } from "@mui/material";
import type { OverridableStringUnion } from "@mui/types";
import type { SvgIconPropsColorOverrides } from "@mui/material/SvgIcon";
import SvgIcon from "@mui/material/SvgIcon";

type IconColor = OverridableStringUnion<
  'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'white',
  SvgIconPropsColorOverrides
>;

type IconProps = {
  component: any;
  color?: IconColor;
  sxProps?: SxProps<Theme>;
};

const DsSvgIcon = ({ component, color = 'primary', sxProps }: IconProps) => {
  return (
    <SvgIcon
      component={component}
      inheritViewBox
      color={color}
      sx={{
        fill: 'none',
        '& path': { stroke: 'currentColor' },
        '& circle': { stroke: 'currentColor' },
        '& rect': { stroke: 'currentColor' },
        ...sxProps,
      }}
    />
  );
};

export default DsSvgIcon;
