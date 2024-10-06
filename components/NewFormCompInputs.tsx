import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useThemeColor } from '@/hooks/useThemeColor'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { ColorsEmereldGreen } from '@/constants/Colors';
import CurrencyDropdown from './CurrencyDropdown';
type FormProps = {
    data: {
        id: number,
        label: string,
        inputType: string,
        name: string,
        placeholder: string,
        required: boolean,
    },
    handlePresentModalPress: any
}
const preferColorPalette = ColorsEmereldGreen;

export const NewFormCompInputs = ({ data, handlePresentModalPress }: FormProps) => {
    const color = useThemeColor({ light: preferColorPalette.light.textSecondary, dark: "#ef4f5f" }, 'text')
    const [borderColor, setBorderColor] = useState<string>(color)
    let content;
    switch (data.inputType) {
        case 'text':
            content = <TextInput onFocus={() => setBorderColor(preferColorPalette.light.secondarydark)}
                onBlur={() => setBorderColor(color)} placeholder={data.placeholder} style={[styles.textInput, { borderColor: borderColor }]} />
            break

        case 'numeric':
            content = <TextInput keyboardType='numeric' onFocus={() => setBorderColor(preferColorPalette.light.secondarydark)}
                onBlur={() => setBorderColor(color)} placeholder={data.placeholder} style={[styles.textInput, { borderColor: borderColor }]} />
            break;

        case 'date':
            content = <CalendarInputComponent />
            break

        case 'longtext':
            content = <TextInput onFocus={() => setBorderColor(preferColorPalette.light.secondarydark)} multiline={true}
                onBlur={() => setBorderColor(color)} placeholder={data.placeholder} style={[styles.textInput, { borderColor: borderColor }, { height: 100 }]} />
            break

        case 'addpeople':
            content = <AddPeopleFormComponent />
            break

        case 'currency':
            content = <BudgetInputFieldComponent handlePresentModalPress={handlePresentModalPress} />
            break
    }

    return content

}

const BudgetInputFieldComponent = ({ handlePresentModalPress }: any) => {

    return (
        <View style={budgetInputFieldComponentStyles.budgetInputFieldComponent}>
            <CurrencySelectorDropdown handlePresentModalPress={handlePresentModalPress} />
            <View style={{ borderWidth: 1, borderColor: preferColorPalette.light.secondarydark, height: 30, backgroundColor: '#ef4f5f', borderRadius: 3 }} />
            <TextInput style={budgetInputFieldComponentStyles.budgetInputFieldComponentField} keyboardType='numeric' />
        </View>
    )
}

const CurrencySelectorDropdown = ({ handlePresentModalPress }: any) => {

    return (
        <Pressable onPress={()=>handlePresentModalPress(<CurrencyDropdown/>) }>
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

const AddPeopleFormComponent = () => {

    return (
        <ScrollView>
            <View style={addPeopleToFormCompStyles.addPeopleToFormComp}>
                <AddedPeopleChip />
                <AddedPeopleChip />
                <AddNewPeopleButton />
            </View>
        </ScrollView>
    )
}



const AddNewPeopleButton = () => {

    return (
        <Pressable>
            <View style={addPeopleToFormCompStyles.addNewPeopleBtn}>
                <FontAwesome5 name="plus" size={18} color={preferColorPalette.light.primary} />
                <Text style={{ color: 'grey', fontWeight: '600', fontSize: 15 }}>Add People</Text>
            </View>
        </Pressable>
    )
}

const AddedPeopleChip = () => {
    const [showDeletePressable, setShowDeletePressable] = useState<boolean>(false);
    const clickOnChipHandler = () => {
        setShowDeletePressable(false);
    }


    return <Pressable onLongPress={() => setShowDeletePressable(true)} onPress={clickOnChipHandler}>
        <View style={addPeopleToFormCompStyles.addedPeopleChip}>
            <View style={addPeopleToFormCompStyles.addedPeopleChipIconBox}>
                <FontAwesome5 name="user-secret" size={18} color={preferColorPalette.light.primary} />
            </View>
            <Text style={{ color: preferColorPalette.light.textPrimary, fontWeight: '600', fontSize: 15 }}>Subham</Text>
            {showDeletePressable &&
                <Pressable style={{ marginLeft: 5 }}>
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
        paddingRight: 10,
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

const CalendarInputComponent = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [pickedUpDate, setPickedUpDate] = useState<Date>()
    const hideDatePicker = () => {
        setIsVisible(false);
    };

    const textColor = !pickedUpDate ? "grey" : "black"

    const handleConfirm = (date: Date) => {
        setPickedUpDate(date)
        hideDatePicker();
    };


    return <View style={calendarInputStyles.calendarInputContainer}>

        <Pressable style={calendarInputStyles.calendarInputContainerClickableBtn} onPress={() => { setIsVisible(true) }}>
            <FontAwesome5 name={"calendar-alt"} style={calendarInputStyles.iconStyle} />
            <Text style={[calendarInputStyles.calendarInputContainerClickableTxt, { color: textColor }]}>{!pickedUpDate ? "Pick a begin date" : pickedUpDate.toLocaleDateString()}</Text>
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