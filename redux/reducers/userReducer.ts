
interface UserState {
    fetchUserLoading: boolean,
    loggedUser: any,
    updateProfileLoading: boolean,
    profileUpdated:boolean
}

const initialState: UserState = {
    fetchUserLoading: false,
    loggedUser: null,
    updateProfileLoading: false,
    profileUpdated:false,
}

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'FETCH_LOGGEDIN_USER_USING_TOKEN_REQUEST':
            return {
                ...state,
                fetchUserLoading: true
            }

        case 'FETCH_LOGGEDIN_USER_USING_TOKEN_SUCCESS':
            return {
                ...state,
                fetchUserLoading: false,
                loggedUser: action.payload
            }
        case 'FETCH_LOGGEDIN_USER_USING_TOKEN_FAILED':
            return {
                ...state,
                fetchUserLoading: false,
                error: action.payload,
            }
        case 'UPDATE_LOGGEDIN_USER_PROFILE_REQUEST':
            return {
                ...state,
                updateProfileLoading: true,
            }
        case 'UPDATE_LOGGEDIN_USER_PROFILE_SUCCESS':
            return {
                ...state,
                updateProfileLoading: false,
                profileUpdated:true
            }
        case 'UPDATE_LOGGEDIN_USER_PROFILE_FAILED':
            return {
                ...state,
                updateProfileLoading: true,
                profileUpdated:true,
                error:action.payload
            }
        default:
            return state;
    }
}

export default userReducer;