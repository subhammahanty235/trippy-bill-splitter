import { Modal, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import Anima from '@/assets/images/loading-animation.json'
const LoadingPopup = () => {
    return (
        <View style={styles.centeredView}>
            <Modal visible={false} transparent={true}>
                <View style={styles.xxt}>
                {/* <Text style={styles.modalText}>Hello World!</Text> */}
                <LottieView style={{
                    width: 100,
                    height: 100,
                    
                }} source={Anima} autoPlay loop />
                </View>
            </Modal>
            </View>
        
    )
}

export default LoadingPopup

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 122,
    },
    xxt:{
        // backgroundColor:'red',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modalView: {
        backgroundColor: 'black',
        margin: 20,
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})