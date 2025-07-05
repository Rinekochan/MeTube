import axios from 'axios';
import type {SearchParams, SearchResults, VideoResponse} from "../types/types.ts";

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
                part: 'snippet, statistics',
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
                part: 'snippet, statistics',
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
            thumbnail: item.snippet.thumbnails.default.url,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount
        }))
    } catch (err) {
        console.error('Error fetching popular YouTube videos by category:', err);
        throw new Error('Failed to fetch popular YouTube videos by category');
    }
}

