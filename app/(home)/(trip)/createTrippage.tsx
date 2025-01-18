import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { ThemedButtonS1 } from '@/components/ThemedButtonS1'
import { ThemedIconButton } from '@/components/ThemedIconButton'
import NewTripFromData from '@/constants/newTripFrom.json'
import NewFormCompInputs from '@/components/NewFormCompInputs'
import { ColorsEmereldGreen } from '@/constants/Colors'
import { BottomSheetParentComponent } from '@/components/BottomSheetParentComponent'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook/hooks'
import { getAllConnections } from '@/redux/actions/conectionAction'
import { createNewTrip } from '@/redux/actions/tripAction'
const preferColorPalette = ColorsEmereldGreen;

export default function newTrip() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedBottomSheet, setSelectedBottomSheet] = useState();
  // const [formControllers, setFormControllers] = useState({});
  const dispatch = useAppDispatch();
  const handlePresentModalPress = useCallback((component: any) => {

    setSelectedBottomSheet(component)
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    dispatch(getAllConnections(1))
  }, [dispatch])




  return (

    <ThemedView style={styles.homepageContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
      <BottomSheetModalProvider>
        <View style={extraStyles.halfCircle} />
        <SafeAreaView>
          <NewTripPageHeading />
          <NewTripForm handlePresentModalPress={handlePresentModalPress} />
          <BottomSheetParentComponent bottomSheetModalRef={bottomSheetModalRef} component={selectedBottomSheet} />

        </SafeAreaView>
        {/* <AddConnectionPopup visible={true} onClose={() => { }} /> */}
      </BottomSheetModalProvider>
    </ThemedView>

  )
}

function NewTripForm({ handlePresentModalPress }: any) {
  interface Controller {
    value: string | any;
    error: string | null;
  }
  type FormControllers = Record<string, Controller>;

  const [formControllers, setFormControllers] = useState<FormControllers>({});
  const dispatch = useAppDispatch();

  const handleChange = (fieldname: string, text: string) => {
    const value = text
    console.log(value)

    // Update the state
    setFormControllers((prevControllers) => ({
      ...prevControllers,
      [fieldname]: {
        ...prevControllers[fieldname],
        value: value,
        error: null,
      },
    }));
  };

  const { loading, listedConnections } = useAppSelector((state) => state.trip);
  const handleSubmitForm = () => {
    if (listedConnections.length > 0) {
      console.log(listedConnections);

      const listedConnectionIds = listedConnections.map((connection) => ({
        isPlcUser: connection.isPlcUser,
        id: connection.isPlcUser
          ? connection?.preLoggedConnectedUser?.id
          : connection?.connectedUser?.id,
      }));
      const updatedFormControllers = {
        ...formControllers,
        addedpeople: {
          ...formControllers["addedpeople"],
          value: listedConnectionIds,
          error: null,
        },
      };

      dispatch(createNewTrip(updatedFormControllers));
    } else {
      dispatch(createNewTrip(formControllers));
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.newTripForm}>
        {
          NewTripFromData.map((data) => {
            if (data.id !== 5) {
              return <View style={styles.newTripFormView}>
                <Text style={styles.newTripFormViewText}>{data.label}</Text>
                <NewFormCompInputs data={data} handlePresentModalPress={handlePresentModalPress} handleChange={handleChange} formControllers={formControllers} setFormControllers={setFormControllers} />
              </View>
            }
          })
        }
      </View>
      <ThemedButtonS1 lightBackgroundColor={preferColorPalette.light.tabIconSelected} text='Create' onClick={handleSubmitForm} />
    </ScrollView>
  )
}

function NewTripPageHeading() {
  const router = useRouter()

  const navigateToJoinTrip = () => {
    router.push("/joinTripPage")
  }

  return (
    <View style={headerStyles.headerComp}>
      <ThemedText type='subtitle' lightColor={preferColorPalette.light.primary}>Create a trip</ThemedText>
      <View style={headerStyles.headerCompLine} />
      <Text style={{ color: 'grey' }}>or</Text>
      <View style={headerStyles.headerCompLineSec} />
      <ThemedIconButton lightBackgroundColor={preferColorPalette.light.primary} text='Join' icon={'suitcase-rolling'} onClick={navigateToJoinTrip} />
    </View>
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
  newTripForm: {
    display: 'flex',
    gap: 20,
    marginTop: 20,
    marginBottom: 20
  },
  newTripFormView: {

  },
  newTripFormViewText: {
    color: 'grey',
    fontWeight: '600',
    marginBottom: 5
  }
})

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

const extraStyles = StyleSheet.create({
  halfCircle: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: preferColorPalette.light.bubbleColor,
  },
})