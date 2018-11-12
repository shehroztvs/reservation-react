import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCg9dnOKkW84vStUQ5B6KnqU1zuceGhmRY",
    authDomain: "reservation-system-24ad9.firebaseapp.com",
    databaseURL: "https://reservation-system-24ad9.firebaseio.com",
    projectId: "reservation-system-24ad9",
    storageBucket: "reservation-system-24ad9.appspot.com",
    messagingSenderId: "953850628331"
}

export const apiUrl = "http://192.168.100.28/eet/reservation/api/public/admin/";
export const fire = firebase.initializeApp(firebaseConfig);