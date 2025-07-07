import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface VideoStatsProps {
    viewCount?: string;
    likeCount?: string;
    publishedAt?: string;
}

const VideoStats = ({ viewCount, likeCount, publishedAt }: VideoStatsProps) => {
    // Format numbers with commas
    const formatNumber = (num: string | number | undefined) => {
        if (!num) return "0";
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Format date to display as "X days/months/years ago"
    const formatPublishedDate = (dateString?: string) => {
        if (!dateString) return "";

        const published = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - published.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 1) return "Today";
        if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
        if (diffDays < 365) {
            const diffMonths = Math.floor(diffDays / 30);
            return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
        }
        return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? "s" : ""} ago`;
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                flexWrap: "wrap",
                gap: 2,
                mb: 3
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <VisibilityIcon sx={{ mr: 1, color: "text.secondary" }} />
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
                    {publishedAt && formatPublishedDate(publishedAt)}
                </Typography>
            </Box>
        </Box>
    );
};

export default VideoStats;