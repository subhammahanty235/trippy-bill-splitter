import { Dispatch } from 'redux';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const SIGNUP_OTP_REQUEST = 'SIGNUP_OTP_REQUEST';
export const SIGNUP_OTP_SUCCESS = 'SIGNUP_OTP_SUCCESS';
export const SIGNUP_OTP_FAILURE = 'SIGNUP_OTP_FAILURE';

export const SIGNUP_OTP_VALIDATION_REQUEST = 'SIGNUP_OTP_VALIDATION_REQUEST';
export const SIGNUP_OTP_VALIDATION_SUCCESS = 'SIGNUP_OTP_VALIDATION_SUCCESS';
export const SIGNUP_OTP_VALIDATION_FAILURE = 'SIGNUP_OTP_VALIDATION_FAILURE';
export const USER_EMAIL_NAME_DATA_FOR_SIGNUP = 'USER_EMAIL_NAME_DATA_FOR_SIGNUP'

export const signupOtpRequest = () => ({ type: SIGNUP_OTP_REQUEST });
export const signupOtpSuccess = () => ({ type: SIGNUP_OTP_SUCCESS });
export const signupOtpFailure = (error: string) => ({ type: SIGNUP_OTP_FAILURE, payload: error });

export const signupOtpValidationRequest = () => ({ type: SIGNUP_OTP_VALIDATION_REQUEST });
export const signupOtpValidationSuccess = () => ({ type: SIGNUP_OTP_VALIDATION_SUCCESS });
export const signupOtpValidationFailure = (error: string) => ({ type: SIGNUP_OTP_VALIDATION_FAILURE, payload: error });
export const setNameandEmailDataForSignup = (payload: UserDetails) => { console.log(payload); return ({ type: USER_EMAIL_NAME_DATA_FOR_SIGNUP, payload: payload }) }

export const LOGIN_OTP_REQUEST = 'LOGIN_OTP_REQUEST';
export const LOGIN_OTP_SUCCESS = 'LOGIN_OTP_SUCCESS';
export const LOGIN_OTP_FAILURE = 'LOGIN_OTP_FAILURE';

export const LOGIN_OTP_VALIDATION_REQUEST = 'LOGIN_OTP_VALIDATION_REQUEST';
export const LOGIN_OTP_VALIDATION_SUCCESS = 'LOGIN_OTP_VALIDATION_SUCCESS';
export const LOGIN_OTP_VALIDATION_FAILURE = 'LOGIN_OTP_VALIDATION_FAILURE';
export const USER_EMAIL_DATA_FOR_LOGIN = 'USER_EMAIL_DATA_FOR_LOGIN'

export const loginOtpRequest = () => ({ type: LOGIN_OTP_REQUEST });
export const loginOtpSuccess = () => ({ type: LOGIN_OTP_SUCCESS });
export const loginOtpFailure = (error: string) => ({ type: LOGIN_OTP_FAILURE, payload: error });

export const loginOtpValidationRequest = () => ({ type: LOGIN_OTP_VALIDATION_REQUEST });
export const loginOtpValidationSuccess = () => ({ type: LOGIN_OTP_VALIDATION_SUCCESS });
export const loginOtpValidationFailure = (error: string) => ({ type: LOGIN_OTP_VALIDATION_FAILURE, payload: error });
export const setEmailDataForLogin = (payload: UserDetails) => { console.log(payload); return ({ type: USER_EMAIL_DATA_FOR_LOGIN, payload: payload }) }
interface UserDetails {
    emailId: string;
    name?: string;
    otp?: string;
}


export const sendSignupOtp = (userDetails: UserDetails) => async (dispatch: Dispatch) => {
    dispatch(signupOtpRequest());
    try {
        const response = await axios.post(`http://localhost:5050/api/v1/auth/getSignupOtp`,
            {
                emailId: userDetails.emailId,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        if (!response.status) {
            throw new Error('Failed to send OTP');
        }

        dispatch(signupOtpSuccess());
    } catch (error: any) {
        dispatch(signupOtpFailure(error.message));
    }

};

export const verifySignupOtp = (userDetails: UserDetails) => async (dispatch: Dispatch) => {
    dispatch(signupOtpValidationRequest());
    try {
        const response = await axios.post(`http://localhost:5050/api/v1/auth/validate/otp/signup`,
            {
                emailId: userDetails.emailId,
                name: userDetails.name,
                recievedOtp: userDetails.otp
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        console.log(response.data)

        if (!response.status) {
            throw new Error('Failed to send OTP');
        }
        if (response.data.success === true) {
            console.log(response.data.message);
            await SecureStore.setItemAsync('authToken', response.data.token)
            dispatch(signupOtpValidationSuccess());
        }

    } catch (error: any) {
        console.log(error)
        dispatch(signupOtpValidationFailure(error.message));
    }

};

export const sendloginOtp = (userDetails: UserDetails) => async (dispatch: Dispatch) => {
    dispatch(loginOtpRequest());
    try {
        const response = await axios.post(`http://localhost:5050/api/v1/auth/getLoginOtp`,
            {
                emailId: userDetails.emailId.toLowerCase(),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        if (!response.status) {
            throw new Error('Failed to send OTP');
        }

        dispatch(loginOtpSuccess());
    } catch (error: any) {
        dispatch(loginOtpFailure(error.message));
    }

};

export const verifyLoginOtp = (userDetails: UserDetails) => async (dispatch: Dispatch) => {
    dispatch(loginOtpValidationRequest());
    try {
        const response = await axios.post(`http://localhost:5050/api/v1/auth/validate/otp/login`,
            {
                emailId: userDetails.emailId,
                recievedOtp: userDetails.otp
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        console.log(response.data)

        if (!response.status) {
            throw new Error('Failed to send OTP');
        }

        if (response.data.success === true) {
            console.log(response.data.message);
            await SecureStore.setItemAsync('authToken', response.data.token)
            dispatch(loginOtpValidationSuccess());
        }
    } catch (error: any) {
        console.log(error)
        dispatch(loginOtpValidationFailure(error.message));
    }

};