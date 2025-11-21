import { Box, Typography, Chip, Divider } from '@mui/material';

interface VideoRecommendation {
    id: number;
    thumbnail: string;
    duration: string;
    title: string;
    channel: string;
    views: string;
    uploadTime: string;
}

interface VideoRecommendationsProps {
    videos: VideoRecommendation[];
    title?: string;
}

export const MultimediaRecomendaciones: React.FC<VideoRecommendationsProps> = ({
    videos,
    title = 'Recomendaciones',
}) => {
    const formatViews = (views: string) => {
        // Ejemplo: "245K" o "128K"
        return views;
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
            {/* Title */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 600,
                    // mb: 2,
                    fontSize: '18px',
                }}
            >
                {title}
            </Typography>
            
            <Divider sx={{ mt: 0.5 }} />

            {/* Video List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {videos.map((video) => (
                    <VideoRecommendationItem key={video.id} video={video} />
                ))}
            </Box>
        </Box>
    );
};

interface VideoRecommendationItemProps {
    video: VideoRecommendation;
}

const VideoRecommendationItem: React.FC<VideoRecommendationItemProps> = ({ video }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1.5,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                padding: 1,
                borderRadius: '8px',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            }}
        >
            {/* Thumbnail */}
            <Box
                sx={{
                    position: 'relative',
                    flexShrink: 0,
                    width: '168px',
                    height: '94px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={video.thumbnail}
                    alt={video.title}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                {/* Duration Chip */}
                <Chip
                    label={video.duration}
                    size="small"
                    sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: '#FFF',
                        fontSize: '11px',
                        fontWeight: 600,
                        height: '18px',
                        borderRadius: '4px',
                        '& .MuiChip-label': {
                            padding: '0 6px',
                        },
                    }}
                />
            </Box>

            {/* Video Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* Title */}
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: 1.4,
                        mb: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        color: 'text.primary',
                    }}
                >
                    {video.title}
                </Typography>

                {/* Channel */}
                <Typography
                    variant="caption"
                    sx={{
                        display: 'block',
                        color: 'text.secondary',
                        fontSize: '12px',
                        mb: 0.3,
                    }}
                >
                    {video.channel}
                </Typography>

                {/* Views and Time */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '12px',
                        }}
                    >
                        {video.views} visualizaciones
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '12px',
                        }}
                    >
                        •
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '12px',
                        }}
                    >
                        hace {video.uploadTime}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};