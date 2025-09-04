# Pro Athlete Fitness App

## Overview

Pro Athlete is a comprehensive web-based fitness application designed specifically for athletes and coaches to track injuries, manage training programs, and monitor progress. The app provides dual interfaces for athletes to track their personal fitness journey and for coaches to manage teams and monitor athlete performance. Key features include visual injury tracking with body diagrams, customizable training programs (strength, mobility, prehab, rehab), real-time progress monitoring, and team management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based architecture with TypeScript for type safety. The frontend is built with React 18 and Vite as the build tool, providing fast development and optimized production builds. The application uses a component-based architecture with separate pages and components for athletes and coaches. Tailwind CSS is used for styling with custom design tokens and responsive layouts. React Router DOM handles client-side routing with protected routes based on user roles.

### State Management
The application uses Zustand for lightweight state management, complemented by React Hook Form for form handling. Firebase Authentication hooks (react-firebase-hooks) provide seamless integration with the authentication system. Session storage is used for temporary data persistence during user flows like onboarding and signup processes.

### Backend Architecture
The application follows a Backend-as-a-Service (BaaS) architecture using Firebase as the primary backend infrastructure. This eliminates the need for traditional server management while providing enterprise-grade scalability and security. The backend consists of three main Firebase services working together to provide complete functionality.

### Authentication and Authorization
Firebase Authentication handles all user management with email/password authentication. The app implements role-based access control with separate interfaces and permissions for athletes and coaches. Protected routes ensure users can only access features appropriate to their role. Authentication state is managed through React context and Firebase auth hooks.

### Data Storage Solution
Firebase Firestore serves as the primary NoSQL database, storing user profiles, team data, training programs, injury records, and progress tracking information. The database uses a collection-based structure optimized for real-time updates and offline synchronization. Firebase Storage handles file uploads including profile images, exercise videos, and injury documentation.

### User Interface Design
The application features a dual-interface design with distinct user experiences for athletes and coaches. Athletes have access to personal dashboards, injury tracking, program viewing, and progress monitoring. Coaches have additional capabilities for team management, athlete oversight, and program assignment. The interface uses a mobile-first responsive design with touch-friendly interactions.

### Real-time Capabilities
Firebase Firestore provides real-time data synchronization, enabling live updates for team statistics, progress tracking, and injury reports. This ensures coaches have immediate access to athlete data changes and athletes can see updated programs and feedback instantly.

### File Handling and Media
Firebase Storage manages all media files including exercise demonstration videos, profile pictures, and injury documentation photos. The system supports image optimization and secure file access with role-based permissions.

## External Dependencies

### Firebase Services
- **Firebase Authentication**: User registration, login, password reset, and session management
- **Firebase Firestore**: NoSQL database for storing user profiles, teams, programs, injuries, and progress data
- **Firebase Storage**: File storage for images, videos, and documents
- **Firebase Hosting**: Web application hosting and deployment
- **Firebase Data Connect**: Enhanced database connectivity and query optimization

### Development and Build Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **TypeScript**: Static type checking for improved code quality and developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

### React Ecosystem
- **React Router DOM**: Client-side routing with protected route capabilities
- **React Hook Form**: Form handling with validation and performance optimization
- **React Firebase Hooks**: React hooks for Firebase integration
- **Lucide React**: Icon library for consistent iconography

### State and Data Management
- **Zustand**: Lightweight state management for client-side data
- **Axios**: HTTP client for API requests and external service integration
- **clsx**: Utility for conditional CSS class names
- **tailwind-merge**: Intelligent Tailwind CSS class merging

### Deployment and Infrastructure
- **Vercel**: Alternative hosting platform with optimized static file serving
- **Firebase Emulators**: Local development environment for Firebase services during development and testing

### Development Quality Tools
- **ESLint**: JavaScript/TypeScript linting with React-specific rules
- **TypeScript Compiler**: Type checking and transpilation
- **Firebase CLI**: Command-line tools for Firebase service management and deployment

## Recent Changes

### Latest modifications with dates

**September 3, 2025 - VLC-Style Video Player & Team Management Fixes**
- Integrated Video.js for VLC-style video playback with professional controls, speed adjustments (0.25x-2x), and keyboard shortcuts (Space, arrows, F, M)
- Fixed coach team navigation showing actual team names instead of placeholder "Team XXX" 
- Resolved athlete counting issue - Teams page now correctly displays "Brookwood Elite (1 athletes)" for Phil Jackson's team
- Enhanced video player with autoplay support, click-to-play functionality, and fallback error handling
- Updated team data consistency between registeredUsers and users arrays for accurate member counts
- Added automatic team assignment fixes for Phil Jackson to "Brookwood Elite" team
- Improved login authentication with password flexibility and better user data lookup

**September 4, 2025 - Pantone 634C Brand Color Implementation & Vercel Deployment Prep**
- Replaced all blue colors throughout the application with Pantone 634C (#005F83) for consistent brand identity
- Implemented three-tier color system: Primary (#005F83), Secondary (#007BA3), Tertiary (#2A95B8)
- Updated CSS variables, buttons, navigation, cards, and interactive elements across all pages
- Applied new color scheme to athlete dashboard, coach pages, authentication, and admin interfaces
- Maintained Apple-inspired design aesthetic while implementing distinctive brand colors
- Updated vercel.json configuration to include all static assets (admin, js, api directories)
- Prepared project structure for seamless Vercel deployment with proper route handling

**September 4, 2025 - Complete PIPEDA/HIPAA Compliance Implementation**
- Implemented comprehensive Firebase security rules with role-based access control for PHI protection
- Created detailed Privacy Policy covering both PIPEDA and HIPAA requirements with specific health data protections
- Developed Terms of Service with medical disclaimers and data processing agreements
- Built interactive consent system for health data collection with granular permission controls
- Added complete data controls system: export, correction, deletion, and consent management
- Integrated audit logging system for all data access and modifications (HIPAA compliance)
- Created compliance dashboard with security features overview and regulatory contact information
- Added compliance links and security badges throughout the application
- Implemented data retention policies, breach response procedures, and user rights management
- Enhanced Firebase Storage rules for secure health-related media handling
- Updated homepage with compliance messaging and direct access to legal documents