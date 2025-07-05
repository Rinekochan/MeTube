import {useEffect, useState} from "react";
import {getPopularVideos} from "../api/youtube.ts";
import type {VideoResponse} from "../types/types.ts";
import {Box, Grid, Typography} from "@mui/material";
import VideoCard from "../components/common/VideoCard.tsx";

const HomePage = () => {
    const [popularVideos, setPopularVideos] = useState<VideoResponse[]>([]);

    useEffect(()=> {
        const fetchVideos : () => Promise<VideoResponse[]> = async () : Promise<VideoResponse[]>  => {
            try {
                return await getPopularVideos(6);
            } catch (error) {
                console.error("Failed to fetch popular videos:", error);
                return [];
            }
        };
        fetchVideos().then(videos => setPopularVideos(videos));
    }, []);

    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', ml: 2 }}>
                What's are people watching right now?
            </Typography>
            <Grid container spacing={3}>
                {popularVideos.map((video) => (
                    <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 2 }}>
                        <VideoCard video={video} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HomePage;