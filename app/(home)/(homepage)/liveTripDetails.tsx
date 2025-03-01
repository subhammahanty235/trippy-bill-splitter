import { Animated, Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ColorsEmereldGreen } from '@/constants/Colors'
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButtonS1 } from '@/components/ThemedButtonS1';
import { ThemedButtonS2 } from '@/components/ThemedButtonS2';
// import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook/hooks';
import { useDispatch } from 'react-redux';
import { fetchTripDetails, getLiveTripExpense } from '@/redux/actions/tripAction';
import { fetchAllLendingsOfUserTripBased } from '@/redux/actions/expenseAction';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { BottomSheetParentComponent } from '@/components/BottomSheetParentComponent';
import SelectConnection from '@/components/SelectConection';
const preferColorPalette = ColorsEmereldGreen;


const liveTripDetails = () => {
    const dispatch = useAppDispatch();
    const { liveTripOfUser, completeTripDetails, loadingDetailsOfTrip } = useAppSelector((state) => state.trip)

    useEffect(() => {
        dispatch(fetchTripDetails(liveTripOfUser.tripUniqueCode));
    }, [liveTripOfUser, liveTripOfUser])


    //BottomSheet --> TODO: Change the complete architectite to make the code organized
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [selectedBottomSheet, setSelectedBottomSheet] = useState();
    // const [formControllers, setFormControllers] = useState({});
    const handlePresentModalPress = useCallback((component: any) => {
  
      setSelectedBottomSheet(component)
      bottomSheetModalRef.current?.present();
    }, []);


    return (
        <ThemedView style={styles.liveTripContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
            <BottomSheetModalProvider>
            <View style={extraStyles.halfCircle} />
            <SafeAreaView >
                <LiveTripHeading/>
                <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 1, height: "100%" }}>
                        <LiveTripDetails handlePresentModalPress={handlePresentModalPress}/>
                        <MoreStatisticsCards />
                        <BottomSheetParentComponent bottomSheetModalRef={bottomSheetModalRef} component={selectedBottomSheet} />
                    </View>
                </ScrollView>
            </SafeAreaView>
            </BottomSheetModalProvider>
        </ThemedView>
    )
}

function LiveTripHeading() {
    const router = useRouter()
    const { completeTripDetails, loadingDetailsOfTrip } = useAppSelector((state) => state.trip)


    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Pressable onPress={() => router.dismiss()}>
                    <FontAwesome5 name="chevron-left" size={20} color='#44475b' />
                </Pressable>
                <ThemedText type='subtitle' lightColor={preferColorPalette.light.primary} >{completeTripDetails?.tripName}</ThemedText>
            </View>
            <FontAwesome5 name="bell" size={20} />
        </View>
    )
}

function LiveTripDetails({handlePresentModalPress}:any) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { liveTripExpense, liveTripOfUser, completeTripDetails, loadingDetailsOfTrip } = useAppSelector((state) => state.trip)

    useEffect(() => {
        dispatch(getLiveTripExpense(liveTripOfUser.tripUniqueCode))
    }, [dispatch, liveTripExpense])
    return (
        <View style={liveTripDetailsStyle.tripfetchedComponent}>
            <View style={liveTripDetailsStyle.totalExpanseAndMainbanner}>
                <Text style={{ color: preferColorPalette.light.textSecondary, fontSize: 14 }}>Total Expense</Text>
                <Text style={{ color: preferColorPalette.light.textPrimary, fontSize: 30, fontWeight: '600', marginBottom: 15 }}>${liveTripExpense}</Text>
                <ThemedButtonS1 lightBackgroundColor={preferColorPalette.light.primary} text='List Expense' onClick={() => router.push('/listExpense')} />
            </View>
            <ThemedButtonS1 text='Add People' lightBackgroundColor='pink' onClick={()=>{handlePresentModalPress(<SelectConnection/>)}}/>
            <Text style={{ color: 'grey', marginTop: 5 }}>{completeTripDetails?.tripDescription}</Text>
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
    // 1 --> Lending , 2 --> Payment , 3 --> TripMembersList
    const [screen, setScreen] = useState(1)


    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 15, marginBottom: 12 }}>
                <ThemedButtonS2 lightTextColor={screen === 1 ? preferColorPalette.light.textPrimary : preferColorPalette.light.textSecondary} text='Lendings' onClick={() => { setScreen(1) }} />
                <ThemedButtonS2 lightTextColor={screen === 2 ? preferColorPalette.light.textPrimary : preferColorPalette.light.textSecondary} text='Payments' onClick={() => { setScreen(2) }} />
                <ThemedButtonS2 lightTextColor={screen === 3 ? preferColorPalette.light.textPrimary : preferColorPalette.light.textSecondary} text='Members' onClick={() => { setScreen(3) }} />
            </View>
            <View style={moreStatisticsCardsStyles.statisticsCardComp}>{
                (() => {
                    switch (screen) {
                        case 1:
                            return <LendingDetailsComponent />;
                        case 2:
                            return <PaymentHistoryComponent />;
                        case 3:
                            return <TripMembersList />;
                        default:
                            return null; // Render nothing or a default component if needed
                    }
                })()
            }
                {/* {

                    screen === 1 ? <LendingDetailsComponent /> : <PaymentHistoryComponent />
                } */}
                {/* <LendingDetailsComponent />
                <PaymentHistoryComponent/> */}
            </View>
        </View>
    )
}

const TripMembersList = () => {
    const { liveTripOfUser, loadingFetchliveTrip, completeTripDetails, liveTripMembers } = useAppSelector((state) => state.trip)
    const members = completeTripDetails?.tripUsersArray;
    useEffect(()=>{
        console.log("here i am m............>")
        console.log(liveTripMembers)
    },[])
    return (
        <View style={tripMembersListStyles.tripMemberListComp}>
            {
                liveTripMembers?.map((member: any, index:number) => {
                    console.log(member)
                    console.log(completeTripDetails)
                    return (
                        <View style={tripMembersListStyles.tripMemberListCompChip} key={index}>
                            <Image style={tripMembersListStyles?.tripMemberProfilePic} height={50} width={50} source={{ uri: member?.people?.profilePic }} />
                            <View style={{}}>
                                <Text style={{ fontSize: 18, fontWeight: '600', }}>{member?.people?.name}</Text>
                                <Text style={{ color: preferColorPalette.light.textSecondary, fontWeight: '400' }}>{member?.people?.emailId}</Text>
                            </View>
                            {/* <FontAwesome5 name="ellipsis-v" size={20} color='#44475b' /> */}
                        </View>
                    )
                })
            }
        </View>
    )
}

const LendingDetailsComponent = () => {
    const dispatch = useAppDispatch();
    const { completeTripDetails } = useAppSelector((state) => state.trip)
    const { fetchAllTripBasedLendingsLoading, tripLendings } = useAppSelector((state) => state.expense)

    useEffect(() => {
        dispatch(fetchAllLendingsOfUserTripBased(completeTripDetails?.id))
    }, [completeTripDetails])

    return (
        <View style={lendingDetailsComponentsStyle.lendingDetailsComponents}>
            {
                tripLendings.length === 0 && <Text>No Lendings Found</Text>
            }
            {
                tripLendings?.map((lending: any) => {
                    return (
                        <View key={lending.id} style={lendingDetailsComponentsStyle.lendingDetailsComponentsChip}>
                            <View style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipLeft}>
                                <Text style={{ fontSize: 20, fontWeight: '700', }}>{lending?.lender?.name}</Text>
                                <Text style={{ color: 'red', fontWeight: '500' }}>${lending?.amount} for {lending?.expense?.title}</Text>
                            </View>
                            <Pressable style={lendingDetailsComponentsStyle.lendingDetailsComponentsChipPressable}>
                                <Text style={{ fontSize: 18, lineHeight: 21, fontWeight: 'bold', letterSpacing: 0.25, color: '#fff', }}>Pay Back</Text>
                            </Pressable>
                        </View>
                    )
                })
            }
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

const tripMembersListStyles = StyleSheet.create({
    tripMemberListComp: {
        width: '100%',
        gap: 15
    },
    tripMemberListCompChip: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        gap: 10
    },
    tripMemberProfilePic: {
        height: 50,
        width: 50,
        borderRadius: 10
    }
})

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

const extraStyles = StyleSheet.create({
    halfCircle: {
        position: 'absolute',
        top: -100,
        right: -90,
        width: 200,
        height: 200,
        borderRadius: 100,
        // backgroundColor:'#cedfe8'
        backgroundColor: preferColorPalette.light.bubbleColor,
    }
})