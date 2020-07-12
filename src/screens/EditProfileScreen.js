import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, ScrollView} from 'react-native';
import DefaultScreenHeader from '../components/DefaultScreenHeader';
import Loading from '../components/Loading';
import ImageUploadSquare from '../components/ImageUploadSquare';
import {ActionSheet, Root} from 'native-base';
import {Input, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const EditProfileScreen = ({navigation}) => {
  const [currentUserProfileData, setCurrentUserProfileData] = useState({
    name: '',
  });
  const [photosUrls, setPhotosUrls] = useState([]);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    getUserProfileData(uid);
  }, []);

  const onClickAddImage = () => {
    const BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: 'Select a photo',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            takePhotoFromCamera();
            break;
          case 1:
            takePhotoFromGallery();
            break;
          default:
            break;
        }
      },
    );
  };

  const onClickImageOptions = () => {
    const BUTTONS = ['Make Profile Photo', 'Delete Photo', 'Cancel'];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: 'What do you want to do?',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            // makeProfilePhoto();
            console.log('make profile photo');
            break;
          case 1:
            console.log('delete photo');
            break;
          default:
            break;
        }
      },
    );
  };

  const takePhotoFromCamera = () => {
    console.log('took photo from camera');
  };

  const takePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        console.log('path: ' + image.path);
        setChosenImageUrl({localUri: image.path});
        return uploadPhoto(image.path);
      })
      .then((snapshot) => {
        console.log('File uploaded');
      })
      .catch((error) => {
        throw error;
      });
  };

  async function uploadPhoto(path) {
    const reference = firebase
      .storage()
      .ref(`photos/${uid}/${squareIndex}.jpg`);

    await reference.putFile(path);

    updateProfilePhotoUrls();
  }

  async function updateProfilePhotoUrls() {
    let userPhotoUrls = [];
    firestore()
      .collection('profiles')
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        console.log(documentSnapshot);
        userPhotoUrls = documentSnapshot.data().photoUrls;
        console.log('userPhotoUrls: ' + userPhotoUrls);
        userPhotoUrls.push(
          `https://firebasestorage.googleapis.com/v0/b/glens-tom.appspot.com/o/photos%2F${uid}%2F${squareIndex}.jpg?alt=media&token=773ada06-0c98-42e2-add7-ae786aaf54b9`,
        );

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

  function updateUserPhotosUrls(documentSnapshot) {
    return documentSnapshot.get('photoUrls');
  }

  async function getUserProfileData(uid) {
    console.log('uid: ' + uid);
    await firestore()
      .collection('profiles')
      .doc(uid)
      .get()
      .then((querySnapshot) => {
        console.log('querySnapshot data: ');
        console.log(querySnapshot.data());
        setCurrentUserProfileData(querySnapshot.data());
      });

    await firestore()
      .collection('profiles')
      .doc(uid)
      .get()
      .then((documentSnapshot) => updateUserPhotosUrls(documentSnapshot))
      .then((photoUrls) => {
        const photosSize = photoUrls.length;
        for (let i = photosSize; i < 6; i++) {
          photoUrls.push('https://dummyimage.com/140x140/b2b3b5/b2b3b5.jpg');
        }

        console.log('photourls: ' + photoUrls);
        setPhotosUrls(photoUrls);
      });

    // await firestore()
    //   .collection('profiles')
    //   .doc(uid)
    //   .get()
    //   .then((documentSnapshot) => updateUserDateOfBirth(documentSnapshot))
    //   .then((dateOfBirth) => {
    //     if (dateOfBirth !== '') {
    //       setDateOfBirth(Moment(dateOfBirth.toDate()).format('MMM Do, YY'));
    //     }
    //   });
  }

  function handleLogout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  var firstRow = [];
  var secondRow = [];
  for (var i = 0; i < 3; i++) {
    firstRow.push(
      <ImageUploadSquare
        key={i}
        squareIndex={i}
        addPhoto={onClickAddImage}
        imageUrl={photosUrls[i]}
        imageOptions={onClickImageOptions}
      />,
    );
  }
  for (var i = 3; i < 6; i++) {
    secondRow.push(
      <ImageUploadSquare
        key={i}
        squareIndex={i}
        addPhoto={onClickAddImage}
        imageUrl={photosUrls[i]}
        imageOptions={onClickImageOptions}
      />,
    );
  }

  return (
    <Root>
      <SafeAreaView style={{flex: 1}}>
        {photosUrls == undefined ? (
          <Loading text="Loading Profile" />
        ) : (
          <>
            <DefaultScreenHeader
              navigation={navigation}
              firstTabTitle="My Profile"
              secondTabTitle="Preview"
            />

            <ScrollView>
              <View style={styles.imagesContainer}>
                <View style={styles.imagesRow}>{firstRow}</View>
                <View style={[styles.imagesRow, styles.secondRow]}>
                  {secondRow}
                </View>
              </View>

              <View styles={styles.form}>
                {/* <Input label="First Name" placeholder={firstName} />
                <Input label="Birthday" placeholder={dateOfBirth} /> */}
                <Input label="Spoken Languages" placeholder="Hebrew, English" />
                <Input label="Location" placeholder="Tel-Aviv, Israel" />
                <Input
                  label="About Me"
                  placeholder="A short Description about yourself"
                />
                <Button title="Log out" onPress={() => handleLogout()} />
                {/* <Button
            title="Delete profile"
            onPress={() => deleteProfile('1khYM40FuAfYueXE82dY1KVX9mx1')}
          /> */}
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </Root>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    marginBottom: 12,
    marginLeft: 7.5,
    // borderColor: 'blue',
    // borderWidth: 2
  },
  // form: {
  //   width: '90%',
  // },
  imagesRow: {
    flexDirection: 'row',
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default EditProfileScreen;
