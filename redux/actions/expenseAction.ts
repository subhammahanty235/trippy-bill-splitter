import { Dispatch } from 'redux';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const ADD_NEW_EXPENSE_TO_TRIP_REQUEST = 'ADD_NEW_EXPENSE_TO_TRIP_REQUEST';
export const ADD_NEW_EXPENSE_TO_TRIP_REQUEST_SUCCESS = 'ADD_NEW_EXPENSE_TO_TRIP_REQUEST_SUCCESS';
export const ADD_NEW_EXPENSE_TO_TRIP_REQUEST_FAILED = 'ADD_NEW_EXPENSE_TO_TRIP_REQUEST_FAILED';

export const FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_REQUEST = 'FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_REQUEST';
export const FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_SUCCESS = 'FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_SUCCESS';
export const FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_FAILURE = 'FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_FAILURE';


// Add New Expense to Trip
export const addNewExpenseToTripRequest = () => ({
    type: ADD_NEW_EXPENSE_TO_TRIP_REQUEST,
});

export const addNewExpenseToTripRequestSuccess = () => ({
    type: ADD_NEW_EXPENSE_TO_TRIP_REQUEST_SUCCESS,
});

export const addNewExpenseToTripRequestFailed = (error: string) => ({
    type: ADD_NEW_EXPENSE_TO_TRIP_REQUEST_FAILED,
    payload: error,
});

// Fetch All Lendings of User (Trip-Based)
export const fetchAllLendingsOfUserTripBasedRequest = () => ({
    type: FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_REQUEST,
});

export const fetchAllLendingsOfUserTripBasedSuccess = (data: any) => ({
    type: FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_SUCCESS,
    payload: data,
});

export const fetchAllLendingsOfUserTripBasedFailure = (error: string) => ({
    type: FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_FAILURE,
    payload: error,
});



export const addNewTripExpense = ({ data, tripId }: any) => async (dispatch: Dispatch) => {
    dispatch(addNewExpenseToTripRequest())
    const token = await SecureStore.getItemAsync("authToken")

    const { expensetitle, expensedescription, budget, paymentMethod, splitPattern, addedMembers } = data;
    console.log(expensetitle, expensedescription, budget, paymentMethod, splitPattern, addedMembers);

    if (!expensetitle || !expensedescription || !budget || !splitPattern || !addedMembers) {
        console.log("Add details please")
        return;
    }

    const dataSet = {
        "title": expensetitle.value,
        "description": expensedescription.value,
        "amount": budget.value,
        "splitPattern": splitPattern.value,
        "tripId": tripId,
        "paymentMethod": !paymentMethod ? null : paymentMethod?.value?.text,
        "addedMembers": addedMembers?.value
    }


    try {
        const response = await axios.post(`http://localhost:5050/api/v1/expense/addExpense`, dataSet

            ,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            },
        )
        console.log(response.data)
        if (response.data.success === true) {
            console.log("here found the trip")
            dispatch(addNewExpenseToTripRequestSuccess())
        }
    } catch (error: any) {
        dispatch(addNewExpenseToTripRequestFailed(error.message));
    }
}

export const fetchAllLendingsOfUserTripBased = (tripId: number) => async (dispatch: Dispatch) => {
    const token = await SecureStore.getItemAsync("authToken")
    dispatch(fetchAllLendingsOfUserTripBasedRequest())
    try {
        const response = await axios.get(`http://localhost:5050/api/v1/expense/gettriplending/${tripId}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            },
        )
        
        if (response.data.success === true) {
            console.log("here found the trip")
            dispatch(fetchAllLendingsOfUserTripBasedSuccess(response.data.lendings))
        }else{
            dispatch(fetchAllLendingsOfUserTripBasedFailure(response.data.message))
        }
    } catch (error:any) {
        dispatch(fetchAllLendingsOfUserTripBasedFailure(error.message))
    }
}

