import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getVideoDetails, getChannelDetails} from "../api/youtube";
import type {VideoResponse, ChannelResponse} from "..types/types";
import {Box, Typography, Divider} from "@mui/material";

import VideoPlayer from "../components/features/player/VideoPlayer";
import ChannelInfo from "../components/features/player/ChannelInfo";
import VideoStats from "../components/features/player/VideoStats";
import VideoDescription from "../components/features/player/VideoDescription";
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
        <Box>
            {/* Video Player */}
            <VideoPlayer videoId={video.id} title={video.title}/>

            {/* Video Title */}
            <Typography variant="h5" sx={{fontWeight: "bold", mb: 2}}>
                {video.title}
            </Typography>

            {/* Channel Info */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >
                <ChannelInfo
                    channelTitle={video.channelTitle}
                    subscriberCount={channelDetails?.subscriberCount}
                    thumbnailUrl={channelDetails?.thumbnailUrl}
                />
            </Box>

            <Divider sx={{my: 2}}/>

            {/* Video Stats */}
            <VideoStats
                viewCount={video.viewCount}
                likeCount={video.likeCount}
                publishedAt={video.publishedAt}
            />

            {/* Video Description */}
            <VideoDescription description={video.description}/>
        </Box>
    );
};

export default VideoPage;
