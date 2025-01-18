import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Country } from 'country-state-city'
import getSymbolFromCurrency from 'currency-symbol-map'
import { ColorsEmereldGreen } from '@/constants/Colors';
const preferColorPalette = ColorsEmereldGreen;

const CurrencyDropdown = ({ setFormControllers }: any) => {
    const [selectedCountry, setSelectedCountry] = useState<string>("IN")
    const [inputFilter, setInputFilter] = useState<string>("")
    const countryList = Country.getAllCountries().map((item) => ({
        countryFlag: item.flag,
        countryName: item.name,
        countryIso: item.isoCode,
        currencyCode: item.currency,
    }));

    const selectCountry = (country: string) => {
        setFormControllers((prevControllers: any) => ({
            ...prevControllers,
            "defaultCurrency": {
                ...prevControllers["defaultCurrency"],
                value: country,
                error: null,
            },
        }));
        setSelectedCountry(country)
    }


    return (
        <View style={currencyDropdownStyles.currencyDropdownComponent}>
            <TextInput placeholder='Search Country' value={inputFilter} onChangeText={(text) => setInputFilter(text)} style={currencyDropdownStyles.currencyDropdownInput} />
            <ScrollView>
                <View style={currencyDropdownStyles.currencyDropdownInner}>
                    {
                        countryList.filter((country) => country.countryName.toLowerCase().includes(inputFilter.toLowerCase())).map((country) => {

                            return (

                                <Pressable key={country.countryIso} style={currencyDropdownStyles.currencyChip} onPress={() => selectCountry(country.countryIso)}>
                                    <Text style={currencyDropdownStyles.currencyChipPrimaryText}>{country.countryFlag} {country.countryName}</Text>
                                    <Text style={{ fontSize: 16, color: selectedCountry === country.countryIso ? preferColorPalette.light.primary : preferColorPalette.light.textSecondary }}>{getSymbolFromCurrency(country.currencyCode) ? getSymbolFromCurrency(country.currencyCode) : country.currencyCode}</Text>
                                </Pressable>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default CurrencyDropdown

const currencyDropdownStyles = StyleSheet.create({
    currencyDropdownComponent: {

    },
    currencyDropdownInput: {
        height: 50,
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        borderColor: 'grey',
        backgroundColor: '#ff'

    },
    currencyDropdownInner: {
        marginTop: 10,
        display: 'flex',
        gap: 5
    },
    currencyChip: {
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    currencyChipPrimaryText: {
        fontSize: 16,
        fontWeight: '600',
        color: preferColorPalette.light.textPrimary
    }
})