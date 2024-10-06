import React from 'react';
import { Stack } from 'expo-router';



export default function TripStackScreen() {
  return (
    <Stack>
      <Stack.Screen name="createTrippage" options={{ headerShown: false }}/>
      <Stack.Screen name="joinTripPage" options={{ headerShown: false }}/>
    </Stack>
  );
}