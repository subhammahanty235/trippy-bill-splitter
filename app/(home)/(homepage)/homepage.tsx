import { Animated, ScrollView, StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Tabs, useRouter } from 'expo-router'
import DropdownH1 from '@/components/DropdownH1'
import { ThemedText } from '@/components/ThemedText'
import { FontAwesome5 } from '@expo/vector-icons'
import { ThemedButtonS1 } from '@/components/ThemedButtonS1'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedIconButton } from '@/components/ThemedIconButton'
import { ColorsEmereldGreen } from '@/constants/Colors'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook/hooks'
import { fetchLiveTripOfUser } from '@/redux/actions/tripAction'
import NoTripsFoundImage from '@/assets/images/no-live-tours-founds.png'
import { formatAmount } from '@/helpers/formatAmounts'
const preferColorPalette = ColorsEmereldGreen; 

export default function homepage() {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useAppDispatch()
  const { loadingFetchliveTrip } = useAppSelector((state) => state.trip)
  const cardDataArray: CardDataObj[] = [
    // {
    //   icon: 'globe-europe',
    //   headingT1: 'total', 
    //   headingT2: 'Trips',
    //   value: 50,
    //   totalvalue: 100, 
    //   hasTotalValue: true,
    // },
    {
      icon: 'coins',
      headingT1: 'total',
      headingT2: 'Expense',
      value: 7500,
      totalvalue: 150,
      hasTotalValue: true,
    },
    {
      icon: 'wallet',
      headingT1: 'my',
      headingT2: 'Expense',
      value: 300000,
      totalvalue: 60,
      hasTotalValue: true,
    },
    {
      icon: 'hand-holding-usd',
      headingT1: 'due',
      headingT2: 'Money',
      value: 90,
      totalvalue: 180,
      hasTotalValue: true,
    },
    {
      icon: 'wallet',
      headingT1: 'myy',
      headingT2: 'Expense',
      value: 30,
      totalvalue: 60,
      hasTotalValue: true,
    },
    {
      icon: 'hand-holding-usd',
      headingT1: 'duee',
      headingT2: 'Money',
      value: 80,
      totalvalue: 180,
      hasTotalValue: true,
    },
  ];
  const scrollY = useRef(new Animated.Value(0)).current;

  const chipHeight = scrollY.interpolate({
    inputRange: [0, 100], // Adjust these values based on your design
    outputRange: ['25%', '17%'], // Initial and final height of CurrentTripChip
    extrapolate: 'clamp',
  });

  const chipTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20], // Adjust the translateY value as needed
    extrapolate: 'clamp',
  });
  const chipMarginTopBottom = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['5%', '2%'], // Original and shrunk margin
    extrapolate: 'clamp',
  });

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    scrollY.setValue(scrollPosition);

    setIsVisible(scrollPosition < 50); 
  };

  useEffect(() => {
    dispatch(fetchLiveTripOfUser())
  }, [dispatch])

  return (
    <ThemedView style={styles.homepageContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>

      <View style={extraStyles.halfCircle} />
      <SafeAreaView>
        <HomePageHeading />

        <Animated.View
          style={[
            styles.currentTripChipContainer,
            {
              height: chipHeight,
              // padding: chipPadding,
              marginTop: chipMarginTopBottom,
              marginBottom: chipMarginTopBottom,
              borderRadius: 20,
            },

          ]}
        >
          {
            loadingFetchliveTrip === false ? <CurrentTripChip isVisible={isVisible}/> : <Text>Loading</Text>
          }

        </Animated.View>
        <View style={styles.filterDashboard} >
          <FontAwesome5 name="chevron-down" size={14} color={"#212529"} />
          <Text>All Time</Text>
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.innerHomePage}
          contentContainerStyle={styles.innerHomePage22}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          onScrollEndDrag={handleScroll}
          onScrollBeginDrag={handleScroll}
        >
          {cardDataArray?.map((cardObj: CardDataObj) => (
            <Cards key={cardObj.headingT1} dataObj={cardObj} />
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    </ThemedView>
  )
}

function CurrentTripChip({ isVisible }: any) {
  const { liveTripOfUser, loadingFetchliveTrip } = useAppSelector((state) => state.trip)
  const router = useRouter();

  const renderParticipateText = () => {
    let particpants = liveTripOfUser?.tripUsers
    particpants = particpants?.map((participant:any)=> participant.people)
    if (particpants.length === 0) {
      return "No one is in the Trip"
    }
    const names = particpants
      ?.slice(0, 1)
      ?.map((p:any) => p.name)
      ?.join(', ');

    const count = particpants.length > 1 ? ` and ${particpants.length - 1} others` : ''
    return `${names} ${count} in the Trip`
  }

  return (
    <View style={styles.currentTripChip}>
      <View style={styles.currentTripChip_tripName}>
        <ThemedText type='subtitle' lightColor={preferColorPalette.light.textPrimary}>{liveTripOfUser?.tripName}</ThemedText>
        <View style={styles.activeIndicator}>
          <View style={styles.activeIndicator_dot} />
          <Text style={styles.activeIndicator_text}>Active Now.</Text>
        </View>
      </View>
      <View style={styles.tripId_details}>
        <Text style={{ color: 'grey' }}>Trip ID: #{liveTripOfUser?.tripUniqueCode}</Text>
        <FontAwesome5 name={"copy"} color={"color"} />
      </View>

      <View style={styles.trip_members_box}>
        <FontAwesome5 name={"users"} size={18} />
        <Text style={styles.trip_members_box_text}>{renderParticipateText()}</Text>
      </View>
      {
        isVisible ?
          <ThemedButtonS1 lightBackgroundColor={preferColorPalette.light.tabIconSelected} text='Go to trip' onClick={() => { router.push('/(homepage)/liveTripDetails') }} />
          :
          <></>
      }
    </View>
  )
}

function HomePageHeading() {

  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <ThemedText style={{ marginBottom: 10 }} type='subtitle' lightColor={preferColorPalette.light.primary}>My dashboard</ThemedText>
      <FontAwesome5 name="bell" size={22} />
    </View>
  )
}

interface CardDataObj {
  icon: any,
  headingT1: string,
  headingT2: string,
  value: number,
  totalvalue: number,
  hasTotalValue: boolean,
}

function Cards({ dataObj }: { dataObj: CardDataObj }) {

  return (
    <View style={styles.card}>
      <View style={styles.cardTopSection}>
        <Text style={styles.headingT1}>{dataObj.headingT1}</Text>
        <FontAwesome5 name={dataObj.icon} size={20} color={preferColorPalette.light.primary} />
      </View>
      <Text style={styles.headingT2}>{dataObj.headingT2}</Text>

      <View style={styles.values}>
        <Text style={styles.value}>{formatAmount(dataObj.value)}</Text>
      </View>

    </View>
  )
}

function NoTripsFound() {
  return (
    <View style={NoTripstyles.container}>
      {/* <Image
        source={NoTripsFoundImage as ImageSourcePropType}
        style={NoTripstyles.image}
        resizeMode="contain" // Ensures the entire image is visible
      /> */}
      <ThemedButtonS1 lightBackgroundColor={preferColorPalette.light.primary} text='Join new Trip'/>
    </View>
  )
}

const NoTripstyles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:preferColorPalette.light.bubbleColor,
  },
  image: {
    margin:0,
    width: 150, // Adjust to your desired size
    height: 200, // Adjust to your desired size
  },
});

const styles = StyleSheet.create({
  currentTripChipContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  homepageContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  card: {
    width: "45%",
    height: 180,
    borderRadius: 20,
    backgroundColor: '#fff',
    display: 'flex',
    padding: '5%'

  },
  filterDashboard: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5
  },
  currentTripChip: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: '5%',
    marginBottom: '5%',
    padding: 15
  },

  currentTripChip_tripName: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  tripId_details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  activeIndicator: {
    borderColor: '#A6DBCA',
    borderWidth: 2,
    display: 'flex',
    columnGap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 10
  },
  activeIndicator_dot: {
    width: 10,
    height: 10,
    backgroundColor: '#01B584',
    borderRadius: 10
  },
  activeIndicator_text: {
    color: '#01B584',
  },
  cardTopSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  values: {
    marginTop: '15%',
    display: 'flex',
    alignItems: 'center',
  },
  trip_members_box: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15
  },
  trip_members_box_text: {
    fontSize: 17
  },
  value: {
    fontSize: 40
  },
  innerHomePage: {
    gap: 20,
    height: '70%',
    marginTop: '5%',

  },
  innerHomePage22: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20

  },
  headingT1: {
    fontSize: 16,
    fontWeight: '300',
    color: preferColorPalette.light.textSecondary
  },
  headingT2: {
    fontSize: 20,
    fontWeight: '600',
    color: preferColorPalette.light.textPrimary
  },

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
  },
})