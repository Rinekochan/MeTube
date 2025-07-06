import axios from 'axios';
import type {ChannelResponse, SearchParams, SearchResults, VideoResponse} from "../types/types.ts";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Create an axios instance for Youtube API requests
const youtubeApi = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    },
});

// Search Youtube videos by query
export const searchVideos = async (
    params: SearchParams
): Promise<SearchResults> => {
    try {
        const response = await youtubeApi.get('/search', {
            params: {
                part: 'snippet',
                q: params.query,
                maxResults: params.maxResults || 10,
                pageToken: params.pageToken,
                type: 'video'
            }
        });

        return {
            videos: response.data.items.map((item: any) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.standard.url,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt
            })),
            nextPageToken: response.data.nextPageToken
        };
    } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        throw new Error('Failed to fetch YouTube videos');
    }
}

// Get popular videos to fill up the home page
export const getPopularVideos = async (
    maxResults: number = 6
): Promise<VideoResponse[]> => {
    try {
        const response = await youtubeApi.get('/videos', {
            params: {
                part: 'snippet,statistics',
                chart: 'mostPopular',
                maxResults: maxResults,
                regionCode: 'AU', // Australia
            }
        });

        return response.data.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.standard.url,
            channelTitle: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            publishedAt: item.snippet.publishedAt,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount
        }))
    } catch (err) {
        console.error('Error fetching trending YouTube videos:', err);
        throw new Error('Failed to fetch trending YouTube videos');
    }
}

// Get popular videos by category to fill up the home page
export const getPopularVideosByCategory = async (
    categoryId: string = '',
    maxResults: number = 6
): Promise<VideoResponse[]> => {
    try {
        const response = await youtubeApi.get('/videos', {
            params: {
                part: 'snippet,statistics',
                chart: 'mostPopular',
                maxResults: maxResults,
                regionCode: 'AU', // Australia
                videoCategoryId: categoryId
            }
        });

        return response.data.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.standard.url,
            channelTitle: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            publishedAt: item.snippet.publishedAt,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount
        }))
    } catch (err) {
        console.error('Error fetching popular YouTube videos by category:', err);
        throw new Error('Failed to fetch popular YouTube videos by category');
    }
}

// Get single video details by ID
export const getVideoDetails = async (
    videoId: string
): Promise<VideoResponse> => {
    try {
        const response = await youtubeApi.get('/videos', {
            params: {
                part: 'snippet,statistics',
                id: videoId
            }
        });

        if (response.data.items.length === 0) {
            throw new Error('Video not found');
        }

        const item = response.data.items[0];

        return {
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.standard.url,
            channelTitle: item.snippet.channelTitle,
            channelId: item.snippet.channelId,
            publishedAt: item.snippet.publishedAt,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount
        };
    } catch (err) {
        console.error('Error fetching YouTube video details:', err);
        throw new Error('Failed to fetch YouTube video details');
    }
}

// Get channel details by ID
export const getChannelDetails = async (
    channelId: string
): Promise<ChannelResponse> => {
    try {
        const response = await youtubeApi.get('/channels', {
            params: {
                part: 'snippet,statistics',
                id: channelId
            }
        });

        if (!response.data.items || response.data.items.length === 0) {
            throw new Error('Channel not found');
        }

        const item = response.data.items[0];
        return {
            thumbnailUrl: item.snippet.thumbnails.standard.url,
            subscriberCount: item.statistics.subscriberCount
        };
    } catch (err) {
        console.error('Error fetching channel details:', err);
        throw new Error('Failed to fetch channel details');
    }
}


