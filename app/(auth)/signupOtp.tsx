import { StyleSheet, Text, TextInput, View, Image, Button, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButtonS1 } from '@/components/ThemedButtonS1';
import OTPInput from '@/components/OtpInput';

export default function signupOtp() {
    const [emailId, setEmailId] = useState<string>("");

    return (
        <ThemedView style={styles.signupContainer} lightColor='#ff' darkColor='#212529'>
            <View style={styles.halfCircle} />
            <SafeAreaView>
               
                    {/* <Ionicons name='chevron-back-outline' color={"#ef4f5f"} size={25}/> */}
                    <ThemedText style={{ marginBottom: 10 }} type='subtitle' lightColor='#ef4f5f'>Enter the OTP</ThemedText>
                
                <ThemedText lightColor='#828282'>Simplify Your Travels: Create Your Account to Effortlessly Manage and Split Trip Expenses</ThemedText>

                <ThemedView style={styles.signupContainerInner} lightColor='#ff'>
                   
                    <OTPInput codeLength={5} onCodeFilled={()=>{}}/>
                    <Text style={[styles.resendText, {color:'#828282'}]}>Resend otp in 20s</Text>
                    <ThemedButtonS1 lightBackgroundColor='#ef4f5f' text='Verify OTP' />
                    {/* <ThemedButtonS2 lightTextColor='#ef4f5f' text='I already have an account' /> */}
                </ThemedView>
            </SafeAreaView>
            <Image style={styles.logoImage} source={require("@/assets/images/logo-light.png")} />
            <View style={styles.halfCircleBottom} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    signupContainer: {
        flex: 1,
        width: '100%',
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,

        justifyContent: 'space-between',
    },
    signupContainerInner: {
        flex: 1,
        width: '100%',
        marginTop: "15%",
        display: 'flex',
        gap: 20
    },
    linkText: {
        color: 'black',
        // backgroundColor:"black",
        height: 30,
    },
    headerView:{
        display:'flex',
        flexDirection:'row',
        
    },
    resendText:{
        height:20,
        textAlign:'right',
        marginHorizontal:10,
        fontSize:16
    },
    logoImage: {
        width: 150,
        height: 50,
        position: 'absolute',
        bottom: 20, // Adjust this value to set the distance from the bottom
        alignSelf: 'center',
        zIndex: 100

    },
    halfCircle: {
        position: 'absolute',
        top: -100,
        right: -90,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#f9d7da',
    },
    halfCircleBottom: {
        position: 'absolute',
        bottom: -100,
        left: -90,
        width: 250,
        height: 250,
        borderRadius: 130,
        backgroundColor: '#f9d7da',
    }
});
