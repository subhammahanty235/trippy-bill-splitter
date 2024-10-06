import { Modal, StyleSheet, Text, View , Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ColorsEmereldGreen, getSelectedTheme, preloadTheme } from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedButtonS1 } from '@/components/ThemedButtonS1'
import { ThemedButtonS2 } from '@/components/ThemedButtonS2'
// const preferColorPalette = ColorsEmereldGreen;

let preferColorPalette = getSelectedTheme();

const settingsPage = () => {
  useEffect(()=>{
    
    console.log("First one ------------------__>")
    console.log(preferColorPalette)
    preloadTheme()
    preferColorPalette = getSelectedTheme()
    console.log("Second One --------------> ")
    console.log(preferColorPalette)
  })

  
  const [loadingColorPaletteUpdate,setLoadingColorPaletteUpdate ] = useState<boolean>(false);
  const updateColorPalette = async(value:any) => {
    AsyncStorage.setItem('theme' ,value );
    await preloadTheme();
  }
  return (
    <ThemedView style={styles.settingpageContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
      <SafeAreaView>
        <ThemedButtonS1 lightBackgroundColor='pink' text='Emerend green' onClick={()=> updateColorPalette('emerGreen')}/>
        <ThemedButtonS1 lightBackgroundColor='pink' text='Rossie Red' onClick={()=> updateColorPalette('rosered')}/>
      </SafeAreaView>
      <Modal visible={loadingColorPaletteUpdate} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image style={{ width: 100, height: 100, borderRadius: 50, marginBottom:10, marginLeft:15 }} source={{uri:'https://emilyso.com/wp-content/uploads/2017/07/paint.gif'}} />
            <Text>Brewing the magic!</Text>
          </View>
        </View>
      </Modal>
    </ThemedView>
  )
}

export default settingsPage

const styles = StyleSheet.create({
  settingpageContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
})