interface ExpenseState {
    addnewExpenseLoading: Boolean,
    addnewExpenseSuccess: Boolean,
    fetchAllTripBasedLendingsLoading:Boolean,
    tripLendings:any,
}

const initialState: ExpenseState = {
    addnewExpenseLoading: false,
    addnewExpenseSuccess: false,
    fetchAllTripBasedLendingsLoading:false,
    tripLendings:[]

}

const expenseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_NEW_EXPENSE_TO_TRIP_REQUEST':
            return {
                ...state,
                addnewExpenseLoading: true,
            }
        case 'ADD_NEW_EXPENSE_TO_TRIP_REQUEST_SUCCESS':
            return {
                ...state,
                addnewExpenseLoading: false,
                addnewExpenseSuccess: true
            }
        case 'ADD_NEW_EXPENSE_TO_TRIP_REQUEST_FAILED':
            return {
                ...state,
                addnewExpenseLoading: false,
                addnewExpenseSuccess: false,
                error: action.payload
            }

        case 'FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED':
            return {
                ...state,
                fetchAllTripBasedLendingsLoading: true
            }
        case 'FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_SUCCESS':
            return {
                ...state,
                fetchAllTripBasedLendingsLoading: false,
                tripLendings:action.payload
            }
        case 'FETCH_ALL_LENDINGS_OF_USER_TRIP_BASED_FAILURE':
            return {
                ...state,
                fetchAllTripBasedLendingsLoading: false,
                error:action.payload
            }
        default:
            return state;
    }
}

export default expenseReducer
