import { Typography } from "@mui/material";

interface VideoDescriptionProps {
    description: string;
}

const VideoDescription = ({ description }: VideoDescriptionProps) => {
    return (
        <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 4 }}>
            {description}
        </Typography>
    );
};

export default VideoDescription;