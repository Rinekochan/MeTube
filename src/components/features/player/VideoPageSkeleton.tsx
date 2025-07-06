import { Box, Skeleton } from "@mui/material";

const VideoPageSkeleton = () => {
    return (
        <Box>
            <Skeleton variant="rectangular" width="100%" height={500} />
            <Box sx={{ mt: 2 }}>
                <Skeleton variant="text" height={60} width="70%" />
                <Box sx={{ display: "flex", mt: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box sx={{ ml: 2 }}>
                        <Skeleton variant="text" width={120} />
                        <Skeleton variant="text" width={80} />
                    </Box>
                </Box>
                <Skeleton variant="text" height={120} sx={{ mt: 2 }} />
            </Box>
        </Box>
    );
};

export default VideoPageSkeleton;