import { Stack } from 'expo-router';

export default function OtherLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="login" options={{ title: 'Login' }} /> */}
      <Stack.Screen name="lendingPayment" options={{ headerShown: false }} />
    </Stack>
  );
}