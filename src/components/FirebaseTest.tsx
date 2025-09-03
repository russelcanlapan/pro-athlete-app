import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

export const FirebaseTest = () => {
  const [status, setStatus] = useState<string>('Testing connection...');
  const [testData, setTestData] = useState<any[]>([]);

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const testFirebaseConnection = async () => {
    try {
      // Test authentication
      setStatus('Testing authentication...');
      const userCredential = await signInAnonymously(auth);
      setStatus('Authentication successful!');

      // Test Firestore
      setStatus('Testing Firestore...');
      const testCollection = collection(db, 'test');
      const docRef = await addDoc(testCollection, {
        message: 'Firebase connection test',
        timestamp: new Date(),
        userId: userCredential.user.uid
      });
      setStatus('Firestore write successful!');

      // Test reading data
      const querySnapshot = await getDocs(testCollection);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestData(data);
      setStatus('Firebase connection successful! ✅');

    } catch (error) {
      console.error('Firebase test error:', error);
      setStatus(`Connection failed: ${error}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Firebase Connection Test</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Status: {status}</p>
      </div>
      
      {testData.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Test Data:</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      )}
      
      <button 
        onClick={testFirebaseConnection}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Test Again
      </button>
    </div>
  );
};
