import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonS1Props = PressableProps & {
    lightBackgroundColor?: string,
    darkBackgroundColor?: string,
    text?: string,
    onClick?: any,
}

export function ThemedButtonS1({
    style,
    lightBackgroundColor,
    darkBackgroundColor,
    text,
    onClick,
    ...rest
}: ThemedButtonS1Props) {
    const color = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, "background")
    return (
        <Pressable style={[styles.button, {backgroundColor:color} ]} onPress={onClick} {...rest}>
            <Text style={styles.texts}>{text}</Text>
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
        color: '#fff',
    },
})