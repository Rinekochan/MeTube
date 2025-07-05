import axios from 'axios';
import type {SearchResults} from "../types/types.ts";

const API_KEY = import.meta.env.YOUTUBE_API_KEY;
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
    query: string,
    maxResults: number = 10,
    pageToken?: string
): Promise<SearchResults> => {
    try {
        const response = await youtubeApi.get('/search', {
            params: {
                part: 'snippet',
                q: query,
                maxResults,
                pageToken,
                type: 'video'
            }
        });

        return {
            videos: response.data.items.map((item: any) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.default.url,
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

