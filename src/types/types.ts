// Type for Video API Response
export interface VideoResponse {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    channelTitle: string;
    publishedAt: string;
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



