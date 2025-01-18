const initialState = {
    loadingFetchUserForConnection: false,
    fetchedUser: null,
    error: null,
    userNotFound: null || false,
    connections: [],
    plUserCreated:false,
    connectionAdded: null || false
};

const connectionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SEARCH_USER_FOR_CONNECTION_REQUEST':
            return { ...state, loadingFetchUserForConnection: true, error: null }
        case 'SEARCH_USER_FOR_CONNECTION_SUCCESS':
            return { ...state, loadingFetchUserForConnection: false, fetchedUser: action.payload.user, error: null }
        case 'SEARCH_USER_FOR_CONNECTION_NOT_FOUND':
            return { ...state, loadingFetchUserForConnection: false, userNotFound: true, error: null }
        case 'SEARCH_USER_FOR_CONNECTION_FAILED':
            return { ...state, loadingFetchUserForConnection: false, error: action.payload }

        case 'ADD_USER_TO_CONNECTION_REQUEST':
            return { ...state, loadingAddUserToConnection: true, error: null }
        case 'ADD_USER_TO_CONNECTION_SUCCESS':
            return { ...state, loadingAddUserToConnection: false, error: null, connectionAdded: true }
        case 'ADD_USER_TO_CONNECTION_REJECT':
            return { ...state, loadingAddUserToConnection: false, error: action.payload }

        case 'ADD_PLUSER_TO_CONNECTION_REQUEST':
            return { ...state, loadingAddUserToConnection: true, error: null }
        case 'ADD_PLUSER_TO_CONNECTION_SUCCESS':
            return { ...state, loadingAddUserToConnection: false, error: null , plUserCreated:true, connectionAdded: true}
        case 'ADD_PLUSER_TO_CONNECTION_REJECT':
            return { ...state, loadingAddUserToConnection: false, error: action.payload }

        case 'GET_ALL_CONNECTIONS_REQUEST':
            return { ...state, loadingGetAllConnections: true, error: null, connections: [] };
        case 'GET_ALL_CONNECTIONS_SUCCESS':
            return { ...state, loadingGetAllConnections: false, connections: action.payload, error: null };
        case 'GET_ALL_CONNECTIONS_FAILED':
            return { ...state, loadingGetAllConnections: false, error: action.payload, connections: [] };
        
        case 'REMOVE_STATE_VARIABLE_DATA':
            return {...state, fetchedUser:null,  userNotFound:false, connectionAdded:false}

        default:
            return state
    }
}

export default connectionReducer