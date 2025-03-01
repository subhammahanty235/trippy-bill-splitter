import filterFormControllersForBackend from '@/helpers/filterControllers';
import axios from 'axios';
import { Dispatch } from 'redux';
import * as SecureStore from 'expo-secure-store';
import { store } from '../store';

export const ADD_CONNECTION_TO_LIST = 'Add_CONNECTION_TO_LIST';
export const REMOVE_CONNECTION_FROM_LIST = 'REMOVE_CONNECTION_FROM_LIST';

export const FETCH_LIVE_TRIP_OF_USER_REQUEST = 'FETCH_LIVE_TRIP_OF_USER_REQUEST';
export const FETCH_LIVE_TRIP_OF_USER_SUCCESS = 'FETCH_LIVE_TRIP_OF_USER_SUCCESS';
export const FETCH_LIVE_TRIP_OF_USER_FAILURE = 'FETCH_LIVE_TRIP_OF_USER_FAILURE';

export const CREATE_NEW_TRIP_REQUEST = 'CREATE_NEW_TRIP_REQUEST';
export const CREATE_NEW_TRIP_SUCCESS = 'CREATE_NEW_TRIP_SUCCESS';
export const CREATE_NEW_TRIP_FAILURE = 'CREATE_NEW_TRIP_FAILURE';

export const SEARCH_TRIP_USING_TRIPCODE = 'SEARCH_TRIP_USING_TRIPCODE';
export const SEARCH_TRIP_USING_TRIPCODE_SUCCESS = 'SEARCH_TRIP_USING_TRIPCODE_SUCCESS';
export const SEARCH_TRIP_USING_TRIPCODE_NOTFOUND = 'SEARCH_TRIP_USING_TRIPCODE_NOTFOUND';
export const SEARCH_TRIP_USING_TRIPCODE_FAILURE = 'SEARCH_TRIP_USING_TRIPCODE_FAILURE';

export const FETCH_LIVE_TRIP_EXPENSE_OF_USER_REQUEST = 'FETCH_LIVE_TRIP_EXPENSE_OF_USER_REQUEST';
export const FETCH_LIVE_TRIP_EXPENSE_OF_USER_SUCCESS = 'FETCH_LIVE_TRIP_EXPENSE_OF_USER_SUCCESS';
export const FETCH_LIVE_TRIP_EXPENSE_OF_USER_FAILURE = 'FETCH_LIVE_TRIP_EXPENSE_OF_USER_FAILURE';

export const FETCH_ALL_DETAILS_OF_TRIP_REQUEST = 'FETCH_ALL_DETAILS_OF_TRIP_REQUEST';
export const FETCH_ALL_DETAILS_OF_TRIP_SUCCESS = 'FETCH_ALL_DETAILS_OF_TRIP_SUCCESS';
export const FETCH_ALL_DETAILS_OF_TRIP_FAILURE = 'FETCH_ALL_DETAILS_OF_TRIP_FAILURE';

export const ADD_CONNECTION_TO_TRIP_REQUEST = 'ADD_CONNECTION_TO_TRIP_REQUEST';
export const ADD_CONNECTION_TO_TRIP_SUCCESS = 'ADD_CONNECTION_TO_TRIP_SUCCESS';
export const ADD_CONNECTION_TO_TRIP_FAILURE = 'ADD_CONNECTION_TO_TRIP_FAILURE';



export const fetchLiveTripOfUserRequest = () => ({
    type: FETCH_LIVE_TRIP_OF_USER_REQUEST,
});

export const fetchLiveTripOfUserSuccess = (liveTripData: object) => ({
    type: FETCH_LIVE_TRIP_OF_USER_SUCCESS,
    payload: liveTripData,
});

export const fetchLiveTripOfUserFailure = (error: any) => ({
    type: FETCH_LIVE_TRIP_OF_USER_FAILURE,
    payload: error,
});

export const createNewTripRequest = () => ({
    type: CREATE_NEW_TRIP_REQUEST,
});

export const createNewTripSuccess = () => ({
    type: CREATE_NEW_TRIP_SUCCESS,
});

export const createNewTripFailure = (error: any) => ({
    type: CREATE_NEW_TRIP_FAILURE,
    payload: error,
});

export const searchTripUsingTripCode = () => ({
    type: SEARCH_TRIP_USING_TRIPCODE,
});

export const searchTripUsingTripCodeSuccess = (tripData: any) => ({
    type: SEARCH_TRIP_USING_TRIPCODE_SUCCESS,
    payload: tripData.trip,
    members:tripData?.tripUsersArray
});

export const searchTripUsingTripCodeNotFound = () => ({
    type: SEARCH_TRIP_USING_TRIPCODE_NOTFOUND,
});

export const searchTripUsingTripCodeFailure = (error: string) => ({
    type: SEARCH_TRIP_USING_TRIPCODE_FAILURE,
    payload: error,
});

// Fetch Live Trip Expense of User
export const fetchLiveTripExpenseOfUserRequest = () => ({
    type: FETCH_LIVE_TRIP_EXPENSE_OF_USER_REQUEST,
});

export const fetchLiveTripExpenseOfUserSuccess = (data:any) => ({
    type: FETCH_LIVE_TRIP_EXPENSE_OF_USER_SUCCESS,
    payload: data,
});

export const fetchLiveTripExpenseOfUserFailure = (error:string) => ({
    type: FETCH_LIVE_TRIP_EXPENSE_OF_USER_FAILURE,
    payload: error,
});

// Fetch All Details of Trip
export const fetchAllDetailsOfTripRequest = () => ({
    type: FETCH_ALL_DETAILS_OF_TRIP_REQUEST,
});

export const fetchAllDetailsOfTripSuccess = (data:any) => ({
    type: FETCH_ALL_DETAILS_OF_TRIP_SUCCESS,
    payload: data.trip,
    members:data.tripUsersArray
});

export const fetchAllDetailsOfTripFailure = (error:string) => ({
    type: FETCH_ALL_DETAILS_OF_TRIP_FAILURE,
    payload: error,
});

// Add Connection to Trip
export const addConnectionToTripRequest = () => ({
    type: ADD_CONNECTION_TO_TRIP_REQUEST,
});

export const addConnectionToTripSuccess = () => ({
    type: ADD_CONNECTION_TO_TRIP_SUCCESS,
});

export const addConnectionToTripFailure = (error:string) => ({
    type: ADD_CONNECTION_TO_TRIP_FAILURE,
    payload: error,
});



// interface TripData {
//     tripName: string;
//     tripDescription?: string
//     tripBeginDate: Date;
//     tripEndDate?: Date
//     budget?: number
//     defaultCurrency?: any
//     creator:number
// }


export const fetchLiveTripOfUser = () => async (dispatch: Dispatch) => {
    dispatch(fetchLiveTripOfUserRequest());
    const token = await SecureStore.getItemAsync("authToken")
    console.log(token)
    try {
        //TODO
        const response = await axios.get(`http://localhost:5050/api/v1/trip/livetrip/user`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:token,
                },
            }
        )

        if (!response.status) {
            throw new Error("Failed to search user")
        } 
        
        console.log(response.data)
        if (response.data.success === true) {
            dispatch(fetchLiveTripOfUserSuccess(response.data.trip))
        } else {
            dispatch(fetchLiveTripOfUserFailure(response.data.message))
        }

    } catch (error) {
        console.log(error)
    }
}

export const createNewTrip = (data: any) => async (dispatch: Dispatch) => {
    dispatch(createNewTripRequest());
    const token = await SecureStore.getItemAsync("authToken")
    try {
        //Validation : TODO
        let filteredData = filterFormControllersForBackend(data);
        filteredData.creator = 1; //fetch userId from signed token : TODO
        const response = await axios.post('http://localhost:5050/api/v1/trip/create',
            filteredData
            ,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:token
                },
            },

        )
        console.log(response.data)
        if (response.data.success === true) {
            dispatch(createNewTripSuccess());
        } else {
            dispatch(createNewTripFailure(response.data.message))
        }
    } catch (error) {

    }
}


export const searchTripUsingCode = (tripCode: any) => async (dispatch: Dispatch) => {
    console.log("Heyyy-------------------------------------------------------------------------->")
    dispatch(searchTripUsingTripCode());
    const token = await SecureStore.getItemAsync("authToken")
    try {
        const response = await axios.post('http://localhost:5050/api/v1/trip/getByIdWithUsers',
            {
                tripId:tripCode
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:token
                },
            },

        )
        console.log("<--------------- response from the trip and user api ------------------->")
        console.log(response.data)
        if(response.data.success === true){
            console.log("here found the trip......")

            dispatch(searchTripUsingTripCodeSuccess(response.data))
        }

        console.log(response.status)
    } catch (error:any) {
        console.log(error)
        if (error.response?.status === 404) {
            dispatch(searchTripUsingTripCodeNotFound())
        }else{
            dispatch(searchTripUsingTripCodeFailure(error.message));
        }
    }
}

export const fetchTripDetails = (tripCode: any) => async (dispatch: Dispatch) => {
    dispatch(fetchAllDetailsOfTripRequest());
    const token = await SecureStore.getItemAsync("authToken")
    console.log(token)
    try {
        const response = await axios.post('http://localhost:5050/api/v1/trip/getByIdWithUsers',
            {
                tripId:tripCode
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:token
                },
            },

        )
        if(response.data.success === true){
            console.log("here found the trip")
            
            console.log(response.data)
            dispatch(fetchAllDetailsOfTripSuccess(response.data))
        }

        console.log(response.status)
    } catch (error:any) {
        if (error.response?.status === 404) {
            dispatch(searchTripUsingTripCodeNotFound())
        }else{
            dispatch(fetchAllDetailsOfTripFailure(error.message));
        }
    }
}

export const getLiveTripExpense = (tripId:number) => async (dispatch: Dispatch) => {
    dispatch(fetchLiveTripExpenseOfUserRequest())
    const token = await SecureStore.getItemAsync("authToken")
    try {
        const response = await axios.post(`http://localhost:5050/api/v1/expense/getTotalExpense/${tripId}`, {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:token,
                },
            },
        )

        if(response.data.success === true){
            dispatch(fetchLiveTripExpenseOfUserSuccess(response.data.amount))
        }
    } catch (error:any) {
        dispatch(fetchLiveTripExpenseOfUserFailure(error.message));
    }
}

export const addConnectionToTrip = (data: any) => async (dispatch: Dispatch) => {
    console.log("Adding user to connection")
    dispatch(addConnectionToTripRequest());
    const {completeTripDetails} = store.getState().trip
    const token = await SecureStore.getItemAsync("authToken")
    console.log("Complete trip details ....................")
    console.log(completeTripDetails.id)
    try {
        const response = await axios.post(`http://localhost:5050/api/v1/trip/add/user/${completeTripDetails.id}`,
            {
                connectionId:data
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:token
                },
            }
        )

        if (!response.status) {
            throw new Error("Failed to add connection")
        }
        console.log("------------------------->")
        console.log(response.data)
        if (response.data.success === true) {
            dispatch(addConnectionToTripSuccess())
        } else {
            dispatch(addConnectionToTripFailure(response.data.message))
        }

    } catch (error) {
        console.log(error)
    }
}


export const addConnectionToList = (connection: any) => (dispatch: Dispatch) => {
    console.log(connection)
    dispatch({
        type: ADD_CONNECTION_TO_LIST,
        payload: { connection },
    });
};

export const removeConnectionFromList = (connection: any) => (dispatch: Dispatch) => {
    dispatch({
        type: REMOVE_CONNECTION_FROM_LIST,
        payload: connection,
    });
};