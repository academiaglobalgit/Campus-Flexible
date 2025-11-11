import type React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "../../atoms/Typography/Typography";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { flexColumn, flexRows } from "@styles";

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Divider, IconButton } from "@mui/material";
import { ComentariosMultimedia } from "../../molecules/ComentariosMultimedia/ComentariosMultimedia";

const MultimediaWatch: React.FC = () => {
    const urlVideo = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";
    //https://www.youtube.com/watch?v=vMexNisV7aA
    const title = "Título del video mostrado";

    const Chip = (content: React.ReactNode) => {
        return(
            <IconButton
                sx={{
                    height: '32px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '9999px',
                    p: 2,
                 }}
            >
                {content}
            </IconButton>
        );
    }

    const comments: any[] = [
        {
            id: 1,
            author: 'Juan Pérez',
            avatar: 'J',
            timeAgo: 'hace 2 días',
            content: '¡Excelente video! Me ayudó mucho a entender el tema.',
            likes: 24,
            userLiked: false,
        },
        {
            id: 2,
            author: 'María García',
            avatar: 'M',
            timeAgo: 'hace 1 semana',
            content: 'Muy bien explicado, gracias por compartir este contenido de calidad.',
            likes: 15,
            userLiked: false,
        },
        {
            id: 3,
            author: 'Carlos Rodríguez',
            avatar: 'C',
            timeAgo: 'hace 3 días',
            content: '¿Hay mas sobre temas relacionados? Me encantaría ver más.',
            likes: 8,
            userLiked: false,
        },
        {
            id: 4,
            author: 'Ana Martínez',
            avatar: 'A',
            timeAgo: 'hace 5 horas',
            content: 'Increíble explicación, justo lo que necesitaba. ¡Gracias!',
            likes: 42,
            userLiked: false,
        },
    ];

    const handleAddComment = (content: string) => {
        console.log('Nuevo comentario:', content);
        // Lógica para agregar comentario
    };

    const handleLike = (commentId: number) => {
        console.log('Like en comentario:', commentId);
        // Lógica para dar like
    };

    const handleDislike = (commentId: number) => {
        console.log('Dislike en comentario:', commentId);
        // Lógica para dar dislike
    };

    const handleReply = (commentId: number) => {
        console.log('Responder a comentario:', commentId);
        // Lógica para responder
    };

    return(
        <Grid container spacing={2}>
            <Grid size={{md: 8, xs: 12}}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="video"
                                src={ urlVideo }
                                controls={true}
                                autoPlay={true}
                                muted={false}
                            />
                        </CardActionArea>
                    </Card>
                    <Typography variant={'h4'} component={'h4'}>
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Avatar width={40} />
                        
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="body2"
                                component="span"
                                sxProps={{
                                    mb: 0.5,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    lineHeight: 1.4,
                                    color: 'text.primary',
                                }}
                            >
                                Tutorias 1
                            </Typography>
                            <Typography
                                variant="body1"
                                component="span"
                                sxProps={{
                                    display: 'block',
                                    color: 'text.secondary',
                                    mb: 0.2,
                                }}
                            >
                                1.2M Visualizaciones
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            ...flexColumn,
                            alignItems: 'flex-start',
                            gap: 1,
                            p: 2,
                            minHeight: '112px',
                            borderRadius: '10px',
                            backgroundColor: '#F1F4F6',
                        }}
                    >
                        <Box sx={{...flexRows, gap: 1, justifyContent: 'flex-start'}}>
                            <Typography variant="body2" component="span">145,678 visualizaciones</Typography>
                            <Typography variant="body2" component="span">•</Typography>
                            <Typography variant="body2" component="span">3 nov 2024</Typography>
                        </Box>
                        <Typography variant="body2" component="span">
                            Descripción del video aquí. Este es un video increíble sobre un tema fascinante que seguramente te va a encantar. No olvides darle like y suscribirte para más contenido.
                        </Typography>
                    </Box>
                    <Box sx={{...flexRows, gap: 1, justifyContent: 'flex-start'}}>
                        {
                             <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    backgroundColor: '#F1F5F9',
                                    borderRadius: '20px',
                                    padding: '0px 8px',
                                }}
                            >
                                <IconButton
                                    size="small"
                                    sx={{ padding: '6px', height: '32px', borderRadius: '20px' }}

                                >                
                                    <ThumbUpOutlinedIcon sx={{ fontSize: 20 }} />
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        sxProps={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            minWidth: '24px',
                                            textAlign: 'center',
                                            marginLeft: '4px',
                                        }}
                                    >
                                        1,234
                                    </Typography>
                                </IconButton>
                                <Box
                                    sx={{
                                        width: '1px',
                                        height: '20px',
                                        backgroundColor: '#D0D0D0',
                                        marginX: 0.5,
                                    }}
                                />

                                <IconButton
                                    size="small"                
                                    sx={{ padding: '6px' }}
                                >
                                    <ThumbDownOffAltOutlinedIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </Box>
                        }
                        {Chip(
                            <Box sx={{...flexRows, justifyContent: 'center', alignItems: 'center'}}>
                                <ShareOutlinedIcon sx={{fontSize: '16px'}} />
                                <Typography variant="body1" component="span" sxProps={{px: 1}}>Compartir</Typography>
                            </Box>
                        )}
                        {Chip(
                            <Box sx={{...flexRows, justifyContent: 'center', alignItems: 'center'}}>
                                <BookmarkBorderOutlinedIcon sx={{fontSize: '16px'}} />
                                <Typography variant="body1" component="span" sxProps={{px: 1}}>Guardar</Typography>
                            </Box>
                        )}
                        {Chip(
                            <Box sx={{...flexRows, justifyContent: 'center', alignItems: 'center'}}>
                                <MoreVertOutlinedIcon sx={{fontSize: '16px'}} />
                            </Box>
                        )}
                    </Box>
                </Box>
                <Divider />
                <ComentariosMultimedia 
                    comments={comments}
                    totalComments={4}
                    currentUserAvatar="TÚ"
                    onAddComment={handleAddComment}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    onReply={handleReply}
                />
            </Grid>
            <Grid size={{md: 4, xs: 12}}>

            </Grid>
        </Grid>
    );
}

export default MultimediaWatch;