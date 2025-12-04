import { 
    Box, 
    Typography, 
    Avatar, 
    IconButton, 
    Button, 
    TextField,
    useTheme
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState } from 'react';

interface Comment {
    id: number;
    author: string;
    avatar: string;
    timeAgo: string;
    content: string;
    likes: number;
    userLiked?: boolean;
    userDisliked?: boolean;
}

interface CommentsProps {
    comments: Comment[];
    totalComments: number;
    currentUserAvatar?: string;
    onAddComment?: (content: string) => void;
    onLike?: (commentId: number) => void;
    onDislike?: (commentId: number) => void;
    onReply?: (commentId: number) => void;
}

export const ComentariosMultimedia: React.FC<CommentsProps> = ({
    comments,
    totalComments,
    currentUserAvatar = 'TÚ',
    onAddComment,
    onLike,
    onDislike,
    onReply,
}) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmitComment = () => {
        if (newComment.trim() && onAddComment) {
            onAddComment(newComment);
            setNewComment('');
        }
    };

    return (
        <Box sx={{ maxWidth: '100%', padding: 2 }}>
            {/* Header */}
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                {totalComments} comentarios
            </Typography>

            {/* Add Comment Box */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar
                    sx={{
                        backgroundColor: 'primary.main',
                        width: 40,
                        height: 40,
                        fontSize: '14px',
                        fontWeight: 600,
                    }}
                >
                    {currentUserAvatar}
                </Avatar>
                <TextField
                    fullWidth
                    placeholder="Añade un comentario..."
                    variant="standard"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    multiline
                    maxRows={4}
                    rows={2}
                    sx={{
                        '& .MuiInput-root': {
                            fontSize: '14px',
                            backgroundColor: '#F5F5F5',
                            padding: '12px 16px',
                        },
                    }}
                />
            </Box>

            {/* Comments List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        onLike={() => onLike?.(comment.id)}
                        onDislike={() => onDislike?.(comment.id)}
                        onReply={() => onReply?.(comment.id)}
                    />
                ))}
            </Box>
        </Box>
    );
};

interface CommentItemProps {
    comment: Comment;
    onLike: () => void;
    onDislike: () => void;
    onReply: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    onLike,
    onDislike,
    onReply,
}) => {
    const theme = useTheme();
    const [liked, setLiked] = useState(comment.userLiked || false);
    const [disliked, setDisliked] = useState(comment.userDisliked || false);
    const [likes, setLikes] = useState(comment.likes);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        } else {
            if (disliked) {
                setDisliked(false);
            }
            setLikes(likes + 1);
            setLiked(true);
        }
        onLike();
    };

    const handleDislike = () => {
        if (disliked) {
            setDisliked(false);
        } else {
            if (liked) {
                setLikes(likes - 1);
                setLiked(false);
            }
            setDisliked(true);
        }
        onDislike();
    };

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Avatar */}
            <Avatar
                sx={{
                    backgroundColor: '#E0E0E0',
                    color: 'text.primary',
                    width: 40,
                    height: 40,
                    fontSize: '16px',
                    fontWeight: 600,
                    flexShrink: 0,
                }}
            >
                {comment.avatar}
            </Avatar>

            {/* Comment Content */}
            <Box sx={{ flex: 1 }}>
                {/* Author and Time */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, fontSize: '13px' }}
                    >
                        {comment.author}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: `${theme.palette.primary.light}`, fontSize: '12px' }}
                    >
                        {comment.timeAgo}
                    </Typography>
                </Box>

                {/* Comment Text */}
                <Typography
                    variant="body2"
                    sx={{ mb: 1, fontSize: '14px', lineHeight: 1.5 }}
                >
                    {comment.content}
                </Typography>

                {/* Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Like Button */}
                    <IconButton
                        size="small"
                        onClick={handleLike}
                        sx={{ padding: '4px' }}
                    >
                        {liked ? (
                            <ThumbUpIcon sx={{ fontSize: 16 }} />
                        ) : (
                            <ThumbUpOutlinedIcon sx={{ fontSize: 16 }} />
                        )}
                    </IconButton>

                    {/* Likes Count */}
                    <Typography
                        variant="caption"
                        sx={{ fontSize: '13px', fontWeight: 500, minWidth: '16px' }}
                    >
                        {likes}
                    </Typography>

                    {/* Dislike Button */}
                    <IconButton
                        size="small"
                        onClick={handleDislike}
                        sx={{ padding: '4px' }}
                    >
                        {disliked ? (
                            <ThumbDownIcon sx={{ fontSize: 16 }} />
                        ) : (
                            <ThumbDownOutlinedIcon sx={{ fontSize: 16 }} />
                        )}
                    </IconButton>

                    {/* Reply Button */}
                    <Button
                        size="small"
                        onClick={onReply}
                        sx={{
                            textTransform: 'none',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: 'text.primary',
                            minWidth: 'auto',
                            padding: '4px 8px',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        Responder
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};