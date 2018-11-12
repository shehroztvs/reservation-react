import {
    PARTY_SELECT, 
    TIME_SELECT, 
    NAME_SELECT, 
    PHONE_SELECT,
    REQUEST_AVAILABILITY,
    REQUEST_RESERVATION,
    AVAILABILITY_SUCCESS,
    RESERVATION_SUCCESS,
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
        dispatch({type: REQUEST_AVAILABILITY});
        axios.get(apiUrl + 'properties/1/availability?date='+date)
            .then((response) => availabilitySuccess(dispatch, response))
            .catch((error) => console.log(error));
    }
}

export const reservation = () => {
    return (dispatch) => {
        dispatch({type: REQUEST_RESERVATION});
        axios.post(apiUrl + 'reservations', {
            property_id: 1,
            promotion_id: 2,
            party_size: 3,
            reservation_time: '2018-11-05T11:57:00+5',
            reservation_type: 'official',
            name: 'Shehroz Aamir',
            phone: '03360824990'
        }, {
            headers: {
                'ClientId':'visitor'
            }
        })
            .then((response) => {console.log(response); reservationSuccess(dispatch, response)})
            .catch((error) => console.log(error));
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

const reservationSuccess = (dispatch, response) => {
    dispatch({
        type: RESERVATION_SUCCESS,
        payload: response
    });
}