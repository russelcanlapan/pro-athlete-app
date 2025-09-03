// Session Storage Management for Athlete App
// This file provides centralized session storage functionality

// Default user data structure
const DEFAULT_USER_DATA = {
    profile: {
        firstName: 'Scarlett',
        lastName: 'Zhang',
        initials: 'SZ',
        sport: 'Women\'s Basketball',
        role: 'Athlete',
        verified: true,
        joinDate: '2024-01-15'
    },
    metrics: {
        height: 165,
        weight: 130,
        heightUnit: 'cm',
        weightUnit: 'lb'
    },
    teams: [],
    preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
    },
    statistics: {
        totalWorkouts: 0,
        totalTime: 0,
        completedPrograms: 0,
        currentStreak: 0
    },
    subscription: {
        active: true,
        expiresOn: '2024-12-15',
        plan: 'premium'
    },
    programs: {
        completed: [],
        inProgress: [],
        favorites: []
    },
    workouts: {
        history: [],
        current: null
    }
};

// Session Storage Keys
const STORAGE_KEYS = {
    USER_DATA: 'athleteUserData',
    TEAM_JOINED: 'teamJoined',
    SELECTED_SPORT: 'selectedSport',
    CURRENT_PROGRAM: 'currentProgram',
    WORKOUT_SESSION: 'workoutSession'
};

// Initialize user data from session storage or use defaults
function initializeUserData() {
    const savedData = sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        // Set default data and save to session storage
        saveUserData(DEFAULT_USER_DATA);
        return DEFAULT_USER_DATA;
    }
}

// Save user data to session storage
function saveUserData(userData) {
    sessionStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
}

// Get user data from session storage
function getUserData() {
    const savedData = sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
    return savedData ? JSON.parse(savedData) : DEFAULT_USER_DATA;
}

// Update specific user data fields
function updateUserData(updates) {
    const userData = getUserData();
    const updatedData = { ...userData, ...updates };
    saveUserData(updatedData);
    return updatedData;
}

// Update user profile
function updateProfile(profileUpdates) {
    const userData = getUserData();
    userData.profile = { ...userData.profile, ...profileUpdates };
    saveUserData(userData);
    return userData;
}

// Update user metrics
function updateMetrics(metricsUpdates) {
    const userData = getUserData();
    userData.metrics = { ...userData.metrics, ...metricsUpdates };
    saveUserData(userData);
    return userData;
}

// Add team to user data
function addTeam(teamData) {
    const userData = getUserData();
    userData.teams.push(teamData);
    saveUserData(userData);
    return userData;
}

// Remove team from user data
function removeTeam(teamId) {
    const userData = getUserData();
    userData.teams = userData.teams.filter(team => team.id !== teamId);
    saveUserData(userData);
    return userData;
}

// Update user preferences
function updatePreferences(preferencesUpdates) {
    const userData = getUserData();
    userData.preferences = { ...userData.preferences, ...preferencesUpdates };
    saveUserData(userData);
    return userData;
}

// Update user statistics
function updateStatistics(statsUpdates) {
    const userData = getUserData();
    userData.statistics = { ...userData.statistics, ...statsUpdates };
    saveUserData(userData);
    return userData;
}

// Add completed program
function addCompletedProgram(programData) {
    const userData = getUserData();
    userData.programs.completed.push(programData);
    saveUserData(userData);
    return userData;
}

// Add program to favorites
function addToFavorites(programData) {
    const userData = getUserData();
    if (!userData.programs.favorites.find(p => p.id === programData.id)) {
        userData.programs.favorites.push(programData);
        saveUserData(userData);
    }
    return userData;
}

// Remove program from favorites
function removeFromFavorites(programId) {
    const userData = getUserData();
    userData.programs.favorites = userData.programs.favorites.filter(p => p.id !== programId);
    saveUserData(userData);
    return userData;
}

// Start workout session
function startWorkoutSession(workoutData) {
    const userData = getUserData();
    userData.workouts.current = {
        ...workoutData,
        startTime: new Date().toISOString(),
        exercises: []
    };
    saveUserData(userData);
    return userData;
}

// End workout session
function endWorkoutSession() {
    const userData = getUserData();
    if (userData.workouts.current) {
        const completedWorkout = {
            ...userData.workouts.current,
            endTime: new Date().toISOString(),
            duration: new Date() - new Date(userData.workouts.current.startTime)
        };
        userData.workouts.history.push(completedWorkout);
        userData.workouts.current = null;
        
        // Update statistics
        userData.statistics.totalWorkouts += 1;
        userData.statistics.totalTime += completedWorkout.duration;
        
        saveUserData(userData);
    }
    return userData;
}

// Get current workout session
function getCurrentWorkout() {
    const userData = getUserData();
    return userData.workouts.current;
}

// Save selected sport
function saveSelectedSport(sport) {
    sessionStorage.setItem(STORAGE_KEYS.SELECTED_SPORT, sport);
}

// Get selected sport
function getSelectedSport() {
    return sessionStorage.getItem(STORAGE_KEYS.SELECTED_SPORT) || 'Basketball';
}

// Set team joined flag
function setTeamJoined() {
    sessionStorage.setItem(STORAGE_KEYS.TEAM_JOINED, 'true');
}

// Clear team joined flag
function clearTeamJoined() {
    sessionStorage.removeItem(STORAGE_KEYS.TEAM_JOINED);
}

// Check if team was joined
function wasTeamJoined() {
    return sessionStorage.getItem(STORAGE_KEYS.TEAM_JOINED) === 'true';
}

// Clear all session data (for logout)
function clearAllSessionData() {
    Object.values(STORAGE_KEYS).forEach(key => {
        sessionStorage.removeItem(key);
    });
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeUserData,
        saveUserData,
        getUserData,
        updateUserData,
        updateProfile,
        updateMetrics,
        addTeam,
        removeTeam,
        updatePreferences,
        updateStatistics,
        addCompletedProgram,
        addToFavorites,
        removeFromFavorites,
        startWorkoutSession,
        endWorkoutSession,
        getCurrentWorkout,
        saveSelectedSport,
        getSelectedSport,
        setTeamJoined,
        clearTeamJoined,
        wasTeamJoined,
        clearAllSessionData,
        STORAGE_KEYS,
        DEFAULT_USER_DATA
    };
}
