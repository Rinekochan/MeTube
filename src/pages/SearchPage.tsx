import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { searchVideos } from '../api/youtube';
import type { VideoResponse } from '../types/types';
import VideoListItem from '../components/common/VideoListItem';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const [videos, setVideos] = useState<VideoResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSearchResults = async () : Promise<VideoResponse[]> => {
            if (!query.trim()) {
                setVideos([]);
                setLoading(false);
                return [];
            }

            try {
                setLoading(true);
                setError(null);

                const results = await searchVideos({
                    query: query,
                    maxResults: 20
                });

                return results.videos;
            } catch (err) {
                console.error('Error searching videos:', err);
                setError('Failed to search videos. Please try again.');
                return [];
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults().then(results => setVideos(results));
    }, [query]);

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (!query.trim()) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Enter a search term to find videos
                </Typography>
            </Box>
        );
    }

    if (videos.length === 0) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No videos found for "{query}"
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Search results for "{query}"
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {videos.map((video) => (
                    <VideoListItem key={video.id} video={video} />
                ))}
            </Box>
        </Box>
    );
};

export default SearchPage;