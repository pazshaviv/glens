import React, {useState, useEffect} from 'react';
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {ActionSheet, Root} from 'native-base';
// import firebaseDB from '../database/firebaseDB'
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
// import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';

const GREY_BACKGROUND_URL = 'https://dummyimage.com/140x140/b2b3b5/b2b3b5.jpg';

const ImageUploadSquare = ({imageUrl, squareIndex, addPhoto, imageOptions}) => {
  const [chosenImageUrl, setChosenImageUrl] = useState({localUri: imageUrl});
  const uid = auth().currentUser.uid;
  // console.log('imageUrl: ' + imageUrl);
  // console.log('chosenImageUrl.localUri: ' + chosenImageUrl.localUri);
  // console.log(chosenImageUrl.localUri == GREY_BACKGROUND_URL);

  useEffect(() => {
    setChosenImageUrl({localUri: imageUrl});
  }, [imageUrl]);

  function showAreYouSureModal() {
    Alert.alert(
      'Remove photo',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deletePhoto()},
      ],
      {cancelable: false},
    );
  }

  function deletePhoto() {
    let userPhotoUrls = [];
    firestore()
      .collection('profiles')
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        setChosenImageUrl({localUri: GREY_BACKGROUND_URL});

        userPhotoUrls = documentSnapshot.data().photoUrls;
        userPhotoUrls.splice(squareIndex, 1);

        firestore()
          .collection('profiles')
          .doc(uid)
          .update({
            photoUrls: userPhotoUrls,
          })
          .then(() => {
            console.log('User updated!');
          });
      });
  }

  return (
    <View>
      <View style={styles.container}>
        {chosenImageUrl.localUri == GREY_BACKGROUND_URL ? (
          <TouchableOpacity
            style={{height: 110, width: 110}}
            onPress={() => addPhoto()}>
            <ImageBackground
              style={{
                height: 110,
                width: 110,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              imageStyle={{borderRadius: 20}}
              source={{uri: chosenImageUrl.localUri}}>
              <AntDesign name="plus" size={24} color="white" />
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={{height: 110, width: 110}}
              onPress={() => imageOptions()}>
              <Image
                style={{height: 110, width: 110, borderRadius: 20}}
                source={{uri: chosenImageUrl.localUri}}
              />
            </TouchableOpacity>
            {/* setChosenImageUrl({localUri: GREY_BACKGROUND_URL}) */}
            <TouchableOpacity
              style={styles.xContainer}
              onPress={() => showAreYouSureModal()}>
              <Feather
                style={{position: 'absolute', left: 1.3, top: 1}}
                name="x"
                size={18}
                color="black"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 110,
    // width: 110,
    // borderRadius: 20,
    // backgroundColor: '#B2B3B5',
    // backgroundColor: 'transparent',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  xContainer: {
    height: 21,
    width: 21,
    backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: 'red',
    borderRadius: 200,
    position: 'absolute',
    right: 0,
    bottom: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageUploadSquare;
