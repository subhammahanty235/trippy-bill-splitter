import { StyleSheet, Text, TextInput, View, Image, Button, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInputS1 } from '@/components/ThemedInputS1';
import { ThemedButtonS1 } from '@/components/ThemedButtonS1';
import { ThemedButtonS2 } from '@/components/ThemedButtonS2';
import { useRouter } from 'expo-router';

export default function login() {
    const [emailId, setEmailId] = useState<string>("");
    const router = useRouter()

    const goToOtpScreen = () =>{
        //otp request logic

        router.push("/signupOtp")
    }

    return (
        <ThemedView style={styles.signupContainer} lightColor='#ff' darkColor='#212529'>
            <View style={styles.halfCircle} />
            <SafeAreaView>
                <ThemedText style={{ marginBottom: 10 }} type='subtitle' lightColor='#ef4f5f'>Login to your account</ThemedText>
                <ThemedText lightColor='#828282'>Simplify Your Travels: Create Your Account to Effortlessly Manage and Split Trip Expenses.</ThemedText>

                <ThemedView style={styles.signupContainerInner} lightColor='#ff'>
                    <ThemedInputS1 placeHolderText='Enter EmailId' value={emailId} onChange={(e: any) => { setEmailId(e.target.value) }} lightBorderColor='#f9d7da' activeColor='#ef4f5f' />
                    {/* <ThemedText style={styles.linkText} type='link' lightColor='#ef4f5f'>Already Have an Account?</ThemedText> */}
                    <ThemedButtonS1 lightBackgroundColor='#ef4f5f' text='Get OTP' onClick={goToOtpScreen}/>
                    <ThemedButtonS2 lightTextColor='#ef4f5f' text='Create a new account' onClick={()=> router.replace("/signup")}/>
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
    linkText:{
        color:'black',
        // backgroundColor:"black",
        height:30,
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
