import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook/hooks'
import { addNewTripExpense } from '@/redux/actions/expenseAction'
const preferColorPalette = ColorsEmereldGreen;

const listExpense = () => {
  interface Controller {
    value: string | any;
    error: string | null;
  }
  type FormControllers = Record<string, Controller>;


  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedBottomSheet, setSelectedBottomSheet] = useState(null);
  const [formControllers, setFormControllers] = useState<FormControllers>({});


  const handlePresentModalPress = useCallback((component: any) => {
    setSelectedBottomSheet(component)
    bottomSheetModalRef.current?.present();
  }, []);

  const handleRemoveModalPress = useCallback(() => {
    setSelectedBottomSheet(null)
    bottomSheetModalRef.current?.close();
  }, []);

  const dispatch = useAppDispatch();
  const {completeTripDetails} = useAppSelector((state) => state.trip)

  const saveExpenseHandler = () => {
    dispatch(addNewTripExpense({data:formControllers, tripId:completeTripDetails.id}));
  }

  return (
    <ThemedView style={styles.listExpenseContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
      <BottomSheetModalProvider>
        <SafeAreaView>
          <ListExpensePageHeading saveExpenseHandler={saveExpenseHandler}/>

          <LoadingPopup />
          <ExpenseForm handlePresentModalPress={handlePresentModalPress} formControllers={formControllers} setFormControllers={setFormControllers} handleRemoveModalPress={handleRemoveModalPress} />

        </SafeAreaView>
        <BottomSheetParentComponent bottomSheetModalRef={bottomSheetModalRef} component={selectedBottomSheet} />
      </BottomSheetModalProvider>

    </ThemedView>
  )
}

const ExpenseForm = ({ handlePresentModalPress, formControllers, setFormControllers, handleRemoveModalPress }: any) => {

  const handleChange = (fieldname: string, text: string) => {
    const value = text
    // Update the state
    setFormControllers((prevControllers: any) => ({
      ...prevControllers,
      [fieldname]: {
        ...prevControllers[fieldname],
        value: value,
        error: null,
      },
    }));
  };

  //TODO: move it to right place
  useEffect(()=>{
    //set dropdown values
    setFormControllers((prevControllers: any) => ({
      ...prevControllers,
      ['splitPattern']: {
        ...prevControllers['splitPattern'],
        value: 'equal',
        error: null,
      },
    }));
  },[])



  const SelectedPaymentMethodComp = () => {
    return (
      <Pressable onPress={() => { handlePresentModalPress(<PaymentOptions formControllers={formControllers} setFormControllers={setFormControllers} handleRemoveModalPress={handleRemoveModalPress} />) }}>
        <View style={ExpanseFormStyles.selectedPaymentMethodComp}>
          <View style={ExpanseFormStyles.selectedPaymentMethodCompAddButton}>
            {
              formControllers['paymentMethod']?.value ? <Image style={{ width: 40, height: 40, borderRadius: 10, }} source={{ uri: formControllers['paymentMethod']?.value.image }} />
                : <FontAwesome5 name="plus" size={17} color={preferColorPalette.light.tint} />
            }
            <Text style={{ fontSize: 16, fontWeight: '500', color: preferColorPalette.light.textPrimary }}>{formControllers['paymentMethod']?.value.text || "Add Payment Method"}</Text>
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
                <NewFormCompInputs data={data} handlePresentModalPress={handlePresentModalPress} handleChange={handleChange} formControllers={formControllers} setFormControllers={setFormControllers} />
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
                <SelectSplitPatterComponet handlePresentModalPress={handlePresentModalPress} formControllers={formControllers} setFormControllers={setFormControllers} handleRemoveModalPress={handleRemoveModalPress}/>
              </View>
            }
          })
        }
        <View style={ExpanseFormStyles.newExpenseFormView}>
          <Text style={ExpanseFormStyles.newExpenseFormViewText}>Select members</Text>
          <ExpenseFormMembersComp formControllers={formControllers} setFormControllers={setFormControllers} />
        </View>


      </View>

    </ScrollView>
  )
}


const SelectSplitPatterComponet = ({ handlePresentModalPress, formControllers, setFormControllers , handleRemoveModalPress}: any) => {
  const splitPatterns = [
    {
      title: "Equally Split",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, numquam!",
      key: 'equal',
    },
    {
      title: "Custom Split",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, numquam!",
      key: 'custom',
    }
  ]

  return (
    <Pressable onPress={() => handlePresentModalPress(<SplitScreenOptions formControllers={formControllers} setFormControllers={setFormControllers} handleRemoveModalPress={handleRemoveModalPress} />)}>
      <View style={selectSplitPatterComponetStyle.selectSplitPatterComponet}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: preferColorPalette.light.textPrimary }}>{splitPatterns.find((pattern)=>pattern.key === formControllers['splitPattern']?.value)?.title}</Text>
        <FontAwesome5 name="angle-down" color={preferColorPalette.light.textSecondary} size={25} />
      </View>
    </Pressable>
  )

}

const SplitScreenOptions = ({ formControllers, setFormControllers, handleRemoveModalPress }: any) => {
  const splitPatterns = [
    {
      title: "Equally Split",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, numquam!",
      key: 'equal',
    },
    {
      title: "Custom Split",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, numquam!",
      key: 'custom',
    }
  ]

  const setSelectedOption = (val:string) => {
    setFormControllers((prevControllers: any) => ({
      ...prevControllers,
      ['splitPattern']: {
        ...prevControllers['splitPattern'],
        value: val,
        error: null,
      },
    }));

    handleRemoveModalPress()

  }

  // useEffect(()=>{
  //   if(!formControllers['splitPattern']?.value){
  //     setSelectedOption(splitPatterns[0].key);
  //     console.log("setting ----------------------")
  //   }
  // },[formControllers])

  return (
    <View style={{ display: 'flex', gap: 15 }}>
      {
        splitPatterns?.map((pattern): any => {
          return <Pressable style={selectSplitPatterComponetStyle.selectSplitPatterComponetMain} onPress={()=>setSelectedOption(pattern.key)}>
            <View style={[selectSplitPatterComponetStyle.splitScreenOption]}>
              <Text style={selectSplitPatterComponetStyle.optionPrimaryText}>{pattern.title}</Text>
              <Text style={{ color: preferColorPalette.light.textSecondary }}>{pattern.description}</Text>
            </View>
            {
              formControllers['splitPattern']?.value === pattern.key ?<View style={selectSplitPatterComponetStyle.selected} /> :<FontAwesome5 size={30} name="circle" color="grey" />
            }
            
          </Pressable>
        })
      }
      
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
    backgroundColor: '#fff',
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

const PaymentOptions = ({ formControllers, setFormControllers, handleRemoveModalPress }: any) => {
  //child component to render the payment methods

  const PaymentOptionChip = ({ data }: any) => {

    const selectPaymentMethod = () => {
      setFormControllers((prevControllers: any) => ({
        ...prevControllers,
        ['paymentMethod']: {
          ...prevControllers['paymentMethod'],
          value: data,
          error: null,
        },
      }));
      handleRemoveModalPress()
    }
    return (
      <Pressable style={[ExpanseFormStyles.memberChip, { padding: 10, justifyContent: 'space-between' }]} onPress={selectPaymentMethod}>
        <View style={ExpanseFormStyles.memberChip}>
          <Image style={{ width: 40, height: 40, borderRadius: 10, }} source={{ uri: data.image }} />
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: preferColorPalette.light.textPrimary }}>{data.text}</Text>
            <Text style={{ color: preferColorPalette.light.tint, fontWeight: '700' }}>{data.secondaryText}</Text>

          </View>
        </View>

        <View>
          {
            formControllers['paymentMethod']?.value?.text === data.text ?
              <FontAwesome5 size={25} name="circle" color={preferColorPalette.light.primary} /> :
              <Pressable onPress={() => console.log(formControllers)}>
                <FontAwesome5 size={25} name="circle" color="grey" />

              </Pressable>
          }

        </View>
      </Pressable>
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


const ExpenseFormMembersComp = ({ formControllers, setFormControllers }: any) => {
  interface MemberAndAmount {
    userId: number;
    amount: number;
  }

  const { liveTripOfUser, loadingFetchliveTrip } = useAppSelector((state) => state.trip);
  const tripMembers = liveTripOfUser?.tripUsers;
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [membersAndAmt, setMembersAndAmt] = useState<MemberAndAmount[]>([]);

  const amount = formControllers['budget']?.value;

  const selectUser = (userId: number) => {
    console.log("Adding user")
    setSelectedMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
    calculateAmount()
  };

  const calculateAmount = useCallback(() => {
    console.log("Calculating the value")
    let sp = "Equal"
    if (sp === 'Equal' && selectedMembers.length > 0) {
      const dividedAmount = amount / selectedMembers.length;
      console.log(dividedAmount)
      console.log(amount)
      console.log(selectedMembers)
      const dataset: MemberAndAmount[] = selectedMembers.map((member) => ({
        userId: member,
        amount: parseFloat(dividedAmount.toFixed(2)), // Format to 2 decimal places
      }));
      setMembersAndAmt(dataset);

      setFormControllers((prevControllers: any) => ({
        ...prevControllers,
        ['addedMembers']: {
          ...prevControllers['addedMembers'],
          value: dataset,
          error: null,
        },
      }));

    } else {
      setMembersAndAmt([]); // Clear if no members are selected
    }
  }, [amount, selectedMembers]);

  useEffect(() => {
    calculateAmount();
  }, [calculateAmount, selectedMembers]);



  const MemberChip = ({ member }: any) => {
    let foundMember = membersAndAmt.find((item) => item.userId === member?.userId);

    useEffect(() => {
      foundMember = membersAndAmt.find((item) => item.userId === member?.userId);
    }, [foundMember, membersAndAmt])
    return (
      <Pressable
        style={[ExpanseFormStyles.memberChip, { padding: 10, justifyContent: 'space-between' }]}
        onPress={() => selectUser(member.userId)}
      >
        <View style={ExpanseFormStyles.memberChip}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 10 }}
            source={{
              uri: "https://scontent.fpat2-3.fna.fbcdn.net/v/t39.30808-6/449852965_1918058475312331_1887972380337288764_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=conRr-EdwXUQ7kNvgFV0ly4&_nc_ht=scontent.fpat2-3.fna&oh=00_AYClf5Hl_azBEG5im8Ohyt-Fne2CqAKd55hq58slgY9zHQ&oe=66FCAD95",
            }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: preferColorPalette.light.textPrimary }}>
              {member?.people?.name}
            </Text>
            <Text style={{ color: preferColorPalette.light.tint, fontWeight: '700' }}>
              {foundMember ? `$${foundMember.amount}` : "Add me"}
            </Text>
          </View>
        </View>

        <View>
          {
            foundMember ? <FontAwesome5 size={25} name="circle" color={preferColorPalette.light.primary} /> : <FontAwesome5 size={25} name="circle" color="grey" />
          }

        </View>
      </Pressable>
    );
  };

  return (
    <View style={ExpanseFormStyles.expenseFormMembersComp}>
      {tripMembers?.map((member: any) => (
        <MemberChip key={member.userId} member={member} />
      ))}
    </View>
  );
};


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
    // width: '65%',
    borderRadius: 20

  }


})

function ListExpensePageHeading({saveExpenseHandler}:any) {
  const router = useRouter()
  

  return (
    <View style={headerStyles.headerComp}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <Pressable onPress={() => router.dismiss()}>
          <FontAwesome5 name="chevron-left" size={20} color='#44475b' />
        </Pressable>
        <ThemedText type='subtitle' lightColor={preferColorPalette.light.primary} >List Expense</ThemedText>
      </View>

      <ThemedIconButton lightBackgroundColor={preferColorPalette.light.primary} text='Save' icon={'plus-circle'} onClick={saveExpenseHandler} />
    </View>
  )
}

export default listExpense

const headerStyles = StyleSheet.create({
  headerComp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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

  }
})

