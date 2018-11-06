import {
    PARTY_SELECT, 
    TIME_SELECT, 
    NAME_SELECT, 
    PHONE_SELECT,
    REQUEST_AVAILABILITY,
    AVAILABILITY_SUCCESS,
    SET_DATE
} from './Types';

import axios from 'axios';
import {apiUrl} from '../config';

export const onPartySelect = (value) => {
    return{
        type: PARTY_SELECT,
        payload: value
    };
}

export const onTimeSelect = (value) => {
    return{
        type: TIME_SELECT,
        payload: value
    };
}

export const onNameSelect = (value) => {
    return{
        type: NAME_SELECT,
        payload: value
    };
}

export const onPhoneSelect = (value) => {
    return{
        type: PHONE_SELECT,
        payload: value
    };
}

export const availability = (date) => {
    return (dispatch) => {
        dispatch({type:REQUEST_AVAILABILITY});
        axios.get(apiUrl + 'properties/1/availability?date='+date)
        .then(
            (response) => {
                availabilitySuccess(dispatch, response)
            }
        )
        .catch((err) => console.log(err));
    }
}

export const setDate = (date) => {
    return{
        type:SET_DATE,
        payload:date
    }
}

const availabilitySuccess = (dispatch, response) => {
    dispatch({
        type: AVAILABILITY_SUCCESS,
        payload: response
    });
}