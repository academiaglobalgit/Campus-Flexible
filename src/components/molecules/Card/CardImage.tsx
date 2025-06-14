import React from 'react';
import Card from '@mui/material/Card';
import { CardContent, CardMedia } from '@mui/material';

type CardImageProps = {
    image: any;
    children: React.ReactNode;
    heightImg?: number;
}

const CardImage: React.FC<CardImageProps> = ({image, children, heightImg = 192}) => {
    return (
        <Card sx={{ maxWidth: 358, borderRadius: '11px', boxShadow: '0px 7px 14px 0px #D3DAE2;' }}>
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