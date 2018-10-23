import {PARTY_SELECT, TIME_SELECT, NAME_SELECT, PHONE_SELECT} from './Types';

export const onPartySelect = (value) => {
    return{
        type: PARTY_SELECT,
        payload: value
    };
}

export const onTimeSelect = (value,selectedTime) => {
    return{
        type: TIME_SELECT,
        payload: {value,selectedTime}
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