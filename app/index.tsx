import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

type ValidRoute = '/(home)/(homepage)/homepage' | '/(auth)/signup';

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<ValidRoute | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        console.log("Hereee-------------------____>1")
        setInitialRoute(token ? '/(home)/(homepage)/homepage' : '/(auth)/signup');
      } catch (error) {
        console.log("Hereee-------------------____>2")
        setInitialRoute('/(auth)/signup');
      }
    }
    checkAuth();
  }, []);

  if (!initialRoute) {
    return <View />;
  }

  return <Redirect href={initialRoute} />;
}