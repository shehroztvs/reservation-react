import {
    PARTY_SELECT,
    TIME_SELECT,
    NAME_SELECT,
    PHONE_SELECT,
    REQUEST_AVAILABILITY,
    AVAILABILITY_SUCCESS,
    RESERVATION_SUCCESS,
    SET_DATE,
    AUTH_SUCCESS,
    AUTH_FAIL,
    COMPLETION
} from '../actions/Types';

import moment from "moment";

const Initial_State = { 
    party: '',
    time: '',
    name: '',
    phone: '',
    selectedTime: null,
    loading: false,
    offer: null,
    timeSlots: null,
    reservation: null,
    date: moment().format('YYYY-MM-DD HH:mm:ss'),
    auth: false,
    propertyId: null,
    minPartySize: null,
    maxPartySize: null,
    endTime: null,
    promotionId: null,
    propertyPhone: null,
    propertyStartTime: null,
    propertyEndTime: null,
    type: null
}

export default (state = Initial_State, action) => {
    switch(action.type){
        case PARTY_SELECT:
            return {
                ...state,
                party: action.payload
            }
        case TIME_SELECT:
            return {...state,
                time: action.payload.startTime,
                offer: action.payload.offers,
                endTime: action.payload.endTime,
                promotionId: action.payload.iD,
                type: action.payload.type !== undefined ? action.payload.type : null
            }
        case NAME_SELECT:
            return {
                ...state,
                name: action.payload
            }
        case PHONE_SELECT:
            return {...state,
                phone: action.payload
            }
        case AVAILABILITY_SUCCESS:
            return {
                ...state,
                timeSlots: action.payload.data.records,
                loading:false
            }
        case RESERVATION_SUCCESS:
            return {
                ...state,
                reservation: action.payload.data
            }
        case SET_DATE:
            return {
                ...state,
                date: action.payload,
                time: '',
                timeSlots:null
            }
        case REQUEST_AVAILABILITY:
            return{
                ...state,
                loading:true
            }
        case AUTH_SUCCESS:
            return{
                ...state,
                auth: true,
                loading: false,
                propertyId: action.payload.data.iD,
                minPartySize: parseInt(action.payload.data.minPartySize),
                maxPartySize: parseInt(action.payload.data.maxPartySize),
                propertyPhone: action.payload.data.phone,
                propertyStartTime: action.payload.data.timing.start_time,
                propertyEndTime: action.payload.data.timing.end_time
            }
        case AUTH_FAIL:
            return{
                ...state,
                auth:false,
                loading:false
            }
        case COMPLETION:
            return{
                ...state,
                ...Initial_State,
                propertyId:action.payload.propertyId,
                auth:action.payload.auth,
            }
        default:
            return state;
    }
}