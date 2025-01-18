import filterFormControllersForBackend from '@/helpers/filterControllers';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { Dispatch } from 'redux';

export const FETCH_LOGGEDIN_USER_USING_TOKEN_REQUEST = 'FETCH_LOGGEDIN_USER_USING_TOKEN_REQUEST';
export const FETCH_LOGGEDIN_USER_USING_TOKEN_SUCCESS = 'FETCH_LOGGEDIN_USER_USING_TOKEN_SUCCESS';
export const FETCH_LOGGEDIN_USER_USING_TOKEN_FAILED = 'FETCH_LOGGEDIN_USER_USING_TOKEN_FAILED';

export const UPDATE_LOGGEDIN_USER_PROFILE_REQUEST = 'UPDATE_LOGGEDIN_USER_PROFILE_REQUEST';
export const UPDATE_LOGGEDIN_USER_PROFILE_SUCCESS = 'UPDATE_LOGGEDIN_USER_PROFILE_SUCCESS';
export const UPDATE_LOGGEDIN_USER_PROFILE_FAILED = 'UPDATE_LOGGEDIN_USER_PROFILE_FAILED';


export const fetchLoggedInUserUsingTokenRequest = () => ({
    type: FETCH_LOGGEDIN_USER_USING_TOKEN_REQUEST,
});

export const fetchLoggedInUserUsingTokenSuccess = (userData: any) => ({
    type: FETCH_LOGGEDIN_USER_USING_TOKEN_SUCCESS,
    payload: userData,
});

export const fetchLoggedInUserUsingTokenFailed = (error: string) => ({
    type: FETCH_LOGGEDIN_USER_USING_TOKEN_FAILED,
    payload: error,
});
export const updateLoggedInUserProfileRequest = () => ({
    type: UPDATE_LOGGEDIN_USER_PROFILE_REQUEST,
});

export const updateLoggedInUserProfileSuccess = () => ({
    type: UPDATE_LOGGEDIN_USER_PROFILE_SUCCESS,
});

export const updateLoggedInUserProfileFailed = (error: string) => ({
    type: UPDATE_LOGGEDIN_USER_PROFILE_FAILED,
    payload: error,
});


export const fetchLoggedInUser = () => async (dispatch: Dispatch) => {
    dispatch(fetchLoggedInUserUsingTokenRequest());
    const token = await SecureStore.getItemAsync("authToken")
    try {
        const response = await axios.get('http://localhost:5050/api/v1/user/get/usingtoken',
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        )
        if (!response.status) {
            throw new Error("Failed to search user")
        }
        console.log(response.data)
        if (response.data.success === true) {
            dispatch(fetchLoggedInUserUsingTokenSuccess(response.data.user))
        } else {
            dispatch(fetchLoggedInUserUsingTokenFailed(response.data.message))
        }


    } catch (error) {
        console.log(error)
        fetchLoggedInUserUsingTokenFailed("Something went wrong")
    }
}

export const updateProfileOfLoggedInUser = (data: any) => async (dispatch: Dispatch) => {
    dispatch(updateLoggedInUserProfileRequest())
    const token = await SecureStore.getItemAsync("authToken")
    let filteredData = filterFormControllersForBackend(data);

    const response = await axios.post('http://localhost:5050/api/v1/user/update/usingtoken',
        filteredData
        ,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
        },

    )

    if(response.data.success === true){
        dispatch(updateLoggedInUserProfileSuccess())
    }else{
        dispatch(updateLoggedInUserProfileFailed(response.data.message))
    }


}