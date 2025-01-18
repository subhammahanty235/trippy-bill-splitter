import { Dispatch } from 'redux'

export const SET_BOTTOMSHEET_SNAPSHOT_POSITION = 'SET_BOTTOMSHEET_SNAPSHOT_POSITION'

export const setBottomSheetSnapShotPositionValue = (point:number) => (dispatch: Dispatch)=>{
    //point -> index value of ['25%', '50%', '75%']
    dispatch({
        type:SET_BOTTOMSHEET_SNAPSHOT_POSITION,
        payload:point
    })
}