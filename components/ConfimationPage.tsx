import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
const ConfimationPage = ({ AnimationFile, visible }: any) => {
    return (
        <View style={styles.centeredView}>
            <Modal visible={visible}>
                <Pressable>
                    <View style={styles.xxt}>
                        <LottieView style={{
                            width: 500,
                            height: 600,

                        }} source={AnimationFile} autoPlay />
                    </View>
                </Pressable>
            </Modal>
        </View>

    )
}

export default ConfimationPage

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
        // marginTop: 122,
    },
    xxt: {
        // backgroundColor:'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    modalView: {
        // backgroundColor: 'black',
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