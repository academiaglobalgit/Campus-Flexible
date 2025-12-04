import { Box, Typography, Avatar, Chip } from '@mui/material';
import type React from 'react';

type VideoCardProps = {
    videos: any[];
    onVideoSelect: (video: any) => void;
}

const VideoGrid: React.FC<VideoCardProps> = ({videos, onVideoSelect}) => {
    
    const handleVideoSelect = (video: any) => {
        if(onVideoSelect) {
            onVideoSelect(video);
        }
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                },
                gap: { xs: 2, md: 3 },
                padding: { xs: 2, md: 3 },
            }}
        >
            {videos.map((video) => (
                <Box
                    key={video.id}
                    sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                            '& .thumbnail': {
                                transform: 'scale(1.02)',
                            },
                        },
                    }}
                    onClick={() => handleVideoSelect(video)}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            mb: 1.5,
                        }}
                    >
                        <Box
                            component="img"
                            src={video.thumbnail}
                            alt={video.title}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                aspectRatio: '16/9',
                                objectFit: 'cover',
                                display: 'block',
                                transition: 'transform 0.2s',
                                border: '1px solid #E0E0E0',
                                borderRadius: '12px',
                            }}
                        />
                        <Chip
                            label={video.duration}
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#FFFFFF',
                                fontSize: '12px',
                                fontWeight: 600,
                                height: '22px',
                                borderRadius: '4px',
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                backgroundColor: video.avatarColor || 'primary.main',
                                fontSize: '13px',
                                fontWeight: 600,
                                flexShrink: 0,
                            }}
                        >
                            {video.avatarLetter}
                        </Avatar>
                        
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 0.5,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    lineHeight: 1.4,
                                    color: 'text.primary',
                                }}
                            >
                                {video.title}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    color: 'text.secondary',
                                    mb: 0.2,
                                }}
                            >
                                {video.author}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                }}
                            >
                                {video.views} • {video.uploadTime}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default VideoGrid;