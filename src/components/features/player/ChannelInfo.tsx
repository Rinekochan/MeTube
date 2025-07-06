import { Avatar, Box, Typography } from "@mui/material";

interface ChannelInfoProps {
    channelTitle: string;
    subscriberCount?: string;
    thumbnailUrl?: string;
}

const ChannelInfo = ({ channelTitle, subscriberCount, thumbnailUrl }: ChannelInfoProps) => {
    // Format numbers with commas
    const formatNumber = (num: string | number | undefined) => {
        if (!num) return "0";
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
                src={thumbnailUrl}
                alt={channelTitle}
                sx={{ width: 48, height: 48 }}
            />
            <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {channelTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {formatNumber(subscriberCount)} subscribers
                </Typography>
            </Box>
        </Box>
    );
};

export default ChannelInfo;