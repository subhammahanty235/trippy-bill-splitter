import { Animated, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ColorsEmereldGreen } from '@/constants/Colors'
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButtonS1 } from '@/components/ThemedButtonS1';
import { ThemedButtonS2 } from '@/components/ThemedButtonS2';
import { ScrollView } from 'react-native-gesture-handler';

const preferColorPalette = ColorsEmereldGreen;


const liveTripDetails = () => {


    return (
        <ThemedView style={styles.liveTripContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
            <SafeAreaView >
                <LiveTripHeading />
                <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 1, height: "100%" }}>
                        <LiveTripDetails />
                        <MoreStatisticsCards />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    )
}

function LiveTripHeading() {
    const router = useRouter()

    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Pressable onPress={() => router.dismiss()}>
                    <FontAwesome5 name="chevron-left" size={20} color='#44475b' />
                </Pressable>
                <ThemedText type='subtitle' lightColor={preferColorPalette.light.primary} >Goa Trip</ThemedText>
            </View>
            <FontAwesome5 name="bell" size={20} />
        </View>
    )
}

function LiveTripDetails() {
    const router = useRouter()
    return (
        <View style={liveTripDetailsStyle.tripfetchedComponent}>
            <View style={liveTripDetailsStyle.totalExpanseAndMainbanner}>
                <Text style={{ color: preferColorPalette.light.textSecondary, fontSize: 14 }}>Total Expense</Text>
                <Text style={{ color: preferColorPalette.light.textPrimary, fontSize: 30, fontWeight: '600' }}>$23000</Text>
                <ThemedButtonS1 lightBackgroundColor={preferColorPalette.light.primary} text='List Expense' onClick={()=> router.push('/listExpense')}/>
            </View>
            <Text style={{ color: 'grey', marginTop: 5 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat consequuntur veniam pariatur voluptate quam?</Text>
            <View style={liveTripDetailsStyle.startdateAndenddate}>
                <View style={liveTripDetailsStyle.startdateAndendDateChip}>
                    <View style={{ height: 15, width: 15, backgroundColor: preferColorPalette.light.primary, borderRadius: 15 }} />
                    <Text style={{ fontWeight: '600', color: preferColorPalette.light.textPrimary }}>Started on 26/9/24</Text>
                </View>
                <View style={liveTripDetailsStyle.datebar} />
                <View style={liveTripDetailsStyle.startdateAndendDateChip}>
                    <View style={{ height: 15, width: 15, backgroundColor: preferColorPalette.light.primary, borderRadius: 15 }} />
                    <Text style={{ fontWeight: '600', color: preferColorPalette.light.textPrimary }}>Started on 26/9/24</Text>
                </View>
            </View>
        </View>
    )
}

const MoreStatisticsCards = ({ data, left }: any) => {
    // 1 --> Lending , 2 --> Payment 
    const [screen, setScreen] = useState(1)
    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 15, marginBottom: 12 }}>
                <ThemedButtonS2 lightTextColor={screen === 1 ? preferColorPalette.light.textPrimary : preferColorPalette.light.textSecondary} text='Lendings' onClick={() => { setScreen(1) }} />
                <ThemedButtonS2 lightTextColor={screen === 2 ? preferColorPalette.light.textPrimary : preferColorPalette.light.textSecondary} text='Payments' onClick={() => { setScreen(2) }} />
            </View>
            <View style={moreStatisticsCardsStyles.statisticsCardComp}>
                {
                    screen === 1 ? <LendingDetailsComponent /> : <PaymentHistoryComponent />
                }
                {/* <LendingDetailsComponent />
                <PaymentHistoryComponent/> */}
            </View>
        </View>
    )
}

const LendingDetailsComponent = () => {

    return (
        <View style={lendingDetailsComponentsStyle.lendingDetailsComponents}>
            <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChip}>
                <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipLeft}>
                    <Text style={{ fontSize: 20, fontWeight: '700', }}>Subham</Text>
                    <Text style={{ color: 'red', fontWeight: '500' }}>$2000</Text>
                </View>
                <Pressable style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipPressable}>
                    <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', letterSpacing: 0.25, color: '#fff', }}>Pay Back</Text>
                </Pressable>
            </View>
            <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChip}>
                <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipLeft}>
                    <Text style={{ fontSize: 20, fontWeight: '700', }}>Subham</Text>
                    <Text style={{ color: 'red', fontWeight: '500' }}>$2000</Text>
                </View>
                <Pressable style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipPressable}>
                    <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', letterSpacing: 0.25, color: '#fff', }}>Pay Back</Text>
                </Pressable>
            </View>
            <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChip}>
                <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipLeft}>
                    <Text style={{ fontSize: 20, fontWeight: '700', }}>Subham</Text>
                    <Text style={{ color: 'red', fontWeight: '500' }}>$2000</Text>
                </View>
                <Pressable style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipPressable}>
                    <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', letterSpacing: 0.25, color: '#fff', }}>Pay Back</Text>
                </Pressable>
            </View>
            <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChip}>
                <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipLeft}>
                    <Text style={{ fontSize: 20, fontWeight: '700', }}>Subham</Text>
                    <Text style={{ color: 'red', fontWeight: '500' }}>$2000</Text>
                </View>
                <Pressable style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipPressable}>
                    <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', letterSpacing: 0.25, color: '#fff', }}>Pay Back</Text>
                </Pressable>
            </View>
            <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChip}>
                <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipLeft}>
                    <Text style={{ fontSize: 20, fontWeight: '700', }}>Subham</Text>
                    <Text style={{ color: 'red', fontWeight: '500' }}>$2000</Text>
                </View>
                <Pressable style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipPressable}>
                    <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', letterSpacing: 0.25, color: '#fff', }}>Pay Back</Text>
                </Pressable>
            </View>
        </View>

    )
}

const PaymentHistoryComponent = () => {
    return (
        <View style={paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponents}>
            <View style={paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponentsChip}>
                <View style={paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponentsChipLeft}>
                    <Text style={{ fontSize: 20, fontWeight: '700', }}>Subham</Text>
                    <Text style={{ color: preferColorPalette.light.textSecondary, fontWeight: '500' }}>2/2/2024</Text>
                </View>
                <Pressable style={[{ backgroundColor: preferColorPalette.light.secondary, }, paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponentsChipPressable]}>
                    <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', letterSpacing: 0.25, color: preferColorPalette.light.navIconColor, }}>+$230</Text>
                </Pressable>
            </View>
            <View style={paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponentsChip}>
                <View style={paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponentsChipLeft}>
                    <Text style={{ fontSize: 20, fontWeight: '700', }}>Subham</Text>
                    <Text style={{ color: preferColorPalette.light.textSecondary, fontWeight: '500' }}>2/2/2024</Text>
                </View>
                <Pressable style={[{ backgroundColor: preferColorPalette.light.secondary, }, paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponentsChipPressable]}>
                    <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', letterSpacing: 0.25, color: preferColorPalette.light.navIconColor, }}>+$230</Text>
                </Pressable>
            </View>
            <View style={paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponentsChip}>
                <View style={paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponentsChipLeft}>
                    <Text style={{ fontSize: 20, fontWeight: '700', }}>Subham</Text>
                    <Text style={{ color: preferColorPalette.light.textSecondary, fontWeight: '500' }}>$2000</Text>
                </View>
                <Pressable style={[{ backgroundColor: '#f9d7da', }, paymentHistoryDetailsComponentsStyle.paymentHistoryDetailsComponentsChipPressable]}>
                    <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', letterSpacing: 0.25, color: '#ef4f5f', }}>-$25</Text>
                </Pressable>
            </View>
        </View>
    )
}

const lendingDetailsComponentsStyle = StyleSheet.create({
    lendingDetailsComponents: {
        width: '100%',
        gap: 15
    },
    lendingDetailsComponentsChip: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    lendingDetailsComponentsChipLeft: {
        display: 'flex',
        gap: 4

    },
    lendingDetailsComponentsChipPressable: {
        backgroundColor: '#ef4f5f',
        padding: 10,
        borderRadius: 10
    }
})

const paymentHistoryDetailsComponentsStyle = StyleSheet.create({
    paymentHistoryDetailsComponents: {
        width: '100%',
        gap: 15
    },
    paymentHistoryDetailsComponentsChip: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    paymentHistoryDetailsComponentsChipLeft: {
        display: 'flex',
        gap: 4

    },
    paymentHistoryDetailsComponentsChipPressable: {
        // backgroundColor: '#f9d7da',
        padding: 10,
        borderRadius: 10
    }
})

const moreStatisticsCardsStyles = StyleSheet.create({
    statisticsCardComp: {
        // height: 150,
        width: "100%",
        // backgroundColor: preferColorPalette.light.tint,
        borderRadius: 15,
        borderTopLeftRadius: 0

    }
})

const liveTripDetailsStyle = StyleSheet.create({
    tripfetchedComponent: {
        marginTop: 20
    },
    totalExpanseAndMainbanner: {
        height: 150,
        width: '100%',
        marginVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15
    },
    startdateAndenddate: {
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: 15,
        marginBottom: 20
    },
    startdateAndendDateChip: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    datebar: {
        height: 50,
        borderWidth: 1.5,
        // borderColor:'#6bc1ae',
        borderColor: preferColorPalette.light.secondarydark,
        marginLeft: 5.5,
        borderRadius: 10,
        // backgroundColor:'#6bc1ae',
        backgroundColor: preferColorPalette.light.secondarydark,

    }
})




export default liveTripDetails

const styles = StyleSheet.create({
    liveTripContainer: {
        flex: 1,
        width: '100%',
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
    }
})