import { useState, useEffect } from 'react';
import { Button, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {useFavoritesContext} from "../../../context/FavoritesContext.tsx";
import type { VideoResponse } from '../../../types/types';

interface FavoritesButtonProps {
    video: VideoResponse;
}

const FavoritesButton = ({ video }: FavoritesButtonProps) => {
    const theme = useTheme();
    const { isVideoFavorite, toggleFavorite } = useFavoritesContext();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(isVideoFavorite(video.id));
    }, [video.id, isVideoFavorite]);

    const handleToggleFavorite = () => {
        const newStatus = toggleFavorite(video);
        setIsFavorite(newStatus);
    };

    return (
        <Button
            variant="contained"
            startIcon={<StarIcon />}
            onClick={handleToggleFavorite}
            sx={{
                backgroundColor: isFavorite ? theme.palette.background.opposite : theme.palette.background.paper,
                color: isFavorite ? theme.palette.text.opposite : theme.palette.text.secondary,
                '&:hover': {
                    backgroundColor: isFavorite
                        ? theme.palette.mode === 'dark' ? '#bdbdbd' : '#ababab'
                        : theme.palette.mode === 'dark' ? '#3C3B45' : '#C9C9C9'
                }
            }}
        >
            {isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
        </Button>
    );
};

export default FavoritesButton;