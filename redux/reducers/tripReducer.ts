interface AuthState {
    listedConnections: any[];
    loading: boolean;
    liveTripOfUser: any
    loadingFetchliveTrip: boolean
    loadingSearchTripByCode: boolean
    tripNotFoundUsingCode: boolean
    tripFoundUsingCode: boolean
    searchedTrip: any
    liveTripExpense: number
    loadingDetailsOfTrip: Boolean
    completeTripDetails: any
    liveTripMembers:any[]
}


const initialState: AuthState = {
    listedConnections: [],
    loading: false,
    liveTripOfUser: null,
    loadingFetchliveTrip: true,
    loadingSearchTripByCode: false,
    tripNotFoundUsingCode: false,
    tripFoundUsingCode: false,
    searchedTrip: null,
    liveTripExpense: 0,
    loadingDetailsOfTrip: false,
    completeTripDetails: null,
    liveTripMembers:[]
};

const tripReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'Add_CONNECTION_TO_LIST':
            console.log(action.payload)
            return {
                ...state,
                loading: true,
                listedConnections: [...state.listedConnections, action.payload?.connection]
            };
        case 'REMOVE_CONNECTION_FROM_LIST':
            return {
                ...state,
                loading: false,
                listedConnections: state.listedConnections.filter(
                    (connection) => connection.id !== action.payload
                ),
            };

        case 'FETCH_LIVE_TRIP_OF_USER_REQUEST':
            return {
                ...state,
                loadingFetchliveTrip: true,
            };
        case 'FETCH_LIVE_TRIP_OF_USER_SUCCESS':
            return {
                ...state,
                loadingFetchliveTrip: false,
                liveTripOfUser: action.payload,
            };
        case 'FETCH_LIVE_TRIP_OF_USER_FAILURE':
            return {
                ...state,
                loadingFetchliveTrip: false,
            }

        case 'CREATE_NEW_TRIP_REQUEST':
            return {
                ...state,
                loadingCreateTrip: true,
            }
        case 'CREATE_NEW_TRIP_SUCCESS':
            return {
                ...state,
                loadingCreateTrip: false,
                tripCreated: true,
            }
        case 'CREATE_NEW_TRIP_FAILURE':
            return {
                ...state,
                loadingCreateTrip: false,
                tripCreated: false,
                error: action.payload
            }
        case 'SEARCH_TRIP_USING_TRIPCODE':
            return {
                ...state,
                loadingSearchTripByCode: true,
            }
        case 'SEARCH_TRIP_USING_TRIPCODE_SUCCESS':
            return {
                ...state,
                loadingSearchTripByCode: false,
                searchedTrip: action.payload,
                tripFoundUsingCode: true
            }
        case 'SEARCH_TRIP_USING_TRIPCODE_NOTFOUND':
            return {
                ...state,
                loadingSearchTripByCode: false,
                tripNotFoundUsingCode: true,
            }
        case 'SEARCH_TRIP_USING_TRIPCODE_FAILURE':
            return {
                ...state,
                loadingSearchTripByCode: false,
                error: action.payload,
            }
        case 'FETCH_LIVE_TRIP_EXPENSE_OF_USER_REQUEST':
            return {
                ...state,
                loadingFetchliveTripExpense: true,
            };
        case 'FETCH_LIVE_TRIP_EXPENSE_OF_USER_SUCCESS':
            return {
                ...state,
                loadingFetchliveTripExpense: false,
                liveTripExpense: action.payload,
            };
        case 'FETCH_LIVE_TRIP_EXPENSE_OF_USER_FAILURE':
            return {
                ...state,
                loadingFetchliveTripExpense: false,
            }
        case 'FETCH_ALL_DETAILS_OF_TRIP_REQUEST':
            return {
                ...state,
                loadingDetailsOfTrip: true,
            };
        case 'FETCH_ALL_DETAILS_OF_TRIP_SUCCESS':
            return {
                ...state,
                loadingDetailsOfTrip: false,
                completeTripDetails: action.payload,
                liveTripMembers:action.members
            };
        case 'FETCH_ALL_DETAILS_OF_TRIP_FAILURE':
            return {
                ...state,
                loadingDetailsOfTrip: false,
            }

        case 'ADD_CONNECTION_TO_TRIP_REQUEST':
            return {
                ...state,
                loadingAddToTrip: true,
            }
        case 'ADD_CONNECTION_TO_TRIP_SUCCESS':
            return {
                ...state,
                loadingAddToTrip: false,
                connectionAdded: true,
            }
        case 'ADD_CONNECTION_TO_TRIP_FAILURE':
            return {
                ...state,
                loadingAddToTrip: false,
                connectionAdded: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default tripReducer;
