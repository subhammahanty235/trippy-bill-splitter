import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';

const DropdownH1 = () => {
    const dropdownvalues = [
        {key:"2021", value:"2021"},
        {key:"2022", value:"2022"},
        {key:"2023", value:"2023"},
    ]

    const [selectedValue , setSelectedValue] = useState(dropdownvalues[0]);

  return (
    <View style={styles.dropdownh1}>
        <Text>{selectedValue.key}</Text>
        <FontAwesome name='chevron-down' size={15} />
    </View>
  )
}

export default DropdownH1

const styles = StyleSheet.create({
    dropdownh1:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
    }
})