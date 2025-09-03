/**
 * Video Management Interface for Admin Panel
 * Integrates with RobustVideoSystem for comprehensive video management
 */

class VideoManager {
    constructor() {
        this.videoSystem = window.videoSystem;
        this.initializeManager();
    }

    async initializeManager() {
        // Wait for video system to be ready
        if (!this.videoSystem.db) {
            await this.videoSystem.initDatabase();
        }
        console.log('Video Manager initialized');
    }

    /**
     * Handle video upload from admin panel
     */
    async handleVideoUpload(formData) {
        const file = formData.get('video');
        if (!file) {
            throw new Error('No video file selected');
        }

        const metadata = {
            videoId: formData.get('videoId'),
            title: formData.get('title'),
            category: formData.get('category'),
            sport: formData.get('sport'),
            difficulty: formData.get('difficulty'),
            description: formData.get('description'),
            bothSide: formData.get('bothSide'),
            online: formData.get('online'),
            freeContent: formData.get('freeContent')
        };

        try {
            // Store video in robust system
            const result = await this.videoSystem.storeVideo(file, metadata);
            console.log('Video uploaded successfully:', result);
            return result;
        } catch (error) {
            console.error('Video upload failed:', error);
            throw error;
        }
    }

    /**
     * Get all uploaded videos for admin display
     */
    async getUploadedVideos() {
        try {
            const videos = await this.videoSystem.getAllVideos();
            return videos.map(video => ({
                id: video.videoId,
                videoId: video.videoId,
                title: video.title,
                category: video.category,
                sport: video.sport,
                difficulty: video.difficulty,
                fileName: video.fileName,
                fileSize: this.formatFileSize(video.fileSize),
                uploadedAt: new Date(video.uploadedAt).toLocaleDateString(),
                ...video
            }));
        } catch (error) {
            console.error('Error getting videos:', error);
            return [];
        }
    }

    /**
     * Delete video from storage
     */
    async deleteVideo(videoId) {
        try {
            await this.videoSystem.deleteVideo(videoId);
            
            // Also remove from legacy storage
            const adminVideos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
            const filtered = adminVideos.filter(v => v.videoId !== videoId);
            localStorage.setItem('adminVideos', JSON.stringify(filtered));
            
            const adminUploadedVideos = JSON.parse(localStorage.getItem('adminUploadedVideos') || '[]');
            const filteredUploaded = adminUploadedVideos.filter(v => v.videoId !== videoId);
            localStorage.setItem('adminUploadedVideos', JSON.stringify(filteredUploaded));
            
            console.log(`Video ${videoId} deleted successfully`);
            return true;
        } catch (error) {
            console.error('Error deleting video:', error);
            throw error;
        }
    }

    /**
     * Preview video in admin panel
     */
    async previewVideo(videoId, container) {
        try {
            const success = await this.videoSystem.createVideoPlayer(videoId, container);
            if (!success) {
                container.innerHTML = `
                    <div class="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center">
                        <div class="text-center text-white">
                            <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <p class="text-sm font-medium">Video Preview</p>
                            <p class="text-xs text-gray-300">ID: ${videoId}</p>
                        </div>
                    </div>
                `;
            }
            return success;
        } catch (error) {
            console.error('Error previewing video:', error);
            return false;
        }
    }

    /**
     * Check video system health
     */
    async checkSystemHealth() {
        try {
            const videos = await this.videoSystem.getAllVideos();
            const totalSize = videos.reduce((sum, video) => sum + (video.fileSize || 0), 0);
            
            return {
                healthy: true,
                videoCount: videos.length,
                totalSize: this.formatFileSize(totalSize),
                supportedFormats: this.videoSystem.supportedFormats,
                maxFileSize: this.formatFileSize(this.videoSystem.maxFileSize)
            };
        } catch (error) {
            console.error('Video system health check failed:', error);
            return {
                healthy: false,
                error: error.message
            };
        }
    }

    /**
     * Format file size for display
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Validate video before upload
     */
    validateVideo(file) {
        return this.videoSystem.validateVideoFile(file);
    }

    /**
     * Get video statistics
     */
    async getVideoStats() {
        try {
            const videos = await this.videoSystem.getAllVideos();
            const stats = {
                total: videos.length,
                byCategory: {},
                bySport: {},
                byDifficulty: {},
                totalSize: 0
            };

            videos.forEach(video => {
                // Count by category
                stats.byCategory[video.category] = (stats.byCategory[video.category] || 0) + 1;
                
                // Count by sport
                stats.bySport[video.sport] = (stats.bySport[video.sport] || 0) + 1;
                
                // Count by difficulty
                stats.byDifficulty[video.difficulty] = (stats.byDifficulty[video.difficulty] || 0) + 1;
                
                // Total size
                stats.totalSize += video.fileSize || 0;
            });

            stats.totalSizeFormatted = this.formatFileSize(stats.totalSize);
            return stats;
        } catch (error) {
            console.error('Error getting video stats:', error);
            return null;
        }
    }
}

// Initialize global video manager
window.videoManager = new VideoManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideoManager;
}