/**
 * Format view count with K/M suffixes or commas
 */
export const formatViewCount = (count: string | number | undefined, useShortFormat: boolean = true): string => {
    if (!count) return '0';

    const num = typeof count === 'string' ? parseInt(count) : count;

    if (useShortFormat) {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
    }

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format numbers with commas (for likes, etc.)
 */
export const formatNumber = (num: string | number | undefined): string => {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format date to display as "X days/months/years ago"
 */
export const formatPublishedDate = (dateString: string | undefined): string => {
    if (!dateString) return '';

    const published = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - published.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Today';
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 365) {
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
};