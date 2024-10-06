import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { Ref, useCallback, useMemo, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { ThemedIconButton } from '@/components/ThemedIconButton'
import { ColorsEmereldGreen } from '@/constants/Colors'
import { ThemedView } from '@/components/ThemedView'
import { FontAwesome5 } from '@expo/vector-icons'
import TripExpenseFormData from '@/constants/tripExpenseForm.json'
import NewFormCompInputs from '@/components/NewFormCompInputs'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import LoadingPopup from '@/components/LoadingPopup'
import LottieView from 'lottie-react-native';
const preferColorPalette = ColorsEmereldGreen;

const listExpense = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedBottomSheet, setSelectedBottomSheet] = useState();

  const handlePresentModalPress = useCallback((component: any) => {

    setSelectedBottomSheet(component)
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <ThemedView style={styles.listExpenseContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
      <BottomSheetModalProvider>
        <SafeAreaView>
          <ListExpensePageHeading />

          <LoadingPopup />
          <ExpenseForm handlePresentModalPress={handlePresentModalPress} />

        </SafeAreaView>
        <BottomSheetParentComponent bottomSheetModalRef={bottomSheetModalRef} component={selectedBottomSheet} />
      </BottomSheetModalProvider>

    </ThemedView>
  )
}

const ExpenseForm = ({ handlePresentModalPress }: any) => {

  const SelectedPaymentMethodComp = () => {
    return (
      <Pressable onPress={() => { handlePresentModalPress(<PaymentOptions />) }}>
        <View style={ExpanseFormStyles.selectedPaymentMethodComp}>
          <View style={ExpanseFormStyles.selectedPaymentMethodCompAddButton}>
            <FontAwesome5 name="plus" size={17} color={preferColorPalette.light.tint} />
            <Text style={{ fontSize: 16, fontWeight: '500', color: preferColorPalette.light.textPrimary }}>Add Payment Method</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

      <View style={ExpanseFormStyles.newExpenseForm}>
        {
          TripExpenseFormData.map((data) => {
            if (data.id !== 5 && data.id !== 6 && data.id !== 7) {
              return <View key={data.id} style={ExpanseFormStyles.newExpenseFormView}>
                <Text style={ExpanseFormStyles.newExpenseFormViewText}>{data.label}</Text>
                <NewFormCompInputs data={data} handlePresentModalPress={handlePresentModalPress} />
              </View>
            }
            else if (data.id === 7) {
              return <View key={data.id} style={ExpanseFormStyles.newExpenseFormView}>
                <Text style={ExpanseFormStyles.newExpenseFormViewText}>{data.label}</Text>
                <SelectedPaymentMethodComp />
              </View>
            }

            else if (data.id === 6) {
              return <View key={data.id} style={ExpanseFormStyles.newExpenseFormView}>
                <Text style={ExpanseFormStyles.newExpenseFormViewText}>{data.label}</Text>
                <SelectSplitPatterComponet handlePresentModalPress={handlePresentModalPress} />
              </View>
            }
          })
        }
        <View style={ExpanseFormStyles.newExpenseFormView}>
          <Text style={ExpanseFormStyles.newExpenseFormViewText}>Select members</Text>
          <ExpenseFormMembersComp />
        </View>

        {/* <ThemedIconButton lightBackgroundColor={preferColorPalette.light.primary} text='open bottomsheet' icon={'plus-circle'} onClick={handlePresentModalPress} /> */}
        {/* <ThemedButtonS1/> */}
      </View>

    </ScrollView>
  )
}


const SelectSplitPatterComponet = ({ handlePresentModalPress }: any) => {

  return (
    <Pressable onPress={() => handlePresentModalPress(<SplitScreenOptions />)}>
      <View style={selectSplitPatterComponetStyle.selectSplitPatterComponet}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: preferColorPalette.light.textPrimary }}>Equally Split</Text>
        <FontAwesome5 name="angle-down" color={preferColorPalette.light.textSecondary} size={25} />
      </View>
    </Pressable>
  )

}

const SplitScreenOptions = () => {

  return (
    <View style={{ display: 'flex', gap: 15 }}>
      <View style={selectSplitPatterComponetStyle.selectSplitPatterComponetMain}>
        <View style={[selectSplitPatterComponetStyle.splitScreenOption]}>
          <Text style={selectSplitPatterComponetStyle.optionPrimaryText}>Equally Split</Text>
          <Text style={{ color: preferColorPalette.light.textSecondary }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, numquam!</Text>
        </View>
        <View style={selectSplitPatterComponetStyle.selected} />
      </View>
      <View style={selectSplitPatterComponetStyle.selectSplitPatterComponetMain}>
        <View style={[selectSplitPatterComponetStyle.splitScreenOption]}>
          <Text style={selectSplitPatterComponetStyle.optionPrimaryText}>Equally Split</Text>
          <Text style={{ color: preferColorPalette.light.textSecondary }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, numquam!</Text>
        </View>
        <View style={selectSplitPatterComponetStyle.notSelected} />
      </View>
    </View>
  )
}

const selectSplitPatterComponetStyle = StyleSheet.create({
  selectSplitPatterComponet: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: preferColorPalette.light.textSecondary,
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer'
  },
  selectSplitPatterComponetMain: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#ff',
    padding: 10,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 8, // Shadow radius
    elevation: 5, // Elevation for Android shadow
    borderWidth: 1,
    borderColor: preferColorPalette.light.textSecondary,
    borderRadius: 7
  },
  splitScreenOption: {
    //nothing now  
  },
  selected: {
    height: 30,
    width: 30,
    backgroundColor: preferColorPalette.light.primary,
    borderRadius: 15
  },
  notSelected: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderColor: preferColorPalette.light.textSecondary,
    borderRadius: 15
  },
  optionPrimaryText: {
    fontSize: 17,
    fontWeight: '600',
    color: preferColorPalette.light.tint,

  }
})

const PaymentOptions = () => {

  //child component to render the payment methods
  const PaymentOptionChip = ({ data }: any) => {
    return (
      <View style={[ExpanseFormStyles.memberChip, { padding: 10, justifyContent: 'space-between' }]}>
        <View style={ExpanseFormStyles.memberChip}>
          <Image style={{ width: 40, height: 40, borderRadius: 10, }} source={{ uri: data.image }} />
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: preferColorPalette.light.textPrimary }}>{data.text}</Text>
            <Text style={{ color: preferColorPalette.light.tint, fontWeight: '700' }}>{data.secondaryText}</Text>

          </View>
        </View>

        <View>
          <FontAwesome5 size={25} name="circle" color="grey" />
        </View>
      </View>
    )
  }

  return (
    <>

      <View style={paymentOptionsStyles.paymentOptions}>
        <PaymentOptionChip data={{ image: "https://img.freepik.com/free-vector/gold-coins-banknotes-3d-cartoon-style-icon-stack-coins-with-dollar-sign-wad-money-cash-savings-flat-vector-illustration-wealth-economy-finance-profit-currency-concept_74855-25998.jpg?t=st=1727184679~exp=1727188279~hmac=195f78d7286e2eb541078f8ee7967bd09a8ba9cc55204f9d3c0964d93a0ddee9&w=996", text: "Cash Payment", secondaryText: "Simple, secure, reliable." }} />
        <PaymentOptionChip data={{ image: "https://img.freepik.com/free-vector/realistic-credit-card-design_23-2149125393.jpg?t=st=1727185532~exp=1727189132~hmac=9f20946ff703251401639ad4238301f0f2241625c76f2395141bad3d50a726b6&w=996", text: "Card Payment", secondaryText: "Convenient, widely accepted." }} />
        <PaymentOptionChip data={{ image: "https://cdn.iconscout.com/icon/free/png-512/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp&w=512", text: "UPI Payment", secondaryText: "Instant, effortless, and secure" }} />
      </View>
    </>
  )
}

const paymentOptionsStyles = StyleSheet.create({
  paymentOptions: {
    display: 'flex',
    gap: 10

  }
})

const BottomSheetParentComponent = ({ bottomSheetModalRef, component }: any) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={{ padding: 20 }}>
        {
          component
        }
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const ExpenseFormMembersComp = () => {

  const MemberChip = () => {
    return (
      <View style={[ExpanseFormStyles.memberChip, { padding: 10, justifyContent: 'space-between' }]}>
        <View style={ExpanseFormStyles.memberChip}>
          <Image style={{ width: 40, height: 40, borderRadius: 10, }} source={{ uri: "https://scontent.fpat2-3.fna.fbcdn.net/v/t39.30808-6/449852965_1918058475312331_1887972380337288764_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=conRr-EdwXUQ7kNvgFV0ly4&_nc_ht=scontent.fpat2-3.fna&oh=00_AYClf5Hl_azBEG5im8Ohyt-Fne2CqAKd55hq58slgY9zHQ&oe=66FCAD95" }} />
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: preferColorPalette.light.textPrimary }}>Subham</Text>
            <Text style={{ color: preferColorPalette.light.tint, fontWeight: '700' }}>$20</Text>

          </View>
        </View>

        <View>
          <FontAwesome5 size={25} name="circle" color="grey" />
        </View>
      </View>
    )
  }

  return (
    <View style={ExpanseFormStyles.expenseFormMembersComp}>
      <MemberChip />
      <MemberChip />
      <MemberChip />
    </View>
  )
}

const ExpanseFormStyles = StyleSheet.create({
  newExpenseForm: {
    display: 'flex',
    gap: 20,
    marginTop: 20
  },
  newExpenseFormView: {},
  newExpenseFormViewText: {
    color: 'grey',
    fontWeight: '600',
    marginBottom: 5
  },
  expenseFormMembersComp: {
    display: 'flex',
    gap: 10
  },
  memberChip: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10,
    borderRadius: 10,
    gap: 10
  },
  selectedPaymentMethodComp: {
    display: 'flex',
    marginTop: 10
  },
  selectedPaymentMethodCompAddButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    width: '65%',
    borderRadius: 20

  }


})

function ListExpensePageHeading() {
  const router = useRouter()

  const navigateToJoinTrip = () => {
    router.push("/createTrippage")
  }

  return (
    <View style={headerStyles.headerComp}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Pressable onPress={() => router.dismiss()}>
          <FontAwesome5 name="chevron-left" size={20} color='#44475b' />
        </Pressable>
        <ThemedText type='subtitle' lightColor={preferColorPalette.light.primary} >List Expense</ThemedText>
      </View>

      <ThemedIconButton lightBackgroundColor={preferColorPalette.light.primary} text='Save' icon={'plus-circle'} onClick={navigateToJoinTrip} />
    </View>
  )
}

export default listExpense

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
  listExpenseContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 15
  }
})

