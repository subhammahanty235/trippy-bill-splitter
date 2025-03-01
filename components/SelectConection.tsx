import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { ColorsEmereldGreen } from '@/constants/Colors'
import { ThemedInputS1 } from '@/components/ThemedInputS1'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { addConnectionToList, addConnectionToTrip } from '@/redux/actions/tripAction'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook/hooks'
import AddConnectionPopup from '@/components/CreateConnectionPopup'
import { ThemedButtonS4 } from './ThemedButtonS4'
import { FontAwesome5 } from '@expo/vector-icons'

const preferColorPalette = ColorsEmereldGreen;

export default function SelectConnection() {
    const addConnectionbottomSheetModalRef = useRef<BottomSheetModal>(null);
    const handleAddConnectionPresentModalPress = useCallback(() => {
        addConnectionbottomSheetModalRef.current?.present();
    }, []);


    const { connections } = useAppSelector((state) => state.connection);
    const { loading, listedConnections } = useAppSelector((state) => state.trip);
    const { snapPoint } = useAppSelector((state) => state.global);
    return (
        <>
            {
                snapPoint === 2 ?
                    <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        <View style={selectConnectionStyle.selectConnectionController}>
                            <ThemedInputS1 placeHolderText='Enter EmailId' value="" lightBorderColor={preferColorPalette.light.textPrimary} activeColor='#ef4f5f' />

                            <View style={selectConnectionStyle.connectionContainer}>
                                {
                                    connections.filter(
                                        (connection: any) =>
                                            !listedConnections.some(
                                                (listed: any) => listed.connectionId === connection.connectionId
                                            )
                                    )
                                        .map((filteredConnection: any) => {
                                            return <ConnectionChip key={filteredConnection.connectionId} connection={filteredConnection} />;
                                        })
                                }
                                <CreateNewConnectionChip handleAddConnectionPresentModalPress={handleAddConnectionPresentModalPress} addConnectionbottomSheetModalRef={addConnectionbottomSheetModalRef} />
                                <AddConnectionPopup addConnectionbottomSheetModalRef={addConnectionbottomSheetModalRef} />
                            </View>
                        </View>
                    </ScrollView> :
                    <View style={selectConnectionStyle.selectConnectionController}>
                        <ThemedInputS1 placeHolderText='Enter EmailId' value="" lightBorderColor={preferColorPalette.light.textPrimary} activeColor='#ef4f5f' />

                        <View style={selectConnectionStyle.connectionContainer}>
                            {
                                connections.filter(
                                    (connection: any) =>
                                        !listedConnections.some(
                                            (listed: any) => listed.connectionId === connection.connectionId
                                        )
                                )
                                    .map((filteredConnection: any) => {
                                        return <ConnectionChip key={filteredConnection.connectionId} connection={filteredConnection} />;
                                    })
                            }
                            <CreateNewConnectionChip handleAddConnectionPresentModalPress={handleAddConnectionPresentModalPress} addConnectionbottomSheetModalRef={addConnectionbottomSheetModalRef} />
                            <AddConnectionPopup addConnectionbottomSheetModalRef={addConnectionbottomSheetModalRef} />
                        </View>
                    </View>
            }
        </>


    )
}

const ConnectionChip = ({ connection }: any) => {

    let connectionDeatils = connection.contact;
    // connectionDeatils.isPlcUser = connection.isPlcUser;


    const dispatch = useAppDispatch()
    const addNewConnection = () => {
        // console.log(typeof(connectionDeatils))
        // console.log("-------------------------------------------->")
        // console.log(connection)
        dispatch(addConnectionToTrip(connection.connectionId))
        // dispatch(addConnectionToList(connection))
    }

    return (
        <Pressable style={selectConnectionStyle.connectionChip} onPress={addNewConnection}>
            <Image style={{ width: 45, height: 45, borderRadius: 50 }} source={{ uri: connectionDeatils?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIEPAnn2ZgyEbnturIYDy5ga7_PI0HabV6Q&s" }} />
            <View style={selectConnectionStyle.connectionChipTexts}>
                <Text style={{ color: preferColorPalette.light.textPrimary, fontSize: 17, fontWeight: '700' }}>{connectionDeatils?.name}</Text>
                <Text style={{ color: preferColorPalette.light.textSecondary, fontSize: 14, fontWeight: '400' }}>{connectionDeatils?.email}</Text>
            </View>
        </Pressable>

    )
}

const CreateNewConnectionChip = ({ handleAddConnectionPresentModalPress }: any) => {
    return (
        <Pressable style={selectConnectionStyle.createConnectionChip} onPress={() => handleAddConnectionPresentModalPress()}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 17 }}>Create a new Connection</Text>
        </Pressable>
    )
}


const selectConnectionStyle = StyleSheet.create({
    connectionContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    connectionChip: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 5
    },
    connectionChipTexts: {

    },
    createConnectionChip: {
        marginTop: 15,
        marginBottom: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: preferColorPalette.light.primary,
        borderRadius: 10
    },
    selectConnectionController: {
        marginBottom: 30
    }

}) 