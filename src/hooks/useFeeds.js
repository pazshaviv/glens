import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default () => {
  const [profiles, setProfiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const uid = auth().currentUser.uid;

  useEffect(() => {
    console.log(profiles);
    console.log('inside useeffect: ' + profiles.length);
  }, [profiles]);

  const fetchData = async () => {
    console.log(profiles.length);
    console.log('myUid: ' + uid);
    try {
      const ref = firestore().collection('feeds').doc(uid);
      await ref.get().then((feedQuerySnapshot) => {
        let profilesUidsToDisplay = feedQuerySnapshot.data().feed;

        getUsersFeed(profilesUidsToDisplay);

        setProfiles(profilesArray);
      });
    } catch (e) {
      setErrorMessage('Something went wrong');
    }
  };

  const getUsersFeed = async (profilesUidsToDisplay) => {
    let profilesArray = [];
    for (let i = 0; i < profilesUidsToDisplay.length; i++) {
      await firestore()
        .collection('profiles')
        .doc(profilesUidsToDisplay[i])
        .get()
        .then((profileQuerySnapshot) => {
          profilesArray.push({
            uid: profileQuerySnapshot.id,
            ...profileQuerySnapshot.data(),
          });
        });
    }
    setProfiles(profilesArray);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return [profiles, errorMessage];
};
