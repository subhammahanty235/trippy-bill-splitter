import { Button, Pressable, StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
// import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useThemeColor } from '@/hooks/useThemeColor'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ColorsEmereldGreen } from '@/constants/Colors';
import CurrencyDropdown from './CurrencyDropdown';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook/hooks';
import { removeConnectionFromList } from '@/redux/actions/tripAction';
import SelectConnection from './SelectConection';
type FormProps = {
    data: {
        id: number,
        label: string,
        inputType: string,
        name: string,
        placeholder: string,
        required: boolean,
    },
    handlePresentModalPress?: any,
    handleChange?: any,
    formControllers?:any,
    setFormControllers?:any
}
const preferColorPalette = ColorsEmereldGreen;

export const NewFormCompInputs = ({ data, handlePresentModalPress , handleChange, formControllers, setFormControllers}: FormProps) => {
    const color = useThemeColor({ light: preferColorPalette.light.textSecondary, dark: "#ef4f5f" }, 'text')
    const [borderColor, setBorderColor] = useState<string>(color)
    let content;
    switch (data.inputType) {
        case 'text':
            content = <TextInput onFocus={() => setBorderColor(preferColorPalette.light.secondarydark)}
                onBlur={() => setBorderColor(color)} placeholder={data.placeholder} style={[styles.textInput, { borderColor: borderColor }]} value={formControllers[data.name]?.value} onChangeText={(text) => handleChange(data.name, text)}/>
            break

        case 'numeric':
            content = <TextInput keyboardType='numeric' onFocus={() => setBorderColor(preferColorPalette.light.secondarydark)}
                onBlur={() => setBorderColor(color)} placeholder={data.placeholder} style={[styles.textInput, { borderColor: borderColor }]} value={formControllers[data.name]} onChangeText={(text) => handleChange(data.name, text)}/>
            break;

        case 'date':
            content = <CalendarInputComponent name={data.name} placeholder={data.placeholder} setFormControllers={setFormControllers}/>
            break

        case 'longtext':
            content = <TextInput onFocus={() => setBorderColor(preferColorPalette.light.secondarydark)} multiline={true}
                onBlur={() => setBorderColor(color)} placeholder={data.placeholder} style={[styles.textInput, { borderColor: borderColor }, { height: 100 }]} value={formControllers[data.name]?.value} onChangeText={(text) => handleChange(data.name, text)}/>
            break

        case 'addpeople':
            content = <AddPeopleFormComponent handlePresentModalPress={handlePresentModalPress} />
            break

        case 'currency':
            content = <BudgetInputFieldComponent handlePresentModalPress={handlePresentModalPress} setFormControllers={setFormControllers}/>
            break 
    }

    return content

}

const BudgetInputFieldComponent = ({ handlePresentModalPress , setFormControllers}: any) => {

    const inputBudgetHandler = (text:number) => {
        setFormControllers((prevControllers: any) => ({
            ...prevControllers,
            "budget": {
                ...prevControllers["budget"],
                value: text,
                error: null,
            },
        }));
    }
    

    return (
        <View style={budgetInputFieldComponentStyles.budgetInputFieldComponent}>
            <CurrencySelectorDropdown handlePresentModalPress={handlePresentModalPress} setFormControllers={setFormControllers}/>
            <View style={{ borderWidth: 1, borderColor: preferColorPalette.light.secondarydark, height: 30, backgroundColor: '#ef4f5f', borderRadius: 3 }} />
            <TextInput style={budgetInputFieldComponentStyles.budgetInputFieldComponentField} keyboardType='numeric' onChangeText={(text) => inputBudgetHandler(parseInt(text))}/>
        </View>
    )
}

const CurrencySelectorDropdown = ({ handlePresentModalPress , setFormControllers}: any) => {

    return (
        <Pressable onPress={() => handlePresentModalPress(<CurrencyDropdown setFormControllers={setFormControllers}/>)}>
            <View style={currencySelectorDropdownStyle.currencySelectorDropdownComponent}>
                <FontAwesome5 name="dollar-sign" size={18} />
                <FontAwesome5 name="caret-down" size={18} />
            </View>
        </Pressable>
    )
}

const budgetInputFieldComponentStyles = StyleSheet.create({
    budgetInputFieldComponent: {
        borderColor: 'grey',
        borderWidth: 1.5,
        padding: 10,
        height: 50,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    budgetInputFieldComponentField: {
        width: '80%',
        fontSize: 18,
        fontWeight: '600'
    }
})

const currencySelectorDropdownStyle = StyleSheet.create({
    currencySelectorDropdownComponent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 5
    }
})

const AddPeopleFormComponent = ({ handlePresentModalPress }: any) => {
    const {listedConnections } = useAppSelector((state) => state.trip);

    
    return (
        <ScrollView>
            <View style={addPeopleToFormCompStyles.addPeopleToFormComp}>
                {
                    listedConnections.map((connection) => {
                        return <AddedPeopleChip connection={connection} />
                    })
                }
                <AddNewPeopleButton handlePresentModalPress={handlePresentModalPress} />
            </View>
        </ScrollView>
    )
}



const AddNewPeopleButton = ({ handlePresentModalPress }: any) => {

    return (
        <Pressable onPress={()=>handlePresentModalPress(<SelectConnection/>)}>
            <View style={addPeopleToFormCompStyles.addNewPeopleBtn}>
                <FontAwesome5 name="plus" size={18} color={preferColorPalette.light.primary} />
                <Text style={{ color: 'grey', fontWeight: '600', fontSize: 15 }}>Add People</Text>
            </View>
        </Pressable>
    )
}

const AddedPeopleChip = ({ connection }: any) => {
    const dispatch = useAppDispatch();
    const [showDeletePressable, setShowDeletePressable] = useState<boolean>(false);
    let connectionDeatils = connection?.isPlcUser ? connection?.preLoggedConnectedUser : connection?.connectedUser;
    const clickOnChipHandler = () => {
        setShowDeletePressable(false);
    }

    const removeConnection = ()=>{
        dispatch(removeConnectionFromList(connection.connectionId))
    }

    return <Pressable onLongPress={() => setShowDeletePressable(true)} onPress={clickOnChipHandler}>
        <View style={addPeopleToFormCompStyles.addedPeopleChip}>
            <View style={addPeopleToFormCompStyles.addedPeopleChipIconBox}>
                <Image style={{ width: 30, height: 30, borderRadius: 50 }} source={{ uri: connectionDeatils?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIEPAnn2ZgyEbnturIYDy5ga7_PI0HabV6Q&s" }} />

                {/* <FontAwesome5 name="user-secret" size={18} color={preferColorPalette.light.primary} /> */}
            </View>
            <Text style={{ color: preferColorPalette.light.textPrimary, fontWeight: '600', fontSize: 15 }}>{connectionDeatils?.name}</Text>
            {showDeletePressable &&
                <Pressable style={{ marginLeft: 5 }} onPress={removeConnection}>
                    <FontAwesome5 name="times-circle" size={15} />
                </Pressable>
            }
        </View>
    </Pressable>

}

const SearchPeopleDialog = () => {

}

const addPeopleToFormCompStyles = StyleSheet.create({
    addPeopleToFormComp: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 10,
        columnGap: 10,
        overflow: 'scroll'

    },
    addNewPeopleBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        borderColor: 'grey',
        borderWidth: 1.5,
        padding: 10,
        borderRadius: 20
    },
    addedPeopleChip: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        borderColor: preferColorPalette.light.primary,
        borderWidth: 1.5,
        padding: 5,
        
        borderRadius: 20,
        
    },
    addedPeopleChipIconBox: {
        backgroundColor: preferColorPalette.light.secondary,
        height: 27,
        width: 27,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14
    }
})

const CalendarInputComponent = ({name ,placeholder,  setFormControllers}:any) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [pickedUpDate, setPickedUpDate] = useState<Date>()
    const hideDatePicker = () => {
        setIsVisible(false);
    };

    const textColor = !pickedUpDate ? "grey" : "black"

    const handleConfirm = (date: Date) => {
        setPickedUpDate(date)
        setFormControllers((prevControllers:any) => ({
            ...prevControllers,
            [name]: {
              ...prevControllers[name],
              value: date,
              error: null, 
            },
          }));
        hideDatePicker();
    };


    return <View style={calendarInputStyles.calendarInputContainer}>

        <Pressable style={calendarInputStyles.calendarInputContainerClickableBtn} onPress={() => { setIsVisible(true) }}>
            <FontAwesome5 name={"calendar-alt"} style={calendarInputStyles.iconStyle} />
            <Text style={[calendarInputStyles.calendarInputContainerClickableTxt, { color: textColor }]}>{!pickedUpDate ? placeholder : pickedUpDate.toLocaleDateString()}</Text>
        </Pressable>

        <DateTimePickerModal
            isVisible={isVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
    </View>

}


export default NewFormCompInputs

const calendarInputStyles = StyleSheet.create({
    calendarInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: 'grey',
        borderWidth: 1.5,
        alignItems: 'center',
        padding: 10,
        borderRadius: 7,
        height: 50,

    },
    iconStyle: {
        fontSize: 20,
        color: preferColorPalette.light.primary,
    },
    calendarInputContainerClickableBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

    },
    calendarInputContainerClickableTxt: {
        marginLeft: 10,
        fontWeight: '600'
    }
})

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,

    }
})