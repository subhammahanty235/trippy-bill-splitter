import { Pressable, StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ColorsEmereldGreen } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook/hooks';
import { ThemedButtonS2 } from '@/components/ThemedButtonS2';
import ProfileFormJson from '@/constants/profileForm.json'
import NewFormCompInputs from '@/components/NewFormCompInputs';
import { ThemedButtonS1 } from '@/components/ThemedButtonS1';
import axios from 'axios';
import { updateProfileOfLoggedInUser } from '@/redux/actions/userAction';


const preferColorPalette = ColorsEmereldGreen;
const updateProfilePage = () => {
    const dispatch = useAppDispatch()
    const { loggedUser } = useAppSelector((state) => state.user)
    interface Controller {
        value: string | any;
        error: string | null;
    }
    type FormControllers = Record<string, Controller>;

    const [formControllers, setFormControllers] = useState<FormControllers>({});

    const handleChange = (fieldname: string, text: string) => {
        const value = text
        console.log(value)

        // Update the state
        setFormControllers((prevControllers) => ({
            ...prevControllers,
            [fieldname]: {
                ...prevControllers[fieldname],
                value: value,
                error: null,
            },
        }));
    };


    const getFieldValue = (name: string): string | null => {
        return loggedUser[name] || null;
    };


    const fetchExistingValues = () => {
        const controllers: Record<string, Controller> = {};

        for (const field of ProfileFormJson) {
            const fieldName = field.name; // Access the field name
            const value = getFieldValue(fieldName); // Get the value using the corrected getFieldValue

            if (value !== null && value !== "") {
                controllers[fieldName] = {
                    ...controllers[fieldName],
                    value: value,
                    error: null,
                };
            }
        }
        console.log(controllers)

        setFormControllers(controllers);
    };

    useEffect(() => {

        fetchExistingValues()
    }, [])

    const updateProfileHandler = () => {
        // TODO: Validation
        dispatch(updateProfileOfLoggedInUser(formControllers))

        
    }


    return (
        <ThemedView style={styles.updateProfilePageContainerContainer} lightColor={preferColorPalette.light.background} darkColor='#212529'>
            <SafeAreaView>
                <View style={styles.updateProfilePage}>
                    <UpdateProfilePageHeading />
                    <View style={{ display: 'flex', gap: 15, marginBottom: 30 }} >
                        <ProfilePicAndPicker setFormControllers={setFormControllers} />
                        {
                            ProfileFormJson?.map((data) => {
                                return <View key={data.id}>
                                    <Text style={styles.inputLabel}>{data.label}</Text>
                                    <NewFormCompInputs data={data} formControllers={formControllers} handleChange={handleChange} />
                                </View>
                            })
                        }
                    </View>
                    <ThemedButtonS1 text='Save' lightBackgroundColor={preferColorPalette.light.primary} onClick={() => updateProfileHandler()} />
                </View>  
            </SafeAreaView>
        </ThemedView>
    )
}

function UpdateProfilePageHeading() {
    const router = useRouter()
    return (
        <View style={headerStyles.headerComp}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Pressable onPress={() => router.dismiss()}>
                    <FontAwesome5 name="chevron-left" size={20} color='#44475b' />
                </Pressable>
                <ThemedText type='subtitle' lightColor={preferColorPalette.light.primary} >Update Profile</ThemedText>
            </View>
        </View>
    )
} 

const ProfilePicAndPicker = ({ setFormControllers }: any) => {
    const { loggedUser } = useAppSelector((state) => state.user)
    // const [image, setImage] = useState<string | null>(loggedUser.profilePic || null);
    // const [file, setFile] = useState<any | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(loggedUser.profilePic || null);
    const uploadFile = async () => { 
        if (!imageUri) {
            console.error('No file selected!'); 
            return;
        }
        const apiEndpoint = 'http://localhost:5050/api/v1/azure/storage/upload/file'; 

        // const fileUri = Platform.OS === 'ios' ? imageUri : imageUri.replace('file://', '');

 
        const formData = new FormData();
        formData.append('file', {
            uri: imageUri,
            name: 'image.jpg',
            type: 'image/jpeg',
        } as any);
        formData.append('blobName', "image-1-storage-test-2888");
        formData.append('containerName', "trippy-user-profile-pictures");


        try {
            const response = await axios.post(apiEndpoint,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

            if(response.data.success === true){
                setFormControllers((prevControllers:any) => ({
                    ...prevControllers,
                    'profilePic': {
                        ...prevControllers['profilePic'],
                        value: response.data.data.url,
                        error: null,
                    },
                }));
            }else{
                setImageUri(loggedUser.profilePic)
            }
            
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }



    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                // Use the URI of the first image selected
                setImageUri(result.assets[0].uri);
            } 
        } else {
            alert('Permission to access the media library is required!'); 
        }
    };
 
    let sampleImage = "https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png?f=webp"
    return (
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            {imageUri && <Image source={{ uri: imageUri ? imageUri : sampleImage }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />}
            <ThemedButtonS2 text='Upload New Image' lightTextColor={preferColorPalette.light.tint} onClick={pickImage} />
            <ThemedButtonS2 text='Upload The Image' lightTextColor={preferColorPalette.light.tint} onClick={uploadFile} />

        </View>
    )
}

export default updateProfilePage

const styles = StyleSheet.create({
    updateProfilePageContainerContainer: {
        flex: 1,
        width: '100%',
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
    },
    updateProfilePage: {

    },
    inputLabel: {
        color: 'grey',
        fontWeight: '600',
        marginBottom: 5
    }
})

const headerStyles = StyleSheet.create({
    headerComp: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
    },
    headerCompLine: {
        borderColor: 'grey',
        borderWidth: 1,
        flex: 1,
    },
    headerCompLineSec: {
        borderColor: 'grey',
        borderWidth: 1,
        width: '2%'
    }
})