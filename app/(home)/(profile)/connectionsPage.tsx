import React, { useCallback, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppSelector } from '@/hooks/reduxHook/hooks';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BottomSheetParentComponent } from '@/components/BottomSheetParentComponent';
import SelectConnection from '@/components/SelectConection';
import AddConnectionPopup from '@/components/CreateConnectionPopup';


const connectionsPage = () => {

    const { connections } = useAppSelector((state) => state.connection);
    //BottomSheet --> TODO: Change the complete architectite to make the code organized
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [selectedBottomSheet, setSelectedBottomSheet] = useState();
    // const [formControllers, setFormControllers] = useState({});
    const handlePresentModalPress = useCallback((component: any) => {

        setSelectedBottomSheet(component)
        bottomSheetModalRef.current?.present();
    }, []);




    return (
        <SafeAreaView style={styles.container}>
            <BottomSheetModalProvider>
                <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <FontAwesome5 name="arrow-left" size={20} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Connections</Text>
                    <TouchableOpacity style={styles.searchButton}>
                        <FontAwesome5 name="search" size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Connections List */}
                <FlatList
                    data={connections}
                    renderItem={renderConnection}
                    keyExtractor={item => item.connectionId}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
                <AddConnectionPopup addConnectionbottomSheetModalRef={bottomSheetModalRef} />
                {/* <BottomSheetParentComponent addConnectionbottomSheetModalRef={bottomSheetModalRef} component={selectedBottomSheet} /> */}
            
            {/* Add Connection Button */}
            <TouchableOpacity style={styles.addButton} onPress={()=>handlePresentModalPress(<AddConnectionPopup addConnectionbottomSheetModalRef={bottomSheetModalRef}/>)}>
                <FontAwesome5 name="plus" size={24} color="#fff" />
            </TouchableOpacity>
            </BottomSheetModalProvider>

        </SafeAreaView>
    );
};

const renderConnection = ({ item }: any) => (
    <View style={styles.connectionItem}>
        <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
                <FontAwesome5 name="user" size={20} color="#777" />
            </View>
        </View>

        <View style={styles.detailsContainer}>
            <Text style={styles.name}>{item.contact.name}</Text>
            <Text style={styles.email}>{item.contact.email}</Text>
        </View>

        <TouchableOpacity style={styles.moreButton}>
            <FontAwesome5 name="ellipsis-v" size={20} color="#777" />
        </TouchableOpacity>
    </View>
);

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    searchButton: {
        padding: 8,
    },
    listContainer: {
        padding: 16,
    },
    connectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: isSmallDevice ? 15 : 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    email: {
        fontSize: isSmallDevice ? 13 : 14,
        color: '#999',
    },
    moreButton: {
        padding: 8,
    },
    addButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default connectionsPage;