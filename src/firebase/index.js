import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAiCkqtVVlfkM_vFPB1phmx7vLQuIN2tRI',
  authDomain: 'proiectdev.firebaseapp.com',
  databaseURL: 'https://proiectdev.firebaseio.com',
  projectId: 'proiectdev',
  storageBucket: 'proiectdev.appspot.com',
  messagingSenderId: '683092230042'
}

export default firebase.initializeApp(config)

// firebase.database().ref('/events/MYUID')
//   .set({
//     id: 1,
//     titlu: 'Meeting2',
//     avatar: 'http://lorempixel.com/100/100/',
//     descriere: 'Intalnire nr 2',
//     data: new Date('June 2, 2017'),
//     prezenta: true
//   })