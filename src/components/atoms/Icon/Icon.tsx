import SvgIcon from "@mui/material/SvgIcon";

type IconProps = {
    component: any;
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';
}

const DsSvgIcon = ({component, color = 'primary'}: IconProps) => {
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
                    }}
                    color={color}
                />
            )
    );
};

export default DsSvgIcon;