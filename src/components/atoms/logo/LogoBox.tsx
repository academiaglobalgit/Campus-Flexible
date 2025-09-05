import React from "react";
import { Box } from "@mui/material";
import { loadConfig } from "../../../config/configStorage";

type BoxProps = {
    src: string;
    alt?: string;
    sx?: object;
}

export const LogoBox: React.FC<BoxProps> = ({ alt, sx}) => {
    const [config, setConfig] = React.useState<any>(null);

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    }, []);

    return (
        <Box
            component="img"
            src={config?.data.logo_url}
            alt= {alt}
            sx={sx}
        />
    );
};
