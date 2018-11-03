import {PARTY_SELECT, TIME_SELECT, NAME_SELECT, PHONE_SELECT} from '../actions/Types';

const Initial_State = { 
    party: '',
    time: '',
    name: '',
    phone: '',
    selectedTime:null,
    loading:false,
    offer:null,
    timeSlots: [
        {
            "timeSlot": "2018-11-22 10:45:00",
            "promotion":{
                "iD": 11,
                "offer": "10% off",
            }
        },
        {
            "timeSlot": "2018-11-22 11:00:00",
            "promotion":{
                "iD": 12,
                "offer": "20% off",
            }
        },
        {
            "timeSlot": "2018-11-22 11:15:00",
            "promotion":{
                "iD": 14,
                "offer": "Buy 1 Get 1 Free",
            }
        },
        {
            "timeSlot": "2018-11-22 11:30:00",
            "promotion":{
                "iD": 15,
                "offer": "50% off",
            }
        },
        {
            "timeSlot": "2018-11-22 11:45:00",
            "promotion":{
                "iD": 20,
                "offer": "35% off",
            }    
        },
        {
            "timeSlot": "2018-11-22 12:00:00",
            "promotion":{
                "iD": 1,
                "offer": "30% off",
            }    
        },
        {
            "timeSlot": "2018-11-22 12:15:00",
            "promotion":null
        },
        {
            "timeSlot": "2018-11-22 12:30:00",
            "promotion":{
                "iD": 31,
                "offer": "Buy 1 Get 1 Free",
            }    
        },
        {
            "timeSlot": "2018-11-22 12:45:00",
            "promotion":null
        },
        {
            "timeSlot": "2018-11-22 13:00:00",
            "promotion":null
        },
        {
            "timeSlot": "2018-11-22 13:15:00",
            "promotion":{
                "iD": 61,
                "offer": "Buy 1 Get 1",
            }
        },
        {
            "timeSlot": "2018-11-22 13:30:00",
            "promotion":{
                "iD": 71,
                "offer": "Rs.299 off on Lunch",
            }
        }
    ]

}

export default (state = Initial_State, action) => {
    switch(action.type){
        case PARTY_SELECT:
            return {...state, party:action.payload};
        case TIME_SELECT:
            return {...state, time:action.payload.timeSlot , offer: action.payload.promotion};
        case NAME_SELECT:
            return {...state, name:action.payload};
        case PHONE_SELECT:
            return {...state, phone:action.payload};
        default:
            return state;
    }
}