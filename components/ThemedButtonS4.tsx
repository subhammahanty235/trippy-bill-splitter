import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ColorsEmereldGreen } from "@/constants/Colors";

export type ThemedButtonS4Props = PressableProps & {
    lightBackgroundColor?: string,
    darkBackgroundColor?: string,
    lightTextColor ?: string,
    darkTextColor ?: string,
    text?: string,
    onClick?: any,
    icon?: any,
    prefixIcon?: any
}
const preferColorPalette = ColorsEmereldGreen;
export function ThemedButtonS4({
    style,
    lightBackgroundColor,
    darkBackgroundColor,
    lightTextColor,
    darkTextColor,
    text,
    onClick,
    icon,
    prefixIcon,
    ...rest
}:  ThemedButtonS4Props) {
    const color = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, "background")
    const textcolor = useThemeColor({ light: lightTextColor, dark: darkTextColor }, "text")
    return (
        <Pressable style={[styles.button, {backgroundColor:'#ff' , borderColor:color, borderWidth:1.5} ]} onPress={onClick} {...rest}>
           
            <Text style={[styles.texts , {color:textcolor}]}>  <FontAwesome name={prefixIcon} color={preferColorPalette.light.tabIconSelected} size={18}/> {text}</Text>
            <FontAwesome5 name={icon} size={16} color={color}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderRadius: 10,
        elevation: 3,
        height:45,
        display:'flex',

        flexDirection:'row',
        gap:10,

    },
    texts: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        
    },
})