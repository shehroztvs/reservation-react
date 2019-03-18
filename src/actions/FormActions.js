import {
    PARTY_SELECT, 
    TIME_SELECT, 
    NAME_SELECT, 
    PHONE_SELECT,
    REQUEST_AVAILABILITY,
    AVAILABILITY_SUCCESS,
    RESERVATION_SUCCESS,
    SET_DATE,
    AUTH_FAIL,
    AUTH_SUCCESS,
    COMPLETION
} from './Types';
import axios from 'axios';
import { apiUrl } from '../config';

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

export const availability = (date, partySize, propertyId) => {
    return (dispatch) => {
        dispatch({type: REQUEST_AVAILABILITY});
        axios.get(
            apiUrl + 'properties/'+propertyId+'/availability',
            {
                params: {
                    date,
                    partySize,
                }
            }
        )
        .then((response) => availabilitySuccess(dispatch, response))
        .catch((error) => console.log(error));
    }
}

export const reservation = (name, time, party, phone, propertyId, promotion, endTime, type) => {
    return (dispatch) => {
        axios.post(
            apiUrl + 'reservations',
            {
                propertyId: propertyId,
                promotionId: promotion,
                partySize: party,
                startTime: time,
                type,
                name,
                phone,
                status: 'approved',
                endTime
            }
        )
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
        payload: response.data
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
        payload:response.data
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
