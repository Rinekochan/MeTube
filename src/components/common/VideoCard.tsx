import { Box, Card, CardContent, CardMedia, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { VideoResponse } from '../../types/types';
import { formatViewCount, formatPublishedDate } from '../../utils/formatter.ts';

interface VideoCardProps {
    video: VideoResponse;
}

const StyledCard = styled(Card)(({ theme }) => ({
    cursor: 'pointer',
    transition: 'transform 0.2s',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}));

const StyledCardMedia = styled(CardMedia)({
    paddingTop: '56.25%', // 16:9 aspect ratio
});

const VideoCard = ({ video }: VideoCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/video/${video.id}`);
    };

    return (
        <StyledCard onClick={handleClick}>
            <StyledCardMedia
                image={video.thumbnailUrl}
                title={video.title}
            />
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.2em',
                        height: 'auto'
                    }}
                >
                    {video.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.25 }}
                >
                    {video.channelTitle}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {video.viewCount && (
                        <Typography variant="body2" color="text.secondary">
                            {formatViewCount(video.viewCount, false)} views
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                        • {formatPublishedDate(video.publishedAt)}
                    </Typography>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default VideoCard;