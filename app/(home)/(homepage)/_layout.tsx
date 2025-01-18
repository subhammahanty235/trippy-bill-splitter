import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useAppDispatch } from '@/hooks/reduxHook/hooks';
import { fetchLoggedInUser } from '@/redux/actions/userAction';



export default function HomepageStackScreen() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchLoggedInUser())
  },[dispatch])
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