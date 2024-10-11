import { ColorsEmereldGreen, preloadTheme } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
const preferColorPalette = ColorsEmereldGreen;

export default function HomeLayout() {
  const getTheme = async()=>{
    await preloadTheme();
  }
  
  useEffect(() => {
    getTheme()
  }, []);
  
  return (

    <Tabs initialRouteName='(homepage)' screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='(homepage)' options={{
        title: 'Home',
        tabBarActiveTintColor: preferColorPalette.light.navIconColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBars,
        tabBarIcon: ({ focused, color, size }) => (
          <View style={[styles.iconContainer, focused && styles.focusedTab]}>
            <FontAwesome name={focused ? 'home' : 'home'} size={size} color={color} />
            <Text style={[styles.label, focused && styles.focusedLabel]}>
              Home
            </Text>
          </View>
        ),
        tabBarLabel: () => null,
      }} />
      <Tabs.Screen name="(trip)" options={{
        title: 'New Trip',
        tabBarActiveTintColor: preferColorPalette.light.navIconColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBars,
        tabBarIcon: ({ focused, color, size }) => (
          <View style={[styles.iconContainer, focused && styles.focusedTab]}>
            <FontAwesome name={focused ? 'plus-square' : 'plus-square'} size={size} color={color} />
            <Text style={[styles.label, focused && styles.focusedLabel]}>
              New Trip
            </Text>
          </View>
        ),
        tabBarLabel: () => null,
      }} />
      <Tabs.Screen name="(profile)" options={{
        title: 'Profile',
        tabBarActiveTintColor: preferColorPalette.light.navIconColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBars,
        tabBarIcon: ({ focused, color, size }) => (
          <View style={[styles.iconContainer, focused && styles.focusedTab]}>
            <FontAwesome name={focused ? 'user' : 'user'} size={size} color={color} />
            <Text style={[styles.label, focused && styles.focusedLabel]}>
              Profile
            </Text>
          </View>
        ),
        tabBarLabel: () => null,
      }} />

      {/* <Tabs.Screen
        name="(trip)/createTrippage"
        options={{
          tabBarButton: () => null, // This hides the tab bar button
        }}
      /> */}

      {/* <Tabs.Screen
        name="(trip)/joinTripPage"
        options={{
          tabBarButton: () => null, // This hides the tab bar button
        }}
      /> */}
       

    </Tabs>


  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    padding: 5,
  },
  focusedTab: {
    backgroundColor: '#ebf9f5',
    width: 50,
  },
  label: {
    fontSize: 12,
    color: 'gray', // Color for inactive tab text
  },
  focusedLabel: {
    color: '#00b386', // Color for active tab text
    display: 'none'
  },
  tabBars: {
    borderTopWidth: 0, // Remove border for a cleaner look
    padding: 15,
    width: '100%',
    height: '9%',
    borderRadius: 0,
    // marginLeft: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // marginBottom: '5%',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 8, // Shadow radius
    elevation: 5, // Elevation for Android shadow
    paddingBottom: 15,
    paddingLeft: 0,
    paddingRight: 0,
    opacity: 0.9
  }
});