// Audit Logger for HIPAA/PIPEDA Compliance
// Logs all sensitive data access and modifications

class AuditLogger {
    constructor() {
        this.db = firebase.firestore();
        this.batchSize = 500;
        this.logQueue = [];
        this.isProcessing = false;
        
        // Start periodic batch processing
        this.startBatchProcessor();
    }

    // Log data access events
    async logDataAccess(userId, dataType, action, details = {}) {
        const logEntry = {
            userId: userId,
            dataType: dataType, // 'PHI', 'profile', 'workout', etc.
            action: action, // 'READ', 'WRITE', 'DELETE', 'EXPORT'
            details: details,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            sessionId: this.getSessionId(),
            ipAddress: await this.getClientIP(),
            userAgent: navigator.userAgent,
            compliance: {
                hipaa: this.isHealthData(dataType),
                pipeda: true
            }
        };

        this.queueLog(logEntry);
    }

    // Log authentication events
    async logAuthEvent(userId, action, success = true, details = {}) {
        const logEntry = {
            userId: userId,
            action: `AUTH_${action}`, // AUTH_LOGIN, AUTH_LOGOUT, AUTH_FAILED
            success: success,
            details: details,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            sessionId: this.getSessionId(),
            ipAddress: await this.getClientIP(),
            userAgent: navigator.userAgent
        };

        this.queueLog(logEntry);
    }

    // Log consent changes
    async logConsentChange(userId, consentType, action, previousValue, newValue) {
        const logEntry = {
            userId: userId,
            action: `CONSENT_${action}`, // CONSENT_GIVEN, CONSENT_WITHDRAWN, CONSENT_UPDATED
            consentType: consentType,
            previousValue: previousValue,
            newValue: newValue,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            sessionId: this.getSessionId(),
            ipAddress: await this.getClientIP(),
            userAgent: navigator.userAgent,
            compliance: {
                legal_basis: 'consent_management',
                retention_period: '7_years'
            }
        };

        this.queueLog(logEntry);
    }

    // Log data sharing events (coach access)
    async logDataSharing(fromUserId, toUserId, dataType, action, details = {}) {
        const logEntry = {
            fromUserId: fromUserId,
            toUserId: toUserId,
            action: `SHARE_${action}`, // SHARE_GRANTED, SHARE_ACCESSED, SHARE_REVOKED
            dataType: dataType,
            details: details,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            sessionId: this.getSessionId(),
            ipAddress: await this.getClientIP(),
            userAgent: navigator.userAgent,
            compliance: {
                hipaa: this.isHealthData(dataType),
                authorized_purpose: 'coaching_services'
            }
        };

        this.queueLog(logEntry);
    }

    // Log system security events
    async logSecurityEvent(userId, event, severity, details = {}) {
        const logEntry = {
            userId: userId,
            action: `SECURITY_${event}`, // SECURITY_BREACH_ATTEMPT, SECURITY_VIOLATION
            severity: severity, // 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
            details: details,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            sessionId: this.getSessionId(),
            ipAddress: await this.getClientIP(),
            userAgent: navigator.userAgent,
            immediate_alert: severity === 'CRITICAL'
        };

        // Immediately log critical security events
        if (severity === 'CRITICAL') {
            await this.writeLogEntry(logEntry);
        } else {
            this.queueLog(logEntry);
        }
    }

    // Queue log entry for batch processing
    queueLog(logEntry) {
        this.logQueue.push(logEntry);
        
        // If queue is getting full, process immediately
        if (this.logQueue.length >= this.batchSize) {
            this.processBatch();
        }
    }

    // Start the batch processor
    startBatchProcessor() {
        setInterval(() => {
            if (this.logQueue.length > 0) {
                this.processBatch();
            }
        }, 30000); // Process every 30 seconds
    }

    // Process queued logs in batch
    async processBatch() {
        if (this.isProcessing || this.logQueue.length === 0) {
            return;
        }

        this.isProcessing = true;
        const batch = this.logQueue.splice(0, this.batchSize);
        
        try {
            const firestoreBatch = this.db.batch();
            
            batch.forEach((logEntry) => {
                const docRef = this.db.collection('auditLogs').doc();
                firestoreBatch.set(docRef, logEntry);
            });
            
            await firestoreBatch.commit();
            console.log(`Audit batch processed: ${batch.length} entries`);
            
        } catch (error) {
            console.error('Error processing audit batch:', error);
            // Re-queue failed entries
            this.logQueue.unshift(...batch);
        } finally {
            this.isProcessing = false;
        }
    }

    // Write individual log entry (for critical events)
    async writeLogEntry(logEntry) {
        try {
            await this.db.collection('auditLogs').add(logEntry);
        } catch (error) {
            console.error('Error writing audit log:', error);
            // Add to queue as fallback
            this.queueLog(logEntry);
        }
    }

    // Helper methods
    getSessionId() {
        if (!window.sessionStorage.getItem('audit_session_id')) {
            window.sessionStorage.setItem('audit_session_id', this.generateId());
        }
        return window.sessionStorage.getItem('audit_session_id');
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    async getClientIP() {
        try {
            // In production, you might want to use a more reliable service
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return 'unknown';
        }
    }

    isHealthData(dataType) {
        const healthDataTypes = [
            'PHI', 'injury', 'measurements', 'health_metrics', 
            'medical_history', 'fitness_data', 'progress_photos'
        ];
        return healthDataTypes.includes(dataType);
    }

    // Query audit logs (admin function)
    async queryLogs(filters = {}) {
        let query = this.db.collection('auditLogs');
        
        if (filters.userId) {
            query = query.where('userId', '==', filters.userId);
        }
        
        if (filters.action) {
            query = query.where('action', '==', filters.action);
        }
        
        if (filters.startDate) {
            query = query.where('timestamp', '>=', filters.startDate);
        }
        
        if (filters.endDate) {
            query = query.where('timestamp', '<=', filters.endDate);
        }
        
        query = query.orderBy('timestamp', 'desc');
        
        if (filters.limit) {
            query = query.limit(filters.limit);
        }
        
        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    // Generate compliance report
    async generateComplianceReport(userId, startDate, endDate) {
        const logs = await this.queryLogs({ userId, startDate, endDate });
        
        const report = {
            userId: userId,
            period: { start: startDate, end: endDate },
            totalEvents: logs.length,
            eventsByType: {},
            hipaaEvents: logs.filter(log => log.compliance?.hipaa).length,
            securityEvents: logs.filter(log => log.action.startsWith('SECURITY_')).length,
            dataAccess: logs.filter(log => ['READ', 'WRITE', 'DELETE'].includes(log.action)).length,
            consentChanges: logs.filter(log => log.action.startsWith('CONSENT_')).length
        };
        
        // Group events by type
        logs.forEach(log => {
            const actionType = log.action.split('_')[0];
            report.eventsByType[actionType] = (report.eventsByType[actionType] || 0) + 1;
        });
        
        return report;
    }
}

// Initialize global audit logger
const auditLogger = new AuditLogger();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuditLogger;
}

// Auto-log page views for health data pages
window.addEventListener('load', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && window.location.pathname.includes('/athletes/') || window.location.pathname.includes('/coaches/')) {
            auditLogger.logDataAccess(
                user.uid,
                'dashboard',
                'VIEW',
                { page: window.location.pathname }
            );
        }
    });
});

// Auto-log when user leaves the page
window.addEventListener('beforeunload', function() {
    const user = firebase.auth().currentUser;
    if (user) {
        auditLogger.logDataAccess(
            user.uid,
            'session',
            'END',
            { duration: Date.now() - performance.timing.navigationStart }
        );
    }
});