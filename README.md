# Pro Athlete Fitness App

A comprehensive web-based fitness application designed for athletes and coaches to track injuries, manage training programs, and monitor progress.

## Features

- **Injury Tracking**: Visual body diagram with injury markers and detailed injury reports
- **User Authentication**: Secure Firebase Authentication for athletes and coaches
- **Profile Management**: Separate profiles for athletes and coaches
- **Team Management**: Coaches can create and manage teams
- **Training Programs**: Customizable strength, mobility, prehab, and rehab programs
- **Progress Tracking**: Monitor weight, body composition, and workout sessions
- **Real-time Database**: Firebase Firestore for data persistence
- **File Storage**: Firebase Storage for images and media

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pro-athlete-fitness-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Storage
   - Get your project configuration

4. **Environment Configuration**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Deploy Firebase Rules**
   ```bash
   # Install Firebase CLI if you haven't already
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase (select your project)
   firebase init
   
   # Deploy security rules
   firebase deploy --only firestore:rules
   firebase deploy --only storage
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Firebase authentication hook
├── lib/                # Library configurations
│   └── firebase.ts     # Firebase initialization
├── services/           # API and service functions
│   └── firebase.ts     # Firebase service functions
├── types/              # TypeScript type definitions
│   └── firebase.ts     # Firebase data types
├── pages/              # Page components
├── stores/             # Zustand state stores
└── utils/              # Utility functions
```

## Firebase Collections

### Users
- `athleteProfiles` - Athlete user profiles
- `coachProfiles` - Coach user profiles

### Data
- `injuries` - Injury records with body location mapping
- `teams` - Team information and member management
- `programs` - Training programs and exercises
- `progressEntries` - Progress tracking data
- `workoutSessions` - Completed workout sessions

## Security Rules

The app includes comprehensive Firestore security rules that ensure:
- Users can only access their own data
- Coaches can manage their teams
- Athletes can view teams they're part of
- Programs are publicly readable but require authentication to create

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue in the repository.
