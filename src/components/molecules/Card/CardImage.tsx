import React from 'react';
import Card from '@mui/material/Card';
import { CardContent, CardMedia, useMediaQuery, useTheme } from '@mui/material';

type CardImageProps = {
    image: any;
    children: React.ReactNode;
    heightImg?: number;
}

const CardImage: React.FC<CardImageProps> = ({image, children, heightImg = 192}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const maxWidth = isMobile ? undefined : 358;
    const minWidth = isMobile ? undefined : 358;
    const minHeight = isMobile ? undefined : 508;
    return (
        <Card sx={{ maxWidth, borderRadius: '11px', boxShadow: '0px 7px 14px 0px #D3DAE2;', minHeight, minWidth }}>
            <CardMedia
                component="img"
                height={ heightImg }
                image={ image }
            />
            <CardContent>
                { children }
            </CardContent>
        </Card>
    );
};

export default CardImage;