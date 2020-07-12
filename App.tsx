import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { Asset } from 'expo-asset';
import { ThemeProvider } from 'react-native-elements';
import { MainNavigator } from './Navigators/Main/MainNavigator';
import theme from './constants/theme';
import { AuthProvider } from './store/contexts/Auth/AuthProvider';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';

export default function App() {
  const [isInitComplete, setIsInitComplete] = useState(false);

  if (!isInitComplete) {
    return (
      <AppLoading
        startAsync={asynInitTasks}
        onError={handleAsyncInitError}
        onFinish={() => setIsInitComplete(true)}
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

async function asynInitTasks() {
  await Asset.loadAsync([
    require('./assets/logo_transparent.png')
  ]);

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyCNBINsrXAzXPzji0_r3JAejczrfcVZjoQ',
    authDomain: 'laundrygh-a1db0.firebaseapp.com',
    databaseURL: 'https://laundrygh-a1db0.firebaseio.com',
    projectId: 'laundrygh-a1db0',
    storageBucket: 'laundrygh-a1db0.appspot.com',
    messagingSenderId: '137178854603',
    appId: '1:137178854603:web:5320487b8c7c7c1672574e',
    measurementId: 'G-DQS7PSWB5M'
  };
  
  firebase.initializeApp(firebaseConfig);
  
  YellowBox.ignoreWarnings(['Setting a timer']);
  
}

function handleAsyncInitError(error: any) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}
