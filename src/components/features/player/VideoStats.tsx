import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { formatNumber, formatPublishedDate } from "../../../utils/formatter.ts";

interface VideoStatsProps {
    viewCount?: string;
    likeCount?: string;
    publishedAt?: string;
}

const VideoStats = ({ viewCount, likeCount, publishedAt }: VideoStatsProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: 2,
                mb: 3
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <VisibilityIcon sx={{ mr: 1, color: "text.secondary"}} />
                <Typography variant="body2" color="text.secondary">
                    {formatNumber(viewCount)} views
                </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThumbUpIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                    {formatNumber(likeCount)} likes
                </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarTodayIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                    {formatPublishedDate(publishedAt)}
                </Typography>
            </Box>
        </Box>
    );
};

export default VideoStats;