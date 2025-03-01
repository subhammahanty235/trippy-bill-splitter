import { ColorsEmereldGreen } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, Pressable } from 'react-native';
import { useCallback, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { ThemedButtonS1 } from './ThemedButtonS1';
import { ThemedButtonS4 } from './ThemedButtonS4';
import UNF from '@/assets/images/sad-figure.png'
import { ThemedInputS1 } from './ThemedInputS1';
import { addPLUserToConnection, addUserToConnection, fetchUserForConnection, getAllConnections } from '@/redux/actions/conectionAction';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook/hooks';
// import UNF from '../assets/images/sad-figure.png'
const preferColorPalette = ColorsEmereldGreen;
const AddConnectionPopup = ({ addConnectionbottomSheetModalRef }: any) => {
    // const dispatch = useAppDispatch()
    const snapPoints = useMemo(() => ['75%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const removeBottomSheet = useCallback(()=>{
        addConnectionbottomSheetModalRef.current?.dismiss()
    },[])
    
    return (
        <BottomSheetModal
            ref={addConnectionbottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <BottomSheetView style={{ padding: 20 }}>
                {
                    <AddConnectionComponent removeBottomSheet={removeBottomSheet}/>
                }
            </BottomSheetView>
        </BottomSheetModal>
    );
};

const AddConnectionComponent = ({removeBottomSheet}:any) => {
    const dispatch = useAppDispatch();
    const [emailId, setEmailId] = useState<string>("");
    const submitEmail = () => {
        dispatch(fetchUserForConnection(emailId))

    }

    const { fetchedUser, userNotFound, connectionAdded } = useAppSelector((state) => state.connection);
    useEffect(()=>{
        setEmailId("")
        removeBottomSheet();
        dispatch(getAllConnections());
    },[dispatch, connectionAdded])

    return (
        <View>
            <View>
                <Text style={createConnectionStyles.title}>Add new Connection</Text>
                {/* <Text style={createConnectionStyles.subTitle}>Enter their email Id or profile id to search them, you can send them to your trip...</Text> */}
                {/* <Text style={createConnectionStyles.subTitle}>Found user with the email Id, You can add them or click back to search again</Text> */}
                <Text style={createConnectionStyles.subTitle}>No Account found with the emailId. But, You can still add them and we will send them an invite</Text>
            </View>
            {
                (userNotFound === null || userNotFound === false) && fetchedUser === null ?
                    <View style={createConnectionStyles.emailInputBox}>
                        <ThemedInputS1 activeColor={preferColorPalette.light.textSecondary} value={emailId} onChangeText={(e: any) => { setEmailId(e) }} placeHolderText='Enter EmailId' />
                        <ThemedButtonS1 text='Search Account -->' onClick={submitEmail} lightBackgroundColor={preferColorPalette.light.primary} />

                    </View>
                    : userNotFound === true && fetchedUser === null ?
                        <NoAccountExists emailId={emailId} /> :
                        <SearchedAccountExists />

            }



        </View>
    )
}

const SearchedAccountExists = () => {
    const dispatch = useAppDispatch();
    const { fetchedUser } = useAppSelector((state) => state.connection)
    const addConnection = () => {
        dispatch(addUserToConnection({ userId: 1, connectionId: fetchedUser.id }))
    }
    return (
        <View style={createConnectionStyles.searchedProfile}>
            <Image style={createConnectionStyles.profileImage} source={{ uri: fetchedUser?.profilePic || "https://scontent.fixr1-2.fna.fbcdn.net/v/t39.30808-6/453245638_1934659116985600_6573884704998346285_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=E9z293nsyGYQ7kNvgHvBIlR&_nc_zt=23&_nc_ht=scontent.fixr1-2.fna&_nc_gid=AJKZH4yiwbh1ixSZxFJQ_0Y&oh=00_AYC6NCgjw8GnXDnH2SF8JifgQaF9Qvi20BFa0JGQKAPyJA&oe=673AC4EF" }} />
            <Text style={{ color: preferColorPalette.light.textPrimary, fontSize: 22, fontWeight: '700' }}>{fetchedUser?.name}</Text>
            <Text style={{ color: preferColorPalette.light.textSecondary, fontSize: 16, fontWeight: '700', width: '80%', textAlign: 'center' }}>A travel lover vagabond, I live to fulfil my dreams...</Text>

            <View style={createConnectionStyles.searchedProfileButtons}>
                <ThemedButtonS4 text='back' lightTextColor={preferColorPalette.light.primary} lightBackgroundColor={preferColorPalette.light.primary} />
                <ThemedButtonS1 text='Make me Friend' lightBackgroundColor={preferColorPalette.light.primary} onClick={addConnection} />
            </View>
        </View>
    )
}

const NoAccountExists = ({ emailId }: { emailId: string }) => {
    const dispatch = useAppDispatch();
    const {plUserCreated} = useAppSelector((state)=>state.connection)

    useEffect(()=>{
        dispatch(getAllConnections());
    },[dispatch, plUserCreated])

    const AddAndInvite = () => {
        dispatch(addPLUserToConnection({emailId: emailId.toLowerCase() }))
    }
    return (
        <View style={createConnectionStyles.searchedProfile}>
            <Image style={createConnectionStyles.NoprofileImage} source={UNF as ImageSourcePropType} />
            <View style={createConnectionStyles.searchedProfileButtons}>
                <ThemedButtonS4 text='back' lightTextColor={preferColorPalette.light.primary} lightBackgroundColor={preferColorPalette.light.primary} />
                <ThemedButtonS1 text='Add and Invite' onClick={AddAndInvite} lightBackgroundColor={preferColorPalette.light.primary} />
            </View>
        </View>
    )
}

const createConnectionStyles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        color: preferColorPalette.light.primary
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'grey'
    },
    emailInputBox: {
        marginTop: 20,
        display: 'flex',
        gap: 10
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 30
    },
    NoprofileImage: {
        height: 200,
        width: 200,
        // borderRadius: 30
    },
    searchedProfile: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        gap: 5
    },
    searchedProfileButtons: {
        marginTop: 10,
        width: '90%',
        // backgroundColor:'pink',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

});

export default AddConnectionPopup;
