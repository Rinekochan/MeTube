import { Box, useTheme } from "@mui/material";

interface VideoPlayerProps {
    videoId: string;
    title: string;
}

const VideoPlayer = ({ videoId, title }: VideoPlayerProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                paddingBottom: "56.25%", // 16:9 aspect ratio
                height: 0,
                overflow: "hidden",
                borderRadius: "8px",
                backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#e0e0e0", // Fall-off Background color for the player
                mb: 2
            }}
        >
            <iframe
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none"
                }}
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </Box>
    );
};

export default VideoPlayer;