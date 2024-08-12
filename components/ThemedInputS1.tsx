import { TextInput, type TextInputProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";

export type ThemedInputS1Props = TextInputProps & {
    lightBorderColor?: string,
    darkBorderColor?: string,
    placeHolderText?: string,
    activeColor: string,
    value?: any,
    onChange?: any,
}

export function ThemedInputS1({
    style,
    lightBorderColor,
    darkBorderColor,
    placeHolderText,
    activeColor,
    value,
    onChange,
    ...rest
}: ThemedInputS1Props) {
    const color = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'text')
    const [borderColor , setBorderColor]= useState<string>(color)
    return (
        <TextInput
            onFocus={()=>setBorderColor(activeColor)}
            onBlur={()=>setBorderColor(color)}
            style={[styles.textInput, style,{borderColor:borderColor}]}
            value={value}
            onChange={onChange}
            placeholder={placeHolderText}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        borderWidth: 2,
        padding: 10,
        borderRadius:5
    }
})