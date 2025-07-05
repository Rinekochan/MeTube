import {useEffect, useState} from "react";
import {getPopularVideos, getPopularVideosByCategory} from "../api/youtube.ts";
import type {VideoResponse} from "../types/types.ts";
import {Box, Grid, Typography, CircularProgress} from "@mui/material";
import VideoCard from "../components/common/VideoCard.tsx";

const CATEGORIES = {
    NEWS: '25',
    GAMING: '20',
    MUSIC: '10'
};

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [popularVideos, setPopularVideos] = useState<VideoResponse[]>([]);
    const [newsVideos, setNewsVideos] = useState<VideoResponse[]>([]);
    const [gamingVideos, setGamingVideos] = useState<VideoResponse[]>([]);
    const [musicVideos, setMusicVideos] = useState<VideoResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Function to shuffle an array and return first n elements
    // Basically we will take 30 videos, and then select 8 videos randomly so it won't be static
    const getRandomItems = (array: VideoResponse[], count: number): VideoResponse[] => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);

                // Fetch all video categories in parallel
                let [popular, news, gaming, music] = await Promise.all([
                    getPopularVideos(20),
                    getPopularVideosByCategory(CATEGORIES.NEWS, 20),
                    getPopularVideosByCategory(CATEGORIES.GAMING, 20),
                    getPopularVideosByCategory(CATEGORIES.MUSIC, 20)
                ]);

                // Filter news videos to only show those within the last 3 days
                const threeDaysAgo = new Date();
                threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

                let recentNewsVideos = news.filter(video => {
                    const publishedDate = new Date(video.publishedAt);
                    return publishedDate >= threeDaysAgo;
                });

                popular = getRandomItems(popular, 8);
                recentNewsVideos = getRandomItems(recentNewsVideos, 5);
                gaming = getRandomItems(gaming, 8);
                music = getRandomItems(music, 8);

                return { popular, recentNewsVideos, gaming, music };
            } catch (err) {
                setError('Failed to load videos. Please make sure your API key is configured correctly.');
                return { popular: [], recentNewsVideos: [], gaming: [], music: [] };
            } finally {
                setLoading(false);
            }
        };

        fetchVideos().then((data) => {
            const { popular, recentNewsVideos, gaming, music } = data;
            setPopularVideos(popular);
            setNewsVideos(recentNewsVideos);
            setGamingVideos(gaming);
            setMusicVideos(music);
        });
    }, []);

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    // Function to render a video section
    const renderVideoSection = (title: string, videos: VideoResponse[]) => {
        if (!videos.length) return null;

        return (
            <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', ml: 2 }}>
                    {title}
                </Typography>
                <Grid container spacing={2}>
                    {videos.map((video) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }} key={video.id}>
                            <VideoCard video={video} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };

    if (error) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="error" variant="h6">There're no videos at the moment</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {renderVideoSection('Popular Videos', popularVideos)}
            {renderVideoSection('Popular News', newsVideos)}
            {renderVideoSection('Gaming', gamingVideos)}
            {renderVideoSection('Music', musicVideos)}
        </Box>
    );
};

export default HomePage;