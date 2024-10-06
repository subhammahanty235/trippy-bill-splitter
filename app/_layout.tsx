import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { preloadTheme, getSelectedTheme } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const checkSelectedTheme = async() => {
    const value = await AsyncStorage.getItem('theme');
    if (value !== null) {
      console.log(value);
    }else{
      console.log("No value found")
    }
  }
  const getTheme = async()=>{
    

    await preloadTheme(); // Load the theme once when the app starts
    console.log("Theme --------------------------->")
    console.log(getSelectedTheme())
    console.log("Theme <---------------------------")

  }
  useEffect(() => {
    getTheme()
  }, []);

  useEffect(() => {
    if (loaded) {
      checkSelectedTheme()
      SplashScreen.hideAsync()
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='(auth)/signup'>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}
