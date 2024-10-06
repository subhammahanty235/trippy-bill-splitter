// import { Link, Stack } from 'expo-router';
// import { StyleSheet } from 'react-native';

// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function NotFoundScreen() {
//   return (
//     <>
//       <Stack.Screen options={{ title: 'Oops!' }} />
//       <ThemedView style={styles.container}>
//         <ThemedText type="title">This screen doesn't exist.....</ThemedText>
//         <Link href="/(home)/(homepage)/homepage" style={styles.link}>
//           <ThemedText type="link">Go to home screen!</ThemedText>
//         </Link>
//       </ThemedView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
// });
import { useRoute } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const route = useRoute();

  console.log('Current route name:', route.name);
  console.log('Current route params:', route.params);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page Not Found</Text>
      <Text>Current Route: {route.name}</Text>
      <Button title="Go to Homepage" onPress={() => console.log('Navigate to Homepage')} />
    </View>
  );
}
