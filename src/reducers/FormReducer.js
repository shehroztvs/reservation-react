import {
    PARTY_SELECT,
    TIME_SELECT,
    NAME_SELECT,
    PHONE_SELECT,
    REQUEST_AVAILABILITY,
    AVAILABILITY_SUCCESS,
    SET_DATE
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
    date: moment().format('YYYY-MM-DDTHH:mm:ss')
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
                time: action.payload.timeSlot,
                offer: action.payload.promotion
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
                timeSlots: action.payload.data,
                loading:false
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
        default:
            return state;
    }
}