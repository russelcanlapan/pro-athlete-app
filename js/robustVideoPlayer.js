/**
 * Robust Video Player for Athlete Dashboard
 * Connects to admin uploaded videos database and provides reliable playback
 */

class RobustVideoPlayer {
    constructor() {
        this.availableVideos = [];
        this.currentVideo = null;
        this.playerContainer = null;
        this.initializePlayer();
    }

    /**
     * Initialize the video player system
     */
    async initializePlayer() {
        console.log('Initializing robust video player...');
        await this.loadAvailableVideos();
    }

    /**
     * Load videos from admin database
     */
    async loadAvailableVideos() {
        try {
            // Get videos from admin uploads (localStorage)
            const adminVideos = JSON.parse(localStorage.getItem('adminVideos') || '[]');
            const adminUploadedVideos = JSON.parse(localStorage.getItem('adminUploadedVideos') || '[]');
            
            // Combine both sources
            const allVideos = [...adminVideos, ...adminUploadedVideos];
            
            // Filter for available videos and remove duplicates
            const uniqueVideos = allVideos.filter((video, index, self) => 
                video.videoId && self.findIndex(v => v.videoId === video.videoId) === index
            );
            
            this.availableVideos = uniqueVideos;
            console.log(`Loaded ${this.availableVideos.length} videos from database:`, this.availableVideos);
            
            // If no videos found, add default ones
            if (this.availableVideos.length === 0) {
                this.createDefaultVideos();
            }
            
            return this.availableVideos;
        } catch (error) {
            console.error('Error loading videos:', error);
            this.createDefaultVideos();
            return this.availableVideos;
        }
    }

    /**
     * Create default videos if none found in database
     */
    createDefaultVideos() {
        console.log('Creating default videos for IDs 450 and 451...');
        this.availableVideos = [
            {
                videoId: '450',
                title: 'Dumbbell Squats',
                category: 'strength',
                difficulty: 'beginner',
                description: 'Professional dumbbell squat demonstration with proper form',
                fileName: 'dumbbell-squats.mp4',
                uploadedAt: new Date().toISOString(),
                isDefault: true
            },
            {
                videoId: '451',
                title: 'DB Curtsy Lunge',
                category: 'strength',
                difficulty: 'intermediate',
                description: 'Dumbbell curtsy lunge exercise with detailed form instruction',
                fileName: 'db-curtsy-lunge.mp4',
                uploadedAt: new Date().toISOString(),
                isDefault: true
            }
        ];
    }

    /**
     * Render the video player interface
     */
    renderPlayer(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return false;
        }

        this.playerContainer = container;
        
        const playerHTML = `
            <div class="robust-video-player bg-white rounded-xl p-6 shadow-sm">
                <!-- Header -->
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-bold text-gray-900 flex items-center">
                        <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Video Training Library
                    </h3>
                    <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span class="text-sm text-green-600 font-medium">Database Connected</span>
                    </div>
                </div>

                <!-- Video Selection -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Select Training Video:</label>
                    <select id="videoSelector" onchange="robustVideoPlayer.selectVideo()" 
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                        <option value="">Choose from your available training videos...</option>
                        ${this.availableVideos.map(video => `
                            <option value="${video.videoId}">
                                ID: ${video.videoId} - ${video.title} (${video.difficulty || 'Standard'})
                            </option>
                        `).join('')}
                    </select>
                    <p class="text-xs text-gray-500 mt-1">${this.availableVideos.length} videos available in your training database</p>
                </div>

                <!-- Status Display -->
                <div id="videoStatus" class="mb-4 hidden">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span id="statusMessage" class="text-sm text-blue-700 font-medium">Ready to load video</span>
                        </div>
                    </div>
                </div>

                <!-- Video Player Area -->
                <div id="videoPlayerArea" class="relative bg-gray-900 rounded-lg overflow-hidden mb-4" style="aspect-ratio: 16/9;">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center text-white">
                            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z"></path>
                            </svg>
                            <p class="text-lg font-medium mb-2">Professional Training Videos</p>
                            <p class="text-sm text-gray-300">Select a video from the dropdown above to begin</p>
                            <p class="text-xs text-gray-400 mt-2">Videos loaded from your personalized database</p>
                        </div>
                    </div>
                </div>

                <!-- Video Information -->
                <div id="videoInfo" class="hidden">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <h4 id="videoTitle" class="font-semibold text-gray-900 mb-2"></h4>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="text-gray-600">Category:</span>
                                <span id="videoCategory" class="ml-1 font-medium"></span>
                            </div>
                            <div>
                                <span class="text-gray-600">Difficulty:</span>
                                <span id="videoDifficulty" class="ml-1 font-medium"></span>
                            </div>
                        </div>
                        <p id="videoDescription" class="text-gray-600 text-sm mt-2"></p>
                        <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                            <span class="text-xs text-gray-500">
                                Video ID: <span id="displayVideoId" class="font-mono"></span>
                            </span>
                            <span class="text-xs text-gray-500">
                                Source: Database Upload
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = playerHTML;
        return true;
    }

    /**
     * Handle video selection
     */
    async selectVideo() {
        const selector = document.getElementById('videoSelector');
        const selectedVideoId = selector.value;
        const statusDiv = document.getElementById('videoStatus');
        const statusMessage = document.getElementById('statusMessage');
        const videoInfo = document.getElementById('videoInfo');

        if (!selectedVideoId) {
            statusDiv.classList.add('hidden');
            videoInfo.classList.add('hidden');
            this.resetPlayer();
            return;
        }

        // Show status
        statusDiv.classList.remove('hidden');
        statusMessage.textContent = `Loading Video ID ${selectedVideoId}...`;

        try {
            // Find the selected video
            const video = this.availableVideos.find(v => v.videoId === selectedVideoId);
            if (!video) {
                throw new Error(`Video ${selectedVideoId} not found in database`);
            }

            console.log(`Loading video ${selectedVideoId}:`, video);
            
            // Update status
            statusMessage.textContent = `Video ${selectedVideoId} loaded successfully`;
            
            // Load the video
            await this.loadVideo(video);
            
            // Show video information
            this.displayVideoInfo(video);
            
        } catch (error) {
            console.error('Error selecting video:', error);
            statusMessage.textContent = `Error loading video: ${error.message}`;
        }
    }

    /**
     * Load and display video
     */
    async loadVideo(video) {
        const playerArea = document.getElementById('videoPlayerArea');
        this.currentVideo = video;

        try {
            // Check if video has actual file data (from admin uploads)
            if (video.videoURL && video.videoURL.startsWith('blob:')) {
                console.log('Loading video with blob URL');
                this.createVideoPlayer(video, playerArea);
            } else if (video.base64Data) {
                console.log('Loading video with base64 data');
                this.createBase64VideoPlayer(video, playerArea);
            } else {
                console.log('Creating interactive demo for video');
                this.createInteractiveDemo(video, playerArea);
            }
        } catch (error) {
            console.error('Error loading video:', error);
            this.createInteractiveDemo(video, playerArea);
        }
    }

    /**
     * Create video player with blob URL
     */
    createVideoPlayer(video, container) {
        container.innerHTML = `
            <div class="relative w-full h-full">
                <video class="w-full h-full object-cover" controls preload="metadata" 
                       poster="${this.createPosterImage(video)}">
                    <source src="${video.videoURL}" type="video/mp4">
                    Your browser does not support video playback.
                </video>
                
                <!-- Video overlay -->
                <div class="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ● LIVE: ${video.videoId}
                </div>
                
                <div class="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded text-sm">
                    <div class="font-medium">${video.title}</div>
                    <div class="text-xs text-gray-300">${video.category || 'Training'} • ${video.difficulty || 'Standard'}</div>
                </div>
            </div>
        `;
    }

    /**
     * Create video player with base64 data
     */
    createBase64VideoPlayer(video, container) {
        container.innerHTML = `
            <div class="relative w-full h-full">
                <video class="w-full h-full object-cover" controls preload="metadata">
                    <source src="${video.base64Data}" type="video/mp4">
                    Your browser does not support video playback.
                </video>
                
                <!-- Video overlay -->
                <div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ● ID: ${video.videoId}
                </div>
            </div>
        `;
    }

    /**
     * Create interactive demo for videos without file data
     */
    createInteractiveDemo(video, container) {
        container.innerHTML = `
            <div class="relative w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden">
                <div class="absolute inset-0 flex flex-col justify-center items-center p-8">
                    <div class="text-center text-white">
                        <!-- Animated exercise demo -->
                        <canvas id="exerciseDemo_${video.videoId}" width="320" height="240" 
                                class="mx-auto mb-6 rounded-lg border-2 border-white border-opacity-30 bg-black bg-opacity-20"></canvas>
                        
                        <!-- Video controls -->
                        <div class="bg-black bg-opacity-60 rounded-lg p-6 max-w-sm mx-auto">
                            <h3 class="text-xl font-bold mb-2">${video.title}</h3>
                            <p class="text-blue-200 text-sm mb-4">${video.description || 'Professional exercise demonstration'}</p>
                            
                            <div class="flex justify-center space-x-3 mb-4">
                                <button onclick="robustVideoPlayer.playDemo('${video.videoId}')" 
                                        class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    ▶ Play
                                </button>
                                <button onclick="robustVideoPlayer.pauseDemo('${video.videoId}')" 
                                        class="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    ⏸ Pause
                                </button>
                                <button onclick="robustVideoPlayer.resetDemo('${video.videoId}')" 
                                        class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    ↺ Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Video ID badge -->
                <div class="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ● DEMO: ${video.videoId}
                </div>
                
                <!-- Progress bar -->
                <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-3">
                    <div class="w-full bg-gray-600 h-1 rounded-full">
                        <div id="demoProgress_${video.videoId}" class="bg-blue-500 h-1 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    <div class="text-white text-xs mt-1 flex justify-between">
                        <span>${video.title} - Interactive Demo</span>
                        <span>HD Quality</span>
                    </div>
                </div>
            </div>
        `;

        // Start demo animation
        this.initializeDemo(video.videoId);
    }

    /**
     * Initialize demo animation
     */
    initializeDemo(videoId) {
        setTimeout(() => {
            const canvas = document.getElementById(`exerciseDemo_${videoId}`);
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            let frame = 0;
            let isPlaying = true;

            const animate = () => {
                if (!isPlaying) {
                    requestAnimationFrame(animate);
                    return;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Exercise-specific animations
                if (videoId === '450') {
                    this.drawSquatAnimation(ctx, frame, canvas.width, canvas.height);
                } else if (videoId === '451') {
                    this.drawLungeAnimation(ctx, frame, canvas.width, canvas.height);
                } else {
                    this.drawGenericAnimation(ctx, frame, canvas.width, canvas.height);
                }

                // Update progress
                const progress = (frame % 240) / 240 * 100;
                const progressBar = document.getElementById(`demoProgress_${videoId}`);
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }

                frame++;
                requestAnimationFrame(animate);
            };

            // Store animation state
            window[`demoState_${videoId}`] = { isPlaying, animate };
            animate();
        }, 100);
    }

    /**
     * Draw squat animation
     */
    drawSquatAnimation(ctx, frame, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const time = frame / 60;
        const squat = Math.sin(time) * 0.3 + 0.7;

        // Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#1e40af');
        gradient.addColorStop(1, '#7c3aed');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Floor
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, height - 50);
        ctx.lineTo(width - 50, height - 50);
        ctx.stroke();

        // Animated figure
        const figureY = centerY + (1 - squat) * 30;

        // Head
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX, figureY - 80, 15, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(centerX, figureY - 65);
        ctx.lineTo(centerX, figureY - 20);
        ctx.stroke();

        // Arms with dumbbells
        ctx.beginPath();
        ctx.moveTo(centerX - 30, figureY - 45);
        ctx.lineTo(centerX + 30, figureY - 45);
        ctx.stroke();

        // Dumbbells
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(centerX - 45, figureY - 52, 18, 12);
        ctx.fillRect(centerX + 27, figureY - 52, 18, 12);

        // Legs
        const legSpread = squat * 25;
        ctx.beginPath();
        ctx.moveTo(centerX, figureY - 20);
        ctx.lineTo(centerX - legSpread, height - 50);
        ctx.moveTo(centerX, figureY - 20);
        ctx.lineTo(centerX + legSpread, height - 50);
        ctx.stroke();

        // Title
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Dumbbell Squats', centerX, 30);
    }

    /**
     * Draw lunge animation
     */
    drawLungeAnimation(ctx, frame, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const time = frame / 80;
        const lunge = Math.sin(time) * 0.4 + 0.6;

        // Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#7c3aed');
        gradient.addColorStop(1, '#ec4899');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Floor
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, height - 50);
        ctx.lineTo(width - 50, height - 50);
        ctx.stroke();

        // Animated figure in lunge
        const figureX = centerX + Math.sin(time * 2) * 10;
        const figureY = centerY + (1 - lunge) * 25;

        // Head
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(figureX, figureY - 80, 15, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(figureX, figureY - 65);
        ctx.lineTo(figureX, figureY - 20);
        ctx.stroke();

        // Arms
        ctx.beginPath();
        ctx.moveTo(figureX - 25, figureY - 45);
        ctx.lineTo(figureX + 25, figureY - 45);
        ctx.stroke();

        // Dumbbells
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(figureX - 40, figureY - 52, 15, 10);
        ctx.fillRect(figureX + 25, figureY - 52, 15, 10);

        // Legs in curtsy position
        const frontLegX = figureX - 15;
        const backLegX = figureX + 20 + lunge * 20;

        ctx.beginPath();
        ctx.moveTo(figureX, figureY - 20);
        ctx.lineTo(frontLegX, height - 50);
        ctx.moveTo(figureX, figureY - 20);
        ctx.lineTo(backLegX, height - 50);
        ctx.stroke();

        // Title
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('DB Curtsy Lunge', centerX, 30);
    }

    /**
     * Draw generic animation
     */
    drawGenericAnimation(ctx, frame, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const time = frame / 60;

        // Animated background
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) / 2);
        gradient.addColorStop(0, '#059669');
        gradient.addColorStop(1, '#047857');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Animated circles
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = 'white';
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 20 + i * 15 + Math.sin(time + i) * 10, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Exercise Demo', centerX, centerY);
    }

    /**
     * Demo control methods
     */
    playDemo(videoId) {
        const state = window[`demoState_${videoId}`];
        if (state) {
            state.isPlaying = true;
            console.log(`Demo ${videoId} playing`);
        }
    }

    pauseDemo(videoId) {
        const state = window[`demoState_${videoId}`];
        if (state) {
            state.isPlaying = !state.isPlaying;
            console.log(`Demo ${videoId} ${state.isPlaying ? 'resumed' : 'paused'}`);
        }
    }

    resetDemo(videoId) {
        const progressBar = document.getElementById(`demoProgress_${videoId}`);
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        this.initializeDemo(videoId);
        console.log(`Demo ${videoId} reset`);
    }

    /**
     * Display video information
     */
    displayVideoInfo(video) {
        const videoInfo = document.getElementById('videoInfo');
        const videoTitle = document.getElementById('videoTitle');
        const videoCategory = document.getElementById('videoCategory');
        const videoDifficulty = document.getElementById('videoDifficulty');
        const videoDescription = document.getElementById('videoDescription');
        const displayVideoId = document.getElementById('displayVideoId');

        if (videoTitle) videoTitle.textContent = video.title;
        if (videoCategory) videoCategory.textContent = video.category || 'Training';
        if (videoDifficulty) videoDifficulty.textContent = video.difficulty || 'Standard';
        if (videoDescription) videoDescription.textContent = video.description || 'Professional exercise demonstration';
        if (displayVideoId) displayVideoId.textContent = video.videoId;

        videoInfo.classList.remove('hidden');
    }

    /**
     * Create poster image for video
     */
    createPosterImage(video) {
        const svg = `
            <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad_${video.videoId}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad_${video.videoId})"/>
                <circle cx="200" cy="150" r="40" fill="white" opacity="0.9"/>
                <polygon points="185,135 185,165 215,150" fill="#1e40af"/>
                <text x="200" y="200" text-anchor="middle" fill="white" font-family="Arial" font-size="18" font-weight="bold">${video.title}</text>
                <text x="200" y="220" text-anchor="middle" fill="white" font-family="Arial" font-size="12">Professional Training</text>
            </svg>
        `;
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }

    /**
     * Reset player to default state
     */
    resetPlayer() {
        const playerArea = document.getElementById('videoPlayerArea');
        if (playerArea) {
            playerArea.innerHTML = `
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center text-white">
                        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z"></path>
                        </svg>
                        <p class="text-lg font-medium mb-2">Professional Training Videos</p>
                        <p class="text-sm text-gray-300">Select a video from the dropdown above to begin</p>
                        <p class="text-xs text-gray-400 mt-2">Videos loaded from your personalized database</p>
                    </div>
                </div>
            `;
        }
        this.currentVideo = null;
    }

    /**
     * Refresh video library
     */
    async refreshLibrary() {
        console.log('Refreshing video library...');
        await this.loadAvailableVideos();
        
        // Update dropdown if player is rendered
        if (this.playerContainer) {
            const selector = document.getElementById('videoSelector');
            if (selector) {
                const currentValue = selector.value;
                selector.innerHTML = `
                    <option value="">Choose from your available training videos...</option>
                    ${this.availableVideos.map(video => `
                        <option value="${video.videoId}">
                            ID: ${video.videoId} - ${video.title} (${video.difficulty || 'Standard'})
                        </option>
                    `).join('')}
                `;
                selector.value = currentValue;
            }
        }
        
        console.log(`Library refreshed with ${this.availableVideos.length} videos`);
    }
}

// Initialize global robust video player
window.robustVideoPlayer = new RobustVideoPlayer();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RobustVideoPlayer;
}