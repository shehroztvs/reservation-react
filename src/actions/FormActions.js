import {
    PARTY_SELECT, 
    TIME_SELECT, 
    NAME_SELECT, 
    PHONE_SELECT,
    REQUEST_AVAILABILITY,
    REQUEST_RESERVATION,
    AVAILABILITY_SUCCESS,
    RESERVATION_SUCCESS,
    SET_DATE,
    AUTH_FAIL,
    AUTH_SUCCESS,
    COMPLETION
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

export const reservation = (name,time,party,phone) => {
    return (dispatch) => {
        axios.post('http://18.188.172.6/api/public/v2/properties/reservations', {
            property_id: 10668,
            promotion_id: 2,
            party_size: party,
            reservation_time: time,
            reservation_type: 'official',
            name,
            phone,
            status: 'completed'
        }, {
            headers: {
                'ClientId':'member',
                'UserId':'306',
                'Auth':'ae7c944ed06e1260a6a915d7f1dfc0a1'
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

export const checkAuthorization =(secret)=>{
    return (dispatch)=>{
        dispatch({type:REQUEST_AVAILABILITY});
        axios.post(apiUrl + 'domainVerification', {
            secret: secret
          })
        .then(response=>authSuccess(dispatch,response))
        .catch(()=>authFail(dispatch))
        
    }
}
const authSuccess=(dispatch,response)=>{
    
    dispatch({
        type:response.data?AUTH_SUCCESS:AUTH_FAIL,
        payload:response
    })

}
const authFail=(dispatch)=>{
    dispatch({
        type:AUTH_FAIL
    })
}
export const onCompletion=(propertyId,auth)=>{
    return{
        type:COMPLETION,
        payload:{propertyId,auth}
    }
}