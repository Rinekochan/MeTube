import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideoDetails, getChannelDetails } from "../api/youtube";
import type { VideoResponse, ChannelResponse } from "../types/types.ts";
import { Box, Typography } from "@mui/material";
import VideoPlayer from "../components/features/player/VideoPlayer";
import ChannelInfo from "../components/features/player/ChannelInfo";
import VideoStats from "../components/features/player/VideoStats";
import FavoritesButton from "../components/features/favourites/FavoritesButton";
import VideoPageSkeleton from "../components/features/player/VideoPageSkeleton";

const VideoPage = () => {
    const { id } = useParams<{ id: string }>();
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
                return { videoData, channelData };
            } catch (err) {
                console.error("Error fetching video:", err);
                setError("Failed to load video. Please try again later.");
                return { videoData: null, channelData: null };
            } finally {
                setLoading(false);
            }
        };

        fetchVideoData().then(({ videoData, channelData }) => {
            if (videoData) {
                setVideo(videoData);
            }
            if (channelData) {
                setChannelDetails(channelData);
            }
        });
    }, [id]);

    if (loading) {
        return <VideoPageSkeleton />;
    }

    if (error || !video) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h5" color="error">
                    {error || "Video not found"}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            my: 2,
            mx: { sm: 0, md: 18 }
        }}>
            {/* Video Player */}
            <VideoPlayer videoId={video.id} title={video.title} />

            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: { xs: 2, md: 6 },
                p: { xs: 0, md: 2 }
            }}>
                <Box sx={{ flex: 1, width: "100%" }}>
                    {/* Video Title */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            mb: { xs: 2, md: 3 },
                            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                        }}
                    >
                        {video.title}
                    </Typography>

                    {/* Video Stats - Mobile */}
                    <Box sx={{
                        display: { xs: "block", lg: "none" },
                        mb: 2
                    }}>
                        <VideoStats
                            viewCount={video.viewCount}
                            likeCount={video.likeCount}
                            publishedAt={video.publishedAt}
                        />
                    </Box>

                    {/* Channel Info */}
                    <Box sx={{ mb: { xs: 2, md: 3 } }}>
                        <ChannelInfo
                            channelTitle={video.channelTitle}
                            subscriberCount={channelDetails?.subscriberCount}
                            thumbnailUrl={channelDetails?.thumbnailUrl}
                        />
                    </Box>

                    {/* Favorites Button - Mobile */}
                    <Box sx={{
                        display: { xs: "block", lg: "none" },
                        mb: 3
                    }}>
                        <FavoritesButton video={video} />
                    </Box>

                    {/* Video Description */}
                    <Typography
                        variant="body1"
                        sx={{
                            whiteSpace: "pre-line",
                            mb: 4,
                            color: "text.secondary",
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            lineHeight: { xs: 1.5, md: 1.6 }
                        }}
                    >
                        {video.description}
                    </Typography>
                </Box>

                {/* Desktop Sidebar */}
                <Box sx={{
                    minWidth: "200px",
                    display: { xs: "none", lg: "flex" },
                    flexDirection: "column",
                    alignItems: "flex-start"
                }}>
                    <Box sx={{ mb: 3 }}>
                        <FavoritesButton video={video} />
                    </Box>

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
