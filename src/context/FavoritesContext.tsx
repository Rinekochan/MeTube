import React, { createContext, type ReactNode, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import type { VideoResponse } from '../types/types';

interface FavoritesContextType {
    favorites: VideoResponse[];
    isVideoFavorite: (videoId: string) => boolean;
    addToFavorites: (video: VideoResponse) => void;
    removeFromFavorites: (videoId: string) => void;
    toggleFavorite: (video: VideoResponse) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const favoritesUtils = useFavorites();

    return (
        <FavoritesContext.Provider value={favoritesUtils}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavoritesContext = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavoritesContext must be used within a FavoritesProvider');
    }
    return context;
};

