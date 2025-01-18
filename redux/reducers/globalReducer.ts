interface GlobalState {
    snapPoint:any; //Specific to some components, not for all bottomsheets
}

const initialState: GlobalState = {
    snapPoint:null,
}

const globalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_BOTTOMSHEET_SNAPSHOT_POSITION':
            return {
                ...state,
                snapPoint:action.payload
            }
        default:
            return state;
    }
}

export default globalReducer