import type { SxProps, Theme } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

type IconProps = {
    component: any;
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';
    sxProps?: SxProps<Theme>;
}

const DsSvgIcon = ({component, color = 'primary', sxProps}: IconProps) => {
    return (
        color === 'inherit'
            ? <SvgIcon component={component} inheritViewBox sx={{ fill: "none" }} />
            : (
                <SvgIcon
                    component={component}
                    inheritViewBox
                    sx={{
                        fill: "none",
                        "& path": {
                            stroke: "currentColor",
                        },
                        "& circle": {
                            stroke: "currentColor",
                        },
                        "& rect": {
                            stroke: "currentColor",
                        },
                        ...sxProps
                    }}
                    color={color}
                />
            )
    );
};

export default DsSvgIcon;