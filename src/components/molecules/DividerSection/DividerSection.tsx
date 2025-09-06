import { Divider, Typography } from "@mui/material";

type PropsDividerSection = {
    Title: string;
    marginTB?: number;
};

export const DividerSection: React.FC<PropsDividerSection> = ({ Title, marginTB }) => (
    <Divider textAlign="center" sx={[ marginTB !== undefined && { marginTop: `${marginTB}px`, marginBottom: `${marginTB}px` } ]}>
        <Typography component="span" variant="subtitle1" color="primary.light" sx={{ fontWeight: 400 }}>
            {Title}
        </Typography>
    </Divider>
);