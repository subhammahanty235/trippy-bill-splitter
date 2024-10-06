import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome5 } from "@expo/vector-icons";

export type ThemedIconButtonProps = PressableProps & {
    lightBackgroundColor?: string,
    darkBackgroundColor?: string,
    text?: string,
    onClick?: any,
    icon?: any
}

export function ThemedIconButton({
    style,
    lightBackgroundColor,
    darkBackgroundColor,
    text,
    onClick,
    icon,
    ...rest
}: ThemedIconButtonProps) {
    const color = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, "background")
    return (
        <Pressable style={[styles.button, {backgroundColor:color} ]} onPress={onClick} {...rest}>
            <FontAwesome5 name={icon} size={16} color={'#fff'}/>
            <Text style={styles.texts}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 10,
        elevation: 3,
        height:35,
        display:'flex',
        flexDirection:'row',
        gap:10,

    },
    texts: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    },
})