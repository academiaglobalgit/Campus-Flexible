import { Box, Card, CardActionArea, CardMedia, Typography } from "@mui/material";

type VideoCardProps = {
    urlVideo: string;
    controls?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    title: string;
    description?: string;
    fontSizeTitle?: any;
}

export const VideoCard: React.FC<VideoCardProps> = ({ urlVideo, controls, autoPlay, muted, title, description, fontSizeTitle = "h3" }) => {
    return (        
        <Box sx={[
            {display: 'flex', flexDirection: 'column', gap: '20px'},
        ]}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="video"
                        src={ urlVideo || "https://www.w3schools.com/html/mov_bbb.mp4" }
                        controls={controls ?? true}
                        autoPlay={autoPlay ?? false}
                        muted={muted ?? false}
                    />
                </CardActionArea>
            </Card>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent:"center", flexDirection:"column", gap:"20px"}}>
                <Typography variant={fontSizeTitle} component={fontSizeTitle} color="primary">
                    {title}
                </Typography>
                <Typography variant="body1" component="span">
                    {description || ""}
                </Typography>
            </Box>
        </Box>
    );
}