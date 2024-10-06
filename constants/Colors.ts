/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};


export const ColorsEmereldGreen = {
  light: {
    primary: '#00b386',
    secondary: '#ebf9f5',
    background:"#ff",
    textPrimary:"#44475b",
    textSecondary:"gray",
    tint: tintColorLight,
    icon: '#00b386',
    tabIconDefault: '#00b386',
    tabIconSelected: tintColorLight,
    navIconColor: '#009473',
    secondarydark: '#6bc1ae',
    bubbleColor:'#cedfe8'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const ColorsRoseRed = {
  light: {
    primary: '#ef4f5f',
    secondary: '#f9d7da',
    background:"#ff",
    textPrimary:"#44475b",
    textSecondary:"gray",
    tint: tintColorLight,
    icon: '#00b386',
    tabIconDefault: '#00b386',
    tabIconSelected: tintColorLight,
    navIconColor: '#ef4f5f',
    secondarydark: '#6bc1ae'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const ColorThemes: any = [
  { key: 'rosered', value: ColorsRoseRed },
  { key: 'emerGreen', value: ColorsEmereldGreen }
];
export let selectedTheme:any;

let cachedTheme: string | null = null;

export const preloadTheme = async () => {
  const storedValue = await AsyncStorage.getItem('theme');
  cachedTheme = storedValue; // Cache the value in a global variable
};

export const getSelectedTheme = () => {
  preloadTheme()
  if (!cachedTheme) {
    console.log(ColorThemes.find((theme: { key: string }) => theme.key === 'rosered'))
    return ColorThemes.find((theme: { key: string }) => theme.key === 'rosered').value;
  }

  return ColorThemes.find((theme: { key: string }) => theme.key === cachedTheme).value;
};


