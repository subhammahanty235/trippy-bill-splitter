
const initialState = {
    user: null,
    loading: false,
    error: null,
    isOtpValidated: false,
    isOtpSent: false,
    emailAndNameData: null,
    emailData:null
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SIGNUP_OTP_REQUEST':
            return { ...state, loading: true, error: null };
        case 'SIGNUP_OTP_SUCCESS':
            return { ...state, loading: false, isOtpSent: true };
        case 'SIGNUP_OTP_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'SIGNUP_OTP_VALIDATION_REQUEST':
            return { ...state, loading: true, error: null };
        case 'SIGNUP_OTP_VALIDATION_SUCCESS':
            return { ...state, loading: false, isOtpValidated: true };
        case 'SIGNUP_OTP_VALIDATION_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'USER_EMAIL_NAME_DATA_FOR_SIGNUP':
            return { ...state, emailAndNameData: action.payload }
        case 'LOGIN_OTP_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_OTP_SUCCESS':
            return { ...state, loading: false, isOtpSent: true };
        case 'LOGIN_OTP_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'LOGIN_OTP_VALIDATION_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_OTP_VALIDATION_SUCCESS':
            return { ...state, loading: false, isOtpValidated: true };
        case 'LOGIN_OTP_VALIDATION_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'USER_EMAIL_DATA_FOR_LOGIN':
            return { ...state, emailData: action.payload }

        default:
            return state;
    }
};

export default authReducer;
