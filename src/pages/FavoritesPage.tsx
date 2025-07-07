import { useState } from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import { useFavoritesContext } from '../context/FavoritesContext';
import VideoListItem from '../components/common/VideoListItem';
import StarIcon from '@mui/icons-material/Star';

const FavoritesPage = () => {
    const { favorites } = useFavoritesContext();
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 7;

    // Calculate pagination
    const totalPages = Math.ceil(favorites.length / videosPerPage);
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const currentVideos = favorites.slice(startIndex, endIndex);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        // Scroll to top when changing pages
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                {currentVideos.map((video) => (
                    <VideoListItem key={video.id} video={video} />
                ))}
            </Box>

            {totalPages > 1 && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 4,
                    mb: 2
                }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'text.primary',
                                backgroundColor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                                '&:hover': {
                                    backgroundColor: 'background.opposite',
                                    color: 'text.opposite',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'text.active',
                                    color: 'background.default',
                                    borderColor: 'text.active',
                                    '&:hover': {
                                        backgroundColor: 'text.active',
                                        opacity: 0.8,
                                    },
                                },
                                '&.MuiPaginationItem-ellipsis': {
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                },
                            },
                            '& .MuiPaginationItem-icon': {
                                color: 'inherit',
                            },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default FavoritesPage;