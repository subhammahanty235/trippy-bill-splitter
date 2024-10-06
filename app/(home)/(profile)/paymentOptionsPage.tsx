import { SafeAreaView, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
// import CreditCardIcon from '@/assets/images/Credit-Card-Application.svg'
import { ColorsRoseRed, getSelectedTheme, preloadTheme, selectedTheme } from '@/constants/Colors'

let preferColorPalette = getSelectedTheme();

const paymentOptionsPage = () => {
  useEffect(()=>{
    
    console.log("First one ------------------__>")
    console.log(preferColorPalette)
    preloadTheme()
    preferColorPalette = getSelectedTheme()
    console.log("Second One --------------> ")
    console.log(preferColorPalette)
  })
  const [extendChip, setExtendChip] = useState<string>("") //to be updated: demo code
  return (
    <ThemedView style={styles.homepageContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
      <View style={extraStyles.halfCircle} />
      <SafeAreaView >
        <HomePageHeading />
        {/* <ScrollView> */}
        {/* <View style={{flex:1, height:'100%' , backgroundColor:'black'}}> */}
        <CurrentPaymentOptions />
        <View style={styles.moreMethodsLineandText}>
          <View style={styles.moreMethodLine} />
          <ThemedText lightColor={preferColorPalette.light.textSecondary} type='defaultSemiBold'>Available Methods</ThemedText>
          <View style={styles.moreMethodLine} />

        </View>
        <View style={{ marginBottom: 200 }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 500 }} showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <AvailablePaymentMethodChip icon="money-bill-alt" text="Cash" extend={extendChip} setExtendChip={setExtendChip} />
            <AvailablePaymentMethodChip icon="mobile" text="UPI" extend={extendChip} setExtendChip={setExtendChip} />
            <AvailablePaymentMethodChip icon="qrcode" text="Card" extend={extendChip} setExtendChip={setExtendChip} />
            <AvailablePaymentMethodChip icon="money-bill-alt" text="UPI QR" extend={extendChip} setExtendChip={setExtendChip} />
            <AvailablePaymentMethodChip icon="mobile" text="Net Banking" extend={extendChip} setExtendChip={setExtendChip} />
            <AvailablePaymentMethodChip icon="qrcode" text="Other" extend={extendChip} setExtendChip={setExtendChip} />
          </ScrollView>
        </View>

        {/* </View> */}
        {/* </ScrollView> */}
      </SafeAreaView>
    </ThemedView>
  )
}

function HomePageHeading() {
  const router = useRouter()

  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap:5  }}>
      <Pressable onPress={()=> router.dismiss()}>
        <FontAwesome5 name="chevron-left" size={20} color='#44475b'/>
      </Pressable>
        <ThemedText type='subtitle' lightColor={ preferColorPalette.light.primary} >Payment Options</ThemedText>
      {/* <FontAwesome5 name="bell" size={22}/> */}

    </View>
  )
}

function CurrentPaymentOptions() {

  return (
    <View style={noPaymentOptionsStyles.noPaymentOptionsComp}>
      <Image style={noPaymentOptionsStyles.noPaymentOptionsIllus} source={require("@/assets/images/money-image-1.png")} />
      <ThemedText style={noPaymentOptionsStyles.noPaymentOptionsTitle} type='subtitle' lightColor={ preferColorPalette.light.textPrimary}>No Methods Selected!</ThemedText>
      <ThemedText style={noPaymentOptionsStyles.noPaymentOptionsSubTitle} lightColor={ preferColorPalette.light.textSecondary}>Payments Methods are required as it will show your friends how they can pay you</ThemedText>
    </View>
  )
}

const noPaymentOptionsStyles = StyleSheet.create({
  noPaymentOptionsComp: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    // backgroundColor:'black'
  },
  noPaymentOptionsIllus: {
    width: '50%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 40
  },
  noPaymentOptionsTitle: {
    marginTop: 20
  },
  noPaymentOptionsSubTitle: {
    marginTop: 5
  }
})

function AvailablePaymentMethodChip({ icon, text, extend, setExtendChip }: any) {

  return (
    <View style={availablePaymentMethodChipStyle.availablePaymentMethodChipComp}>
      <Pressable style={availablePaymentMethodChipStyle.availablePaymentMethodChipDetails} onPress={() => { setExtendChip(text) }}>
        <View style={{ width: 35 }}>
          <FontAwesome5 name={icon} color={ preferColorPalette.light.primary} size={20} />

        </View>
        <Text style={{ fontSize: 18, fontWeight: '500', color: preferColorPalette.light.textPrimary }}>{text}</Text>
      </Pressable>
      {
        extend === text &&
        <Pressable style={availablePaymentMethodChipStyle.availablePaymentMethodChipPressable}>
          <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>Select</Text>
        </Pressable>
      }

    </View>
  )
}
// const preferColorPalette = getSelectedTheme()

const availablePaymentMethodChipStyle = StyleSheet.create({
  availablePaymentMethodChipComp: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,

  },
  availablePaymentMethodChipDetails: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    height: 50,
    flex: 1,
    // width: '100%',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 15


  },
  availablePaymentMethodChipPressable: {
    width: 100,
    height: 50,
    backgroundColor:preferColorPalette?.light?.primary,
    marginLeft: 10,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default paymentOptionsPage

const styles = StyleSheet.create({
  homepageContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,

  },
  moreMethodsLineandText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 4
  },

  moreMethodLine: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 2
  }

})

const extraStyles = StyleSheet.create({
  halfCircle: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor:  preferColorPalette?.light?.bubbleColor,
  },
})