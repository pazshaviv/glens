import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default () => {
  const [profiles, setProfiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const uid = auth().currentUser.uid;
  let profilesArray = [];

  const fetchData = async () => {
    console.log('myUid: ' + uid);
    try {
      // const ref = firestore().collection('feeds').doc(uid);
      // await ref.get().then((feedQuerySnapshot) => {
      //   let profilesUidsToDisplay = feedQuerySnapshot.data().feed;
      //   // console.log(profilesUidsToDisplay);
      //   for (let uIdToDislpay of profilesUidsToDisplay) {
      //     // console.log(uIdToDislpay);
      //     firestore()
      //       .collection('profiles')
      //       .doc(uIdToDislpay)
      //       .get()
      //       .then((profileQuerySnapshot) => {
      //         profilesArray.push({ uid: profileQuerySnapshot.id, ...profileQuerySnapshot.data()});
      //         setProfiles(profilesArray);
      //         console.log('profiles array length: ' + profiles.length)
      //       });
      //   }
      //   console.log(profilesArray.length)
      // });
    } catch (e) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [profiles, errorMessage];
};
