import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonS3Props = PressableProps & {
    lightBackgroundColor?: string,
    darkBackgroundColor?: string,
    text?: string,
    onClick?: any,
}

export function ThemedButtonS3({
    style,
    lightBackgroundColor,
    darkBackgroundColor,
    text,
    onClick,
    ...rest
}: ThemedButtonS3Props) {
    const color = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, "background")
    return (
        <Pressable style={[styles.button, {borderColor:color , borderWidth:1.5} ]} onPress={onClick} {...rest}>
            <Text style={[styles.texts , {color:color}]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        height:50,
    },
    texts: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
})