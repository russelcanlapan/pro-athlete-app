import { FirebaseTest } from '../components/FirebaseTest';

export const FirebaseTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Firebase Connection Test</h1>
        <FirebaseTest />
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Next Steps:</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Update your <code className="bg-blue-100 px-1 rounded">.env.local</code> file with the Firebase configuration</li>
            <li>Install Firebase CLI: <code className="bg-blue-100 px-1 rounded">npm install -g firebase-tools</code></li>
            <li>Login to Firebase: <code className="bg-blue-100 px-1 rounded">firebase login</code></li>
            <li>Initialize Firebase: <code className="bg-blue-100 px-1 rounded">firebase init</code></li>
            <li>Deploy security rules: <code className="bg-blue-100 px-1 rounded">firebase deploy --only firestore:rules</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
};
