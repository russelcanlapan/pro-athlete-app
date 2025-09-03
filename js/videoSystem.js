/**
 * Robust Video Playback System for Pro Athlete Fitness App
 * Handles video storage, streaming, and reliable playback with fallbacks
 */

class RobustVideoSystem {
    constructor() {
        this.db = null;
        this.storeName = 'videoFiles';
        this.dbName = 'ProAthleteVideos';
        this.dbVersion = 1;
        this.supportedFormats = ['video/mp4', 'video/webm', 'video/ogg'];
        this.maxFileSize = 100 * 1024 * 1024; // 100MB limit
        this.initDatabase();
    }

    /**
     * Initialize IndexedDB for persistent video storage
     */
    async initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => {
                console.error('Failed to open IndexedDB');
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                console.log('IndexedDB initialized successfully');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object store for video files
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'videoId' });
                    store.createIndex('title', 'title', { unique: false });
                    store.createIndex('category', 'category', { unique: false });
                    store.createIndex('uploadedAt', 'uploadedAt', { unique: false });
                }
            };
        });
    }

    /**
     * Store video file in IndexedDB with metadata
     */
    async storeVideo(file, metadata) {
        if (!this.db) {
            await this.initDatabase();
        }

        return new Promise((resolve, reject) => {
            // Validate file
            if (!this.validateVideoFile(file)) {
                reject(new Error('Invalid video file'));
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const videoData = {
                    videoId: metadata.videoId,
                    title: metadata.title,
                    category: metadata.category,
                    sport: metadata.sport,
                    difficulty: metadata.difficulty,
                    description: metadata.description,
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                    fileData: reader.result, // ArrayBuffer
                    uploadedAt: new Date().toISOString(),
                    ...metadata
                };

                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.put(videoData);

                request.onsuccess = () => {
                    console.log(`Video ${metadata.videoId} stored successfully`);
                    resolve(videoData);
                };

                request.onerror = () => {
                    console.error('Failed to store video:', request.error);
                    reject(request.error);
                };
            };

            reader.onerror = () => {
                reject(new Error('Failed to read video file'));
            };

            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Retrieve video from IndexedDB
     */
    async getVideo(videoId) {
        if (!this.db) {
            await this.initDatabase();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(videoId);

            request.onsuccess = () => {
                if (request.result) {
                    console.log(`Video ${videoId} retrieved successfully`);
                    resolve(request.result);
                } else {
                    console.log(`Video ${videoId} not found`);
                    resolve(null);
                }
            };

            request.onerror = () => {
                console.error('Failed to retrieve video:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Get all stored videos
     */
    async getAllVideos() {
        if (!this.db) {
            await this.initDatabase();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Create video player with robust streaming
     */
    async createVideoPlayer(videoId, container) {
        try {
            // Try to get video from IndexedDB
            const videoData = await this.getVideo(videoId);
            
            if (videoData && videoData.fileData) {
                return this.createRobustPlayer(videoData, container);
            } else {
                // Fallback to interactive demo
                return this.createInteractiveDemo(videoId, container);
            }
        } catch (error) {
            console.error('Error creating video player:', error);
            return this.createInteractiveDemo(videoId, container);
        }
    }

    /**
     * Create robust video player with multiple fallback mechanisms
     */
    createRobustPlayer(videoData, container) {
        // Create blob URL from stored data
        const blob = new Blob([videoData.fileData], { type: videoData.fileType });
        const blobUrl = URL.createObjectURL(blob);

        const playerHTML = `
            <div class="robust-video-player relative w-full h-full bg-black rounded-lg overflow-hidden">
                <video 
                    id="video_${videoData.videoId}" 
                    class="w-full h-full object-cover" 
                    controls 
                    preload="metadata"
                    poster="${this.createVideoPoster(videoData.title)}"
                >
                    <source src="${blobUrl}" type="${videoData.fileType}">
                    Your browser does not support video playback.
                </video>
                
                <!-- Video overlay info -->
                <div class="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ● ID: ${videoData.videoId}
                </div>
                
                <div class="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded text-sm">
                    <div class="font-medium">${videoData.title}</div>
                    <div class="text-xs text-gray-300">${videoData.category} • ${videoData.difficulty}</div>
                </div>
                
                <!-- Loading indicator -->
                <div id="loading_${videoData.videoId}" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
                    <div class="text-white text-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Loading video...</p>
                    </div>
                </div>
                
                <!-- Error fallback -->
                <div id="error_${videoData.videoId}" class="absolute inset-0 bg-red-900 bg-opacity-50 flex items-center justify-center hidden">
                    <div class="text-white text-center">
                        <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z"/>
                        </svg>
                        <p class="mb-2">Video playback failed</p>
                        <button onclick="videoSystem.retryVideo('${videoData.videoId}')" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = playerHTML;
        
        // Setup video event handlers
        this.setupVideoHandlers(videoData.videoId, blobUrl);
        
        return true;
    }

    /**
     * Setup comprehensive video event handlers
     */
    setupVideoHandlers(videoId, blobUrl) {
        const video = document.getElementById(`video_${videoId}`);
        const loading = document.getElementById(`loading_${videoId}`);
        const error = document.getElementById(`error_${videoId}`);

        if (!video) return;

        // Loading events
        video.addEventListener('loadstart', () => {
            console.log(`Video ${videoId} loading started`);
            loading.classList.remove('hidden');
        });

        video.addEventListener('canplay', () => {
            console.log(`Video ${videoId} can start playing`);
            loading.classList.add('hidden');
        });

        video.addEventListener('loadeddata', () => {
            console.log(`Video ${videoId} data loaded`);
            loading.classList.add('hidden');
        });

        // Error handling with fallback
        video.addEventListener('error', (e) => {
            console.error(`Video ${videoId} error:`, e);
            loading.classList.add('hidden');
            error.classList.remove('hidden');
            
            // Cleanup blob URL
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        });

        // Success handlers
        video.addEventListener('play', () => {
            console.log(`Video ${videoId} started playing`);
        });

        // Cleanup blob URL when video ends or is removed
        video.addEventListener('ended', () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        });
    }

    /**
     * Retry video loading
     */
    async retryVideo(videoId) {
        const container = document.querySelector('.robust-video-player').parentElement;
        await this.createVideoPlayer(videoId, container);
    }

    /**
     * Validate video file before processing
     */
    validateVideoFile(file) {
        // Check file type
        if (!this.supportedFormats.includes(file.type)) {
            console.error('Unsupported video format:', file.type);
            return false;
        }

        // Check file size
        if (file.size > this.maxFileSize) {
            console.error('File too large:', file.size);
            return false;
        }

        return true;
    }

    /**
     * Create video poster image
     */
    createVideoPoster(title) {
        const svg = `
            <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad)"/>
                <circle cx="200" cy="150" r="40" fill="white" opacity="0.9"/>
                <polygon points="185,135 185,165 215,150" fill="#1e40af"/>
                <text x="200" y="200" text-anchor="middle" fill="white" font-family="Arial" font-size="18" font-weight="bold">${title}</text>
                <text x="200" y="220" text-anchor="middle" fill="white" font-family="Arial" font-size="12">Professional Exercise Video</text>
            </svg>
        `;
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }

    /**
     * Create interactive demo as fallback
     */
    createInteractiveDemo(videoId, container) {
        const demoHTML = `
            <div class="interactive-demo relative w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center text-white">
                        <canvas id="demo_canvas_${videoId}" width="320" height="240" class="mx-auto mb-4 rounded-lg border-2 border-white border-opacity-20"></canvas>
                        
                        <div class="bg-black bg-opacity-50 rounded-lg p-4 max-w-sm mx-auto">
                            <h3 class="text-lg font-bold mb-2">Exercise Demo</h3>
                            <p class="text-blue-200 text-sm mb-3">Interactive demonstration for Video ID: ${videoId}</p>
                            
                            <div class="flex justify-center space-x-2">
                                <button onclick="videoSystem.startDemo('${videoId}')" class="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs">
                                    ▶ Play
                                </button>
                                <button onclick="videoSystem.pauseDemo('${videoId}')" class="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-xs">
                                    ⏸ Pause
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ● DEMO ${videoId}
                </div>
            </div>
        `;

        container.innerHTML = demoHTML;
        this.initializeDemo(videoId);
        return false; // Indicates fallback was used
    }

    /**
     * Initialize demo animation
     */
    initializeDemo(videoId) {
        // Simple animation for demo purposes
        const canvas = document.getElementById(`demo_canvas_${videoId}`);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let frame = 0;
            
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Simple exercise animation
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const time = frame / 60;
                
                // Animated figure
                ctx.fillStyle = '#3b82f6';
                ctx.beginPath();
                ctx.arc(centerX, centerY - 30 + Math.sin(time) * 10, 20, 0, Math.PI * 2);
                ctx.fill();
                
                // Exercise text
                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`Exercise Animation`, centerX, centerY + 50);
                
                frame++;
                requestAnimationFrame(animate);
            };
            
            animate();
        }
    }

    /**
     * Demo control methods
     */
    startDemo(videoId) {
        console.log(`Starting demo for video ${videoId}`);
        // Demo is always running, just for user feedback
    }

    pauseDemo(videoId) {
        console.log(`Pausing demo for video ${videoId}`);
        // Demo continues for simplicity
    }

    /**
     * Delete video from storage
     */
    async deleteVideo(videoId) {
        if (!this.db) {
            await this.initDatabase();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(videoId);

            request.onsuccess = () => {
                console.log(`Video ${videoId} deleted successfully`);
                resolve(true);
            };

            request.onerror = () => {
                console.error('Failed to delete video:', request.error);
                reject(request.error);
            };
        });
    }
}

// Initialize global video system
window.videoSystem = new RobustVideoSystem();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RobustVideoSystem;
}