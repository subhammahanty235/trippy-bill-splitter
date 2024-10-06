import React from 'react';
import { Stack } from 'expo-router';



export default function HomepageStackScreen() {
  return (
    <Stack initialRouteName='homepage'> 
      <Stack.Screen name="homepage" options={{ headerShown: false }}/>
      <Stack.Screen name="liveTripDetails" options={{ headerShown: false }}/>
      <Stack.Screen name="listExpense" options={{headerShown:false}}/>
      {/* <Stack.Screen name="settingsPage" options={{ headerShown: false }}/>
      <Stack.Screen name="paymentOptionsPage" options={{ headerShown: false }}/> */}
    </Stack>
  );
}