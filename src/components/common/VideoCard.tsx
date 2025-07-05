import {Box, Card, CardContent, CardMedia, Typography, styled} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import type {VideoResponse} from '../../types/types';

interface VideoCardProps {
    video: VideoResponse;
}

const StyledCard = styled(Card)(({theme}) => ({
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

    // Format view count with commas
    const formatViewCount = (count: number) => {
        return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Format date to display as "X days/months/years ago"
    const formatPublishedDate = (dateString: string) => {
        const published = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - published.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 1) return 'Today';
        if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffDays < 365) {
            const diffMonths = Math.floor(diffDays / 30);
            return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
        }
        return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
    };

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
                        height: '2.4em'
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
                            {formatViewCount(parseInt(video.viewCount))} views
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                        • {formatPublishedDate(video.publishedAt)}
                    </Typography>
                </Box>
            </CardContent>
        </StyledCard>
    );
}

export default VideoCard;