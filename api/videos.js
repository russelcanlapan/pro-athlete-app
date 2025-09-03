// Simple video serving endpoint for the Pro Athlete app
// This would be implemented as a proper backend API in production

// For demo purposes, we'll create a simple video serving solution
// that can handle the stored video files

class VideoServer {
    constructor() {
        this.videos = new Map();
        this.loadStoredVideos();
    }

    loadStoredVideos() {
        // Load videos from localStorage if available
        try {
            const adminVideos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
            adminVideos.forEach(video => {
                if (video.videoId && video.videoURL) {
                    this.videos.set(video.videoId, video);
                }
            });
        } catch (e) {
            console.error('Error loading stored videos:', e);
        }
    }

    getVideo(videoId) {
        return this.videos.get(videoId);
    }

    // Serve video by ID
    serveVideo(videoId) {
        const video = this.getVideo(videoId);
        if (video && video.videoURL) {
            return video.videoURL;
        }
        return null;
    }
}

// Create global video server instance
window.videoServer = new VideoServer();

// API endpoint simulation
window.apiVideos = {
    get: function(videoId, filename) {
        const video = window.videoServer.serveVideo(videoId);
        if (video) {
            console.log(`Serving video ${videoId}/${filename}:`, video);
            return video;
        }
        console.log(`Video ${videoId}/${filename} not found`);
        return null;
    }
};