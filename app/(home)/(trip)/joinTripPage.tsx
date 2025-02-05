import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { ThemedIconButton } from '@/components/ThemedIconButton'
import { ThemedButtonS1 } from '@/components/ThemedButtonS1'
import { ThemedButtonS3 } from '@/components/ThemedButtonS3'
import { ColorsEmereldGreen } from '@/constants/Colors'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook/hooks'
import { searchTripUsingCode } from '@/redux/actions/tripAction'
import { checkTripStatus } from '@/helpers/checkTripStatus'
import { formatDate } from '@/helpers/dateHelper'

const preferColorPalette = ColorsEmereldGreen;

export default function joinTrip() {
    const router = useRouter();
    const { loadingSearchTripByCode, tripNotFoundUsingCode, tripFoundUsingCode } = useAppSelector((state) => state.trip)

    return (
        <ThemedView style={styles.homepageContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
            <SafeAreaView>
                <JoinTripPageHeading />
                <JoinTripComponent />
                {
                    loadingSearchTripByCode === true ?
                        <Text>Loading the trip</Text> :
                        tripNotFoundUsingCode ? <Text>Trip Not Found {tripNotFoundUsingCode} + {tripFoundUsingCode}</Text> : tripFoundUsingCode === true ? <TripFetchedDetailsComponent /> : <></>

                }
                {/* <TripFetchedDetailsComponent /> */}
            </SafeAreaView>
        </ThemedView>

    )
}

const JoinTripComponent = () => {
    const dispatch = useAppDispatch();
    const [tripCode, setTripCode] = useState<string>('');
    const searchTripHandler = () => {
        dispatch(searchTripUsingCode(tripCode));
    }


    return (
        <View style={joinTripComponentStyles.joinTripComponentBox}>
            <Text style={joinTripComponentStyles.joinTripComponentBoxHeaderTxt}>Enter the Code</Text>
            <Text style={{ color: preferColorPalette.light.textSecondary }}>Ask for the Trippy-code from the trip's existing members!</Text>
            <CodeEntryComponent setTripCode={setTripCode} />
            <ThemedButtonS1 text='Get Trip' lightBackgroundColor={preferColorPalette.light.tabIconSelected} onClick={searchTripHandler} />
        </View>
    )
}

const CodeEntryComponent = ({ setTripCode }: any) => {
    let codeLength = 6
    const [otp, setOtp] = useState<string[]>(Array(codeLength).fill(''));
    const inputs = useRef<Array<TextInput | null>>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const handleChangeText = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setCurrentIndex(index)
        setOtp(newOtp);

        if (text.length > 0 && index < codeLength - 1) {
            inputs.current[index + 1]?.focus();
        }

        if (text.length === 0 && index > 0) {
            inputs.current[index - 1]?.focus();
        }

        if (newOtp.every((value) => value.length > 0)) {
            setTripCode(newOtp.join(''));
        }
    };
    return (
        <View style={codeEntryComponentStyles.container}>
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    style={[codeEntryComponentStyles.inputBox, { borderColor: index === currentIndex ? preferColorPalette.light.textPrimary : preferColorPalette.light.textSecondary }]}
                    onChangeText={(text) => handleChangeText(text, index)}
                    value={digit}
                    keyboardType="numeric"
                    maxLength={1}
                    ref={(input) => (inputs.current[index] = input)}
                />
            ))}
        </View>
    )
}

const codeEntryComponentStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        marginTop: 10,
        marginBottom: 30,

    },
    inputBox: {
        marginBottom: 20,
        width: '15%',
        height: 55,
        borderBottomWidth: 1.5,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 25,
        marginRight: 6,
        fontWeight: '500',
        backgroundColor: '#fff',
    },
})

const joinTripComponentStyles = StyleSheet.create({
    joinTripComponentBox: {
        backgroundColor: '#fff',
        borderRadius: 20,
        // height: 200,
        marginTop: 20,
        padding: 20
    },
    joinTripComponentBoxHeaderTxt: {
        fontSize: 18,
        fontWeight: '600'
    }
})

const TripFetchedDetailsComponent = () => {
    const { searchedTrip } = useAppSelector((state) => state.trip)
    const tripStatus = checkTripStatus(searchedTrip.tripBeginDate, searchedTrip.tripEndDate);
    return (
        <View style={tripFetchedDetailsComponentStyles.tripfetchedComponent}>
            <View style={tripFetchedDetailsComponentStyles.tripfetchedComponentHeader}>
                <Text style={tripFetchedDetailsComponentStyles.tripfetchedComponentHeaderText}>{searchedTrip?.tripName}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <View style={{ height: 15, width: 15, backgroundColor: tripStatus?.color, borderRadius: 15 }} />
                    <Text style={{ color: tripStatus?.color, fontWeight: '600' }}>{tripStatus?.status}</Text>
                </View>
            </View>
            <Text style={{ color: 'grey', marginTop: 5 }}>{searchedTrip?.tripDescription}</Text>
            <View style={tripFetchedDetailsComponentStyles.startdateAndenddate}>
                <View style={tripFetchedDetailsComponentStyles.startdateAndendDateChip}>
                    <View style={{ height: 15, width: 15, backgroundColor: preferColorPalette.light.primary, borderRadius: 15 }} />
                    <Text style={{ fontWeight: '600', color: preferColorPalette.light.textPrimary }}>{tripStatus?.code === 1 ? "Starting" : "Started"} on {formatDate(searchedTrip.tripBeginDate)}</Text>
                </View>
                <View style={tripFetchedDetailsComponentStyles.datebar} />
                <View style={tripFetchedDetailsComponentStyles.startdateAndendDateChip}>
                    <View style={{ height: 15, width: 15, backgroundColor: preferColorPalette.light.primary, borderRadius: 15 }} />
                    <Text style={{ fontWeight: '600', color: preferColorPalette.light.textPrimary }}>{searchedTrip.tripEndDate === null ? "Not Ended Yet" : tripStatus?.code === 1 ? "Ending on" : "Ended on"} {searchedTrip.tripEndDate !== null ? formatDate(searchedTrip.tripEndDate) : ""}</Text>
                </View>



            </View>
            {/* <View style={{display:'flex' , flexDirection:'row' , justifyContent:'space-between' , alignItems:'center', width:'100%'}}>  */}
            {
                tripStatus?.code !== 3 && <ThemedButtonS3 text='Request to Join' lightBackgroundColor={preferColorPalette.light.primary} />
            }
            
            {/* <ThemedButtonS1 text='Request' lightBackgroundColor='#ef4f5f'/> */}
            {/* </View> */}

        </View>
    )
}

const tripFetchedDetailsComponentStyles = StyleSheet.create({
    tripfetchedComponent: {
        marginTop: 20
    },
    tripfetchedComponentHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tripfetchedComponentHeaderText: {
        fontSize: 20,
        fontWeight: '600'
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


function JoinTripPageHeading() {
    const router = useRouter()

    const navigateToJoinTrip = () => {
        router.push("/createTrippage")
    }

    return (
        <View style={headerStyles.headerComp}>
            <ThemedText type='subtitle' lightColor={preferColorPalette.light.primary}>Join a trip</ThemedText>
            <View style={headerStyles.headerCompLine} />
            <Text style={{ color: 'grey' }}>or</Text>
            <View style={headerStyles.headerCompLineSec} />
            <ThemedIconButton lightBackgroundColor={preferColorPalette.light.primary} text='Create' icon={'plus-circle'} onClick={navigateToJoinTrip} />
        </View>
    )
}

const headerStyles = StyleSheet.create({
    headerComp: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'black',
        justifyContent: 'space-between',
        gap: 10
    },
    headerCompLine: {
        borderColor: 'grey',
        borderWidth: 1,
        flex: 1,
    },
    headerCompLineSec: {
        borderColor: 'grey',
        borderWidth: 1,
        width: '2%'
    }
})


const styles = StyleSheet.create({
    homepageContainer: {
        flex: 1,
        width: '100%',
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
    }
})