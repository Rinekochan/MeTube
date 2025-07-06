// Type for Video API Response
export interface VideoResponse {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    viewCount?: string;
    likeCount?: string;
}

// Type for Channel API Response
export interface ChannelResponse {
    thumbnailUrl: string;
    subscriberCount: string;
}

// Type for Search Results
export interface SearchResults {
    videos: VideoResponse[];
    nextPageToken?: string;
}

export interface SearchParams {
    query: string;
    pageToken?: string;
    maxResults?: number;
}



