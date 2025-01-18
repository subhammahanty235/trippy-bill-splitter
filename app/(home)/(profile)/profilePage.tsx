import { Pressable, StyleSheet, Text, View, Image, } from 'react-native'
import React, { useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Tabs, useRouter } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import { ThemedIconButton } from '@/components/ThemedIconButton'
import { ThemedButtonS4 } from '@/components/ThemedButtonS4'
import { ColorsEmereldGreen, getSelectedTheme, preloadTheme } from '@/constants/Colors'
import { useAppSelector } from '@/hooks/reduxHook/hooks'
let preferColorPalette = getSelectedTheme();
// const preferColorPalette = ColorsEmereldGreen;

export default function profile() {
  const router = useRouter()
  const {loggedUser} = useAppSelector((state) => state.user);
  useEffect(()=>{
    preloadTheme()
    preferColorPalette = getSelectedTheme()
  })

  return (
    <ThemedView style={styles.homepageContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
      <SafeAreaView>
        <View style={styles.profileSection}>
          <Image style={{ width: 100, height: 100, borderRadius: 50, marginBottom:10 }} source={{uri:loggedUser?.profilePic}}/>
          {/* <FontAwesome5 name='user-circle' size={80} color={} /> */}
          <Text style={{ fontSize: 25, fontWeight: '600' , color:preferColorPalette.light.textPrimary}}>{loggedUser?.name}</Text>
          <Text style={{ fontSize: 16, fontWeight: '300', color: preferColorPalette.light.textSecondary }}>{loggedUser?.emailId}</Text>
        </View>

        <View style={{marginTop:'15%' , display:'flex' , gap:15}}>
          <ThemedButtonS4 text='Edit Profile' lightBackgroundColor='gray' icon={'angle-right'} lightTextColor={preferColorPalette.light.textPrimary} prefixIcon={'pencil'} onClick={()=> router.push("/(home)/(profile)/updateProfilePage")}/>
          <ThemedButtonS4 text='Payment Options' lightBackgroundColor='gray' icon={'angle-right'} lightTextColor={preferColorPalette.light.textPrimary} prefixIcon={'credit-card'} onClick={()=> router.push("/(profile)/paymentOptionsPage")}/>
          <ThemedButtonS4 text='My Tours' lightBackgroundColor='gray' icon={'angle-right'} lightTextColor={preferColorPalette.light.textPrimary} prefixIcon={'bus'}/>
          <ThemedButtonS4 text='Settings' lightBackgroundColor='gray' icon={'angle-right'} lightTextColor={preferColorPalette.light.textPrimary} prefixIcon={'cog'} onClick={()=> router.push("/(profile)/settingsPage")}/>
          <ThemedButtonS4 text='Help' lightBackgroundColor='gray' icon={'angle-right'} lightTextColor={preferColorPalette.light.textPrimary} prefixIcon={'question'}/>
          <ThemedButtonS4 text='Report Bug'  lightBackgroundColor='gray' icon={'angle-right'} lightTextColor={preferColorPalette.light.textPrimary} prefixIcon={'bug'}/>
        </View>


      </SafeAreaView>
        <Image style={styles.logoImage} source={require("@/assets/images/logo-light.png")} />
      <View style={extraStyles.halfCircle} />

    </ThemedView>
  )
}

const styles = StyleSheet.create({
  homepageContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  profileSection: {
    display: 'flex',
    alignItems: 'flex-start',
    // gap: 5
  },
  logoImage: {
    width: 150,
    height: 50,
    position: 'absolute',
    bottom: 20, // Adjust this value to set the distance from the bottom
    alignSelf: 'center',
    zIndex: 100

},
})

const extraStyles = StyleSheet.create({
  halfCircle: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: preferColorPalette.light.secondary,
  },
})