import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonS2Props = PressableProps & {
    lightTextColor?: string,
    darkTextColor?: string,
    text?: string,
    onClick?: any,
}

export function ThemedButtonS2({
    style,
    lightTextColor,
    darkTextColor,
    text,
    onClick,
    ...rest
}: ThemedButtonS2Props) {
    const color = useThemeColor({ light: lightTextColor, dark: darkTextColor }, "text")
    return (
        <Pressable style={[styles.button,]} onPress={() => {onClick() }} {...rest}>
            <Text style={[styles.texts, {color:color}]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop:0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 3,
        height:40,
        // backgroundColor:'black'
    },
    texts: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        zIndex:100,
    },
})