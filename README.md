# MeTube

MeTube is a responsive video streaming application built with React, TypeScript, and Material UI that provides a YouTube-like experience for watching, searching, and managing videos by using Youtube API. The application features a responsive design, theme switching capability, and a sleek user interface optimized for both desktop and mobile viewing.

## Technical Stack

- React 18 with TypeScript
- Material UI for component design and theming
- React Router for navigation
- Context API for state management
- YouTube API integration

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- YouTube API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rinekochan/MeTube.git
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your YouTube API key. There's a sample `.env.sample` file you can copy from to have the correct format:
```
VITE_YOUTUBE_API_KEY=...
```
Note: You can obtain a YouTube API key by following the instructions in the [YouTube Data API documentation](https://developers.google.com/youtube/v3/getting-started).

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Project Structure

- `/src`: Source code
    - `/api`: YouTube API integration services
    - `/components`: Reusable UI components
    - `/context`: React context providers for favorites, theme, sidebar
    - `/hooks`: Custom React hooks
    - `/pages`: Main application pages (Home, Search, Video, Favorites)
    - `/styles`: Theme configuration
    - `/types`: TypeScript interfaces and types
    - `/utils`: Utility functions like formatters
