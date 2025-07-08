import { Box, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { VideoResponse } from '../../types/types';
import { formatViewCount, formatPublishedDate } from '../../utils/formatter';

interface VideoListItemProps {
    video: VideoResponse;
}

const ListItemContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.05)',
    },
    // Desktop layout
    [theme.breakpoints.up('md')]: {
        gap: '16px',
        padding: '8px',
        flexDirection: 'row',
    },
    // Mobile layout
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
    },
}));

const ThumbnailContainer = styled(Box)(({ theme }) => ({
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    // Desktop layout
    [theme.breakpoints.up('md')]: {
        flexShrink: 0,
        width: '320px',
        height: '180px',
    },
    // Mobile layout
    [theme.breakpoints.down('md')]: {
        width: '100%',
        aspectRatio: '16/9',
    },
}));

const ThumbnailImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const ContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // Desktop layout
    [theme.breakpoints.up('md')]: {
        flex: 1,
        paddingTop: '8px',
    },
    // Mobile layout
    [theme.breakpoints.down('md')]: {
        gap: '4px',
    },
}));

const VideoListItem = ({ video }: VideoListItemProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/video/${video.id}`);
    };

    return (
        <ListItemContainer onClick={handleClick}>
            <ThumbnailContainer>
                <ThumbnailImage
                    src={video.thumbnailUrl}
                    alt={video.title}
                    loading="lazy"
                />
            </ThumbnailContainer>

            <ContentContainer>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.3em',
                        color: 'text.primary',
                        mb: { xs: 0.5, md: 1 },
                        fontSize: { xs: '1rem', md: '1.25rem' }
                    }}
                >
                    {video.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: { xs: 0.25, md: 0.5 } }}
                >
                    {video.channelTitle}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {video.viewCount && (
                        <Typography variant="body2" color="text.secondary">
                            {formatViewCount(video.viewCount)} views
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                        • {formatPublishedDate(video.publishedAt)}
                    </Typography>
                </Box>
            </ContentContainer>
        </ListItemContainer>
    );
};

export default VideoListItem;