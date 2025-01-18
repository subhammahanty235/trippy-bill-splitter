import { useAppDispatch } from "@/hooks/reduxHook/hooks";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { Dispatch } from 'redux';
export const SEARCH_USER_FOR_CONNECTION_REQUEST = 'SEARCH_USER_FOR_CONNECTION_REQUEST';
export const SEARCH_USER_FOR_CONNECTION_SUCCESS = 'SEARCH_USER_FOR_CONNECTION_SUCCESS';
export const SEARCH_USER_FOR_CONNECTION_NOT_FOUND = 'SEARCH_USER_FOR_CONNECTION_NOT_FOUND';
export const SEARCH_USER_FOR_CONNECTION_FAILED = 'SEARCH_USER_FOR_CONNECTION_FAILED';

export const ADD_USER_TO_CONNECTION_REQUEST = 'ADD_USER_TO_CONNECTION_REQUEST';
export const ADD_USER_TO_CONNECTION_SUCCESS = 'ADD_USER_TO_CONNECTION_SUCCESS';
export const ADD_USER_TO_CONNECTION_REJECT = 'ADD_USER_TO_CONNECTION_REJECT';

export const ADD_PLUSER_TO_CONNECTION_REQUEST = 'ADD_PLUSER_TO_CONNECTION_REQUEST';
export const ADD_PLUSER_TO_CONNECTION_SUCCESS = 'ADD_PLUSER_TO_CONNECTION_SUCCESS';
export const ADD_PLUSER_TO_CONNECTION_REJECT = 'ADD_PLUSER_TO_CONNECTION_REJECT';

export const GET_ALL_CONNECTIONS_REQUEST = 'GET_ALL_CONNECTIONS_REQUEST';
export const GET_ALL_CONNECTIONS_SUCCESS = 'GET_ALL_CONNECTIONS_SUCCESS';
export const GET_ALL_CONNECTIONS_FAILED = 'GET_ALL_CONNECTIONS_FAILED';

export const REMOVE_STATE_VARIABLE_DATA = 'REMOVE_STATE_VARIABLE_DATA';

export const searchUserForConnectionRequest = () => ({
    type: SEARCH_USER_FOR_CONNECTION_REQUEST,
});

export const searchUserForConnectionSuccess = (user: any) => ({
    type: SEARCH_USER_FOR_CONNECTION_SUCCESS,
    payload: { user },
});

export const searchUserForConnectionNotFound = () => ({
    type: SEARCH_USER_FOR_CONNECTION_NOT_FOUND,
});

export const searchUserForConnectionFailed = (error: string) => ({
    type: SEARCH_USER_FOR_CONNECTION_FAILED,
    payload: error,
});

export const addUserToConnectionRequest = () => ({
    type: ADD_USER_TO_CONNECTION_REQUEST,
});

export const addUserToConnectionSuccess = () => ({
    type: ADD_USER_TO_CONNECTION_SUCCESS,
});

export const addUserToConnectionReject = (error: any) => ({
    type: ADD_USER_TO_CONNECTION_REJECT,
    payload: error,
});

export const addPLUserToConnectionRequest = () => ({
    type: ADD_PLUSER_TO_CONNECTION_REQUEST,
});

export const addPLUserToConnectionSuccess = () => ({
    type: ADD_PLUSER_TO_CONNECTION_SUCCESS,
});

export const addPLUserToConnectionReject = (error: any) => ({
    type: ADD_PLUSER_TO_CONNECTION_REJECT,
    payload: error,
});

export const getAllConnectionsRequest = () => ({
    type: GET_ALL_CONNECTIONS_REQUEST,
});

export const getAllConnectionsSuccess = (connections: any) => ({
    type: GET_ALL_CONNECTIONS_SUCCESS,
    payload:  connections ,
});

export const getAllConnectionsFailed = (error: string) => ({
    type: GET_ALL_CONNECTIONS_FAILED,
    payload: { error },
});


export const removeStateTempValues = () =>({
    type:REMOVE_STATE_VARIABLE_DATA
})


export const fetchUserForConnection = (emailId: string) => async (dispatch: Dispatch) => {
    const token = await SecureStore.getItemAsync("authToken")
    dispatch(searchUserForConnectionRequest());
    console.log("Here calling")
    try {
        const response = await axios.post(`http://localhost:5050/api/v1/connection/getUserForConnection`,
            {
                emailId: emailId.toLowerCase(),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":token
                },
            }
        )

        if (!response.status) {
            throw new Error("Failed to search user")
        }
        console.log(response.data)
        if (response.data.found === false) {
            dispatch(searchUserForConnectionNotFound())
        } else {
            dispatch(searchUserForConnectionSuccess(response.data.user))
        }


    } catch (error) {
    }
}

export const addUserToConnection = (data: any) => async (dispatch: Dispatch) => {
    dispatch(addUserToConnectionRequest());
    const token = await SecureStore.getItemAsync("authToken")
    console.log(data)
    try {
        const response = await axios.post(`http://localhost:5050/api/v1/connection/create`,
            {
                userId: data.userId,
                connectionID: data.connectionId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:token
                },
            }
        )

        if (!response.status) {
            throw new Error("Failed to search user")
        }
        console.log(response.data)
        if (response.data.success === true) {
            dispatch(addUserToConnectionSuccess())
        } else {
            dispatch(addUserToConnectionReject(response.data.message))
        }

    } catch (error) {

    }
}

export const getAllConnections = (userId:number) => async(dispatch:Dispatch) => {
    dispatch(getAllConnectionsRequest())
    const token = await SecureStore.getItemAsync("authToken")
    try {
        const response = await axios.get(`http://localhost:5050/api/v1/connection/getAll`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:token
                },
            }
        )
        console.log(response.data.connections)

        if(response.data.success){
            dispatch(getAllConnectionsSuccess(response.data.connections))
        }else{
            dispatch(getAllConnectionsFailed(response.data.message))
        }
    } catch (error) {
        
    }
}

// PLUser or Pre Logged User is a type of user who has no account in Trippy, but other user's wants them to add
// as a connection, in this scenario we basically create a account with the given emailId and whenever they will create
// a account, all the data (trips, connections) will be automatically synced to their new account. 
export const addPLUserToConnection = (data: any) => async (dispatch: Dispatch) => {
    dispatch(addPLUserToConnectionRequest());
    const token = await SecureStore.getItemAsync("authToken")
    try {
        const response = await axios.post(`http://localhost:5050/api/v1/connection/pluser/addConnection`,
            {
                userId: data.userId,
                emailId: data.emailId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:token
                },
            }
        )

        if (!response.status) {
            throw new Error("Failed to search user")
        }
        console.log(response.data)
        if (response.data.success === true) {
            dispatch(removeStateTempValues())
            dispatch(addPLUserToConnectionSuccess())
        } else {
            dispatch(addPLUserToConnectionReject(response.data.message))
        }

    } catch (error) {
        console.log(error)
    }
}
