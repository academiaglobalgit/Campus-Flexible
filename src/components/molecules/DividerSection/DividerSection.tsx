import { Divider, Typography } from "@mui/material";

type PropsDividerSection = {
    Title: string;
};

export const DividerSection: React.FC<PropsDividerSection> = ({ Title }) => (
    <Divider textAlign="center">
        <Typography component="span" variant="subtitle1" color="primary.light" sx={{ fontWeight: 400 }}>
            {Title}
        </Typography>
    </Divider>
);