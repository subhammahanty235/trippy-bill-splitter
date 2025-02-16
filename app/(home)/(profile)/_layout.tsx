import React from 'react';
import ProfileScreen from './profilePage'; // Your Profile component
import SettingsScreen from './settingsPage'; 
import { Stack } from 'expo-router';



export default function ProfileStackScreen() {
  return (
    <Stack initialRouteName='profilePage'> 
      <Stack.Screen name="profilePage" options={{ headerShown: false }}/>
      <Stack.Screen name="settingsPage" options={{ headerShown: false }}/>
      <Stack.Screen name="paymentOptionsPage" options={{ headerShown: false }}/>
      <Stack.Screen name="updateProfilePage" options={{headerShown:false}}/>

    </Stack>
  );
}