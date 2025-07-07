import { Box, Typography } from '@mui/material';
import { useFavoritesContext } from '../context/FavoritesContext';
import VideoListItem from '../components/common/VideoListItem';
import StarIcon from '@mui/icons-material/Star';

const FavoritesPage = () => {
    const { favorites } = useFavoritesContext();

    if (favorites.length === 0) {
        return (
            <Box sx={{
                p: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh'
            }}>
                <StarIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
                    No favorites yet
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Start adding videos to your favorites to see them here
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <StarIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Favorites
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
                    ({favorites.length} video{favorites.length !== 1 ? 's' : ''})
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {favorites.map((video) => (
                    <VideoListItem key={video.id} video={video} />
                ))}
            </Box>
        </Box>
    );
};

export default FavoritesPage;