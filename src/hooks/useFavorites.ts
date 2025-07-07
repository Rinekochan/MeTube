import { useState, useEffect } from 'react';
import type { VideoResponse } from '../types/types';

const FAVORITES_STORAGE_KEY = 'metube_favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<VideoResponse[]>([]);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites));
            } catch (e) {
                console.error('Error parsing favorites from localStorage', e);
                localStorage.removeItem(FAVORITES_STORAGE_KEY);
            }
        }
    }, []);

    // Check if a video is in favorites
    const isVideoFavorite = (videoId: string): boolean => {
        return favorites.some(fav => fav.id === videoId);
    };

    // Add a video to favorites
    const addToFavorites = (video: VideoResponse) => {
        const updatedFavorites = [...favorites, video];
        setFavorites(updatedFavorites);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    };

    // Remove a video from favorites
    const removeFromFavorites = (videoId: string) => {
        const updatedFavorites = favorites.filter(video => video.id !== videoId);
        setFavorites(updatedFavorites);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    };

    // Toggle favorite status
    const toggleFavorite = (video: VideoResponse) => {
        if (isVideoFavorite(video.id)) {
            removeFromFavorites(video.id);
            return false;
        } else {
            addToFavorites(video);
            return true;
        }
    };

    return {
        favorites,
        isVideoFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite
    };
};