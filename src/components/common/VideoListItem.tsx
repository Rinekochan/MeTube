import { Box, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { VideoResponse } from '../../types/types';
import { formatViewCount, formatPublishedDate } from '../../utils/formatter.ts';

interface VideoListItemProps {
    video: VideoResponse;
}

const ListItemContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '16px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.05)',
    },
}));

const ThumbnailContainer = styled(Box)(({ theme }) => ({
    flexShrink: 0,
    width: '320px',
    height: '180px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
}));

const ThumbnailImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const ContentContainer = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: '8px',
});

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
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.3em',
                        color: 'text.primary'
                    }}
                >
                    {video.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
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