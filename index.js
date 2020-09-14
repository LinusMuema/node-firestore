const express = require('express')
const utils = require('./utils')
const string = require('random-words');
const today = new Date();
const app = express()

//Firebase setup
utils.init()
const firebase = require('firebase')
require("firebase/firestore");
const db = firebase.firestore()
const reference = db.doc('numbers/random')
const data = {name: string(), number: (Math.random() * 101)}

//Observe data
db.collection('numbers').onSnapshot(snapshot => {
    console.log('Data received :')
    snapshot.forEach(doc => { console.log(doc.data()) })
})

app.use('/add', (req, res) => {
    reference.set(data)
        .then(() => {res.status(200).json({message: 'Saved data to firestore'})})
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})

app.use('/get', (req, res) => {
    reference.get()
        .then(doc => {
            if (doc && doc.exists) res.status(200).json(doc.data())
        })
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})

app.use('/query', (req, res) => {
    const query = db.collection('numbers').where('number', '>=', 50)
    query.get()
        .then(snapshot => {
            snapshot.forEach(doc => {res.status(200).json(doc.data())})
        })
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})

app.use('/delete', (req, res) => {
    reference.delete()
        .then(() => {res.status(200).json({message: 'Deleted document successfully'})})
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})


app.listen(2400, () => {
    console.log('server started : 2400')
});

module.exports = app;
