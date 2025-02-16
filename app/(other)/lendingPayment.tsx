import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ColorsEmereldGreen } from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { FontAwesome5 } from '@expo/vector-icons'
import { ThemedButtonS1 } from '@/components/ThemedButtonS1'

const preferColorPalette = ColorsEmereldGreen;

export default function lendingPayment() {
    return (
        <ThemedView style={styles.lendingPage} lightColor={preferColorPalette.light.background} darkColor='#212529'>
            <SafeAreaView>
                <LendingPaymentPageHeading />
                <LendingPaymentBody />
            </SafeAreaView>
        </ThemedView>
    )
}


function LendingPaymentPageHeading() {

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
                <FontAwesome5 name="chevron-left" size={20} />
                <ThemedText style={{ marginBottom: 10 }} type='subtitle' lightColor={preferColorPalette.light.primary}>Lending Payment</ThemedText>
            </View>
            <FontAwesome5 name="bell" size={22} />
        </View>
    )
}

function LendingPaymentBody() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={lendingPaymentBodyStyles.paymentDetails}> 
                <Text style={lendingPaymentBodyStyles.paymentDetailsTitle}>Maggie and Coke</Text>
                <Text style={lendingPaymentBodyStyles.paymentDetailsdesc}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, alias?</Text>
                <Text>Lent on: 21-03-2025</Text>
                {/* <Text>Lent o
                n: 20-02-2025</Text> */}
            </View>

            <View style={lendingPaymentBodyStyles.tripDetails}> 
                <Text >Trip Name: Goa Trip 88</Text>
                <Text >Trip Code: #00022</Text>
            </View>

            <Text style={lendingPaymentBodyStyles.lenderLabel}>Lender</Text>

            <View style={lendingPaymentBodyStyles.lenderDetails}>
                <View style={lendingPaymentBodyStyles.lenderDetailsprofile}>
                <Image style={lendingPaymentBodyStyles.lenderDetailsImage} source={{uri:"https://trippy.blob.core.windows.net/trippy-user-profile-pictures/image-1-storage-test-2888"}}/>
                <View style={lendingPaymentBodyStyles.lenderDetailsprofileDet}>
                    <Text style={lendingPaymentBodyStyles.lenderDetailsprofileName}>Subham Mahanty</Text>
                    <Text style={lendingPaymentBodyStyles.lenderDetailsprofileRel}>Friend</Text>
                </View>
                </View>
               
                <View style={lendingPaymentBodyStyles.lenderDetailsAmount}>
                    <Text style={lendingPaymentBodyStyles.lenderDetailsAmountSymbol}>$</Text> 
                    <Text style={lendingPaymentBodyStyles.lenderDetailsAmountNum}>100</Text>
                </View>
            </View>
            
            <Text style={lendingPaymentBodyStyles.lenderLabel}>Payment Methods</Text>

            <View style={lendingPaymentBodyStyles.lenderPaymentMethodCash}>
            <ThemedButtonS1 text='Pay Now' lightBackgroundColor={preferColorPalette.light.primary} />
            </View>

            


        </ScrollView>
    )
}

const lendingPaymentBodyStyles = StyleSheet.create({
    paymentDetails:{
        // marginTop:15,
        // backgroundColor:'#fff',
        // height:100,
        gap:10,
        borderRadius:10,
        // paddingHorizontal:10,
        paddingVertical:15,
        // paddingBottom:10,
    },
    paymentDetailsTitle:{
        fontSize:18,
        fontWeight:500,
        color:preferColorPalette.light.textPrimary
    },
    paymentDetailsdesc:{
        fontSize:15,
        fontWeight:300,
        color:preferColorPalette.light.textSecondary
    },
    tripDetails:{
        gap:5
    },
    lenderLabel:{
        marginTop:10,
        fontSize:18,
        fontWeight:'500',
        marginBottom:7,
    },
    lenderDetails:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        backgroundColor:'#fff',
        padding:10,
        borderRadius:10
    },
    lenderDetailsprofile:{
        display:'flex',
        flexDirection:'row',
        gap:10
    },
    lenderDetailsprofileDet:{
        gap:3,
        justifyContent:'center'
    },
    lenderDetailsprofileName:{
        fontSize:18,
        fontWeight:'500'
    },
    lenderDetailsprofileRel:{

    },
    lenderDetailsImage:{
        height: 50,
        width: 50,
        borderRadius: 10
    },
    lenderDetailsAmount:{
        display:'flex',
        flexDirection:'row'
    },
    lenderDetailsAmountNum:{
        color:preferColorPalette.light.textPrimary,
        fontSize:23,
        fontWeight:'500'

    },
    lenderDetailsAmountSymbol:{
        color:preferColorPalette.light.textPrimary

    },
    lenderPaymentMethodCash:{
        
    }

})


const styles = StyleSheet.create({
    lendingPage: {
        flex: 1,
        width: '100%',
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
    }
})