import {PARTY_SELECT, TIME_SELECT, NAME_SELECT, PHONE_SELECT} from '../actions/Types';

const Initial_State = { 
    party: '',
    time: '',
    name: '',
    phone: '',
    selectedTime:null,
    loading:false
}

export default (state = Initial_State, action) => {
    switch(action.type){
        case PARTY_SELECT:
            return {...state, party:action.payload};
        case TIME_SELECT:
            return {...state, time:action.payload.value,selectedTime:action.payload.selectedTime};
        case NAME_SELECT:
            return {...state, name:action.payload};
        case PHONE_SELECT:
            return {...state, phone:action.payload};
        default:
            return state;
    }
}