const firebase = require('firebase')

exports.init = () => {
    const config = {
    apiKey: "AIzaSyD-we5qnTzzOPYhCdcdYekuug-uRX1OOug",
    authDomain: "moose-dev.firebaseapp.com",
    databaseURL: "https://moose-dev.firebaseio.com",
    projectId: "moose-dev",
    storageBucket: "moose-dev.appspot.com",
    messagingSenderId: "670330888634",
    appId: "1:670330888634:web:9801d62482c5b4e703bd83",
    measurementId: "G-2LKFNY57PW"
  };
  firebase.initializeApp(config)
}