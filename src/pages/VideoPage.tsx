import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getVideoDetails, getChannelDetails} from "../api/youtube";
import type {VideoResponse, ChannelResponse} from "../types/types.ts";
import {Box, Typography} from "@mui/material";

import VideoPlayer from "../components/features/player/VideoPlayer";
import ChannelInfo from "../components/features/player/ChannelInfo";
import VideoStats from "../components/features/player/VideoStats";
import FavoritesButton from "../components/features/favourites/FavoritesButton";
import VideoPageSkeleton from "../components/features/player/VideoPageSkeleton";

const VideoPage = () => {
    const {id} = useParams<{ id: string }>();
    const [video, setVideo] = useState<VideoResponse | null>(null);
    const [channelDetails, setChannelDetails] = useState<ChannelResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            if (!id) return;

            try {
                setLoading(true);

                const videoData = await getVideoDetails(id);
                const channelData = await getChannelDetails(videoData.channelId);
                return {videoData, channelData};
            } catch (err) {
                console.error("Error fetching video:", err);
                setError("Failed to load video. Please try again later.");
                return {videoData: null, channelData: null};
            } finally {
                setLoading(false);
            }
        };

        fetchVideoData().then(({videoData, channelData}) => {
            if (videoData) {
                setVideo(videoData);
            }
            if (channelData) {
                setChannelDetails(channelData);
            }
        });

    }, [id]);

    // Display the skeleton while loading
    if (loading) {
        return <VideoPageSkeleton />;
    }

    if (error || !video) {
        return (
            <Box sx={{textAlign: "center", py: 4}}>
                <Typography variant="h5" color="error">
                    {error || "Video not found"}
                </Typography>
            </Box>
        );
    }

    return (
    <Box sx={{my: 4, mx: 18}}>
        {/* Video Player */}
        <VideoPlayer videoId={video.id} title={video.title} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6, p: 2 }}>
            <Box sx={{ flex: 1 }}>
                {/* Channel Info */}
                <Box sx={{ mb: 3 }}>
                    <ChannelInfo
                        channelTitle={video.channelTitle}
                        subscriberCount={channelDetails?.subscriberCount}
                        thumbnailUrl={channelDetails?.thumbnailUrl}
                    />
                </Box>

                {/* Video Title */}
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    {video.title}
                </Typography>

                {/* Video Description */}
                <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 4, color: "text.secondary" }}>
                    {video.description}
                </Typography>
            </Box>

            <Box sx={{ minWidth: "200px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Box sx={{ mb: 3 }}>
                    <FavoritesButton video={video} />
                </Box>

                {/* Video Stats */}
                <VideoStats
                    viewCount={video.viewCount}
                    likeCount={video.likeCount}
                    publishedAt={video.publishedAt}
                />
            </Box>
        </Box>
    </Box>
    );
};

export default VideoPage;
