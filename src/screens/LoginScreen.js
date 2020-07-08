import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {SocialIcon, Button} from 'react-native-elements';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState('');

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    const signin = await auth().signInWithCredential(facebookCredential);

    const {currentUser} = auth();
    const uid = currentUser.uid;
    // checkProfileExistence(currentUser.uid, data.accessToken);
    //=== Check if profile exists
    console.log('uid: ' + uid);
    var docRef = firestore().collection('profiles').doc(uid);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
          addProfileToDatabase(uid, data.accessToken);
          console.log('Profile added to firebase');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });

    // checkProfileExistence('0Rwsk6Axveem6K1ObjsiCzNyJfB3').then((response) =>
    //   console.log(response),
    // );

    return signin;
  }

  async function checkProfileExistence(docID) {
    // let result = null
    // await firestore()
    //   .collection('profiles')
    //   .doc(docID)
    //   .onSnapshot((documentSnapshot) => {
    //     result = 'hello there'
    //   });
    //   return result;
  }

  async function addProfileToDatabase(uid, accessToken) {
    fetch(`https://graph.facebook.com/me?access_token=${accessToken}`)
      .then((response) => response.json())
      .then((json) => {
        console.log('name: ' + json.name);
        try {
          const user = {
            name: json.name,
            photoUrls: [
              'https://scontent.fhfa1-2.fna.fbcdn.net/v/t1.0-9/17796836_1150382925090762_736476295883560996_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=_g585yVw6mIAX8P0ZfI&_nc_ht=scontent.fhfa1-2.fna&oh=29cf9a383bcbec6569786ca6252755e3&oe=5EED59A0',
            ],
            bio: '',
            dateOfBirth: '',
            gender: '',
          };
          firestore().collection('profiles').doc(uid).set(user);
        } catch (error) {
          console.log(error.toString());
        }
      });
  }

  // function handleLogin() {
  //   auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       console.log('User signed in!');
  //       addProfile();
  //     })
  //     .catch((error) => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         console.log('That email address is already in use!');
  //       }

  //       if (error.code === 'auth/invalid-email') {
  //         console.log('That email address is invalid!');
  //       }

  //       console.error(error);
  //     });
  // };

  // handleSignup = () => {
  //   auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       console.log('User account created & signed in!');
  //       addProfile();
  //     })
  //     .catch((error) => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         console.log('That email address is already in use!');
  //       }

  //       if (error.code === 'auth/invalid-email') {
  //         console.log('That email address is invalid!');
  //       }

  //       console.error(error);
  //     });
  // };

  return (
    <ImageBackground
      source={{uri: 'https://i.ibb.co/kSXDmkX/background-PNG.png'}}
      style={styles.imageBackgroundContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headersContainer}>
          <Text style={styles.welcomeTitle}>Welcome to Glens</Text>
          <View style={styles.sloganContainer}>
            <Text style={styles.sloganFirstPart}>Meet matches</Text>
            <Text style={styles.sloganSecondPart}>in your vibes</Text>
          </View>
        </View>
        <View style={styles.signInSection}>
          <Text style={{fontSize: 20, paddingBottom: 10}}>Sign in</Text>

          <Button
            titleStyle={{color: 'black'}}
            containerStyle={{width: '95%'}}
            buttonStyle={{
              borderColor: '#dbdfe1',
              borderWidth: 1,
              borderRadius: 50,
              height: 65,
            }}
            type="outline"
            icon={
              <SocialIcon
                iconSize={30}
                type="apple"
                style={{position: 'absolute', left: 10}}
              />
            }
            title="Apple"
          />

          <Button
            titleStyle={{color: 'black'}}
            containerStyle={{width: '95%'}}
            buttonStyle={{
              borderColor: '#dbdfe1',
              borderWidth: 1,
              borderRadius: 50,
              height: 65,
            }}
            type="outline"
            icon={
              <SocialIcon
                iconSize={30}
                type="facebook"
                style={{position: 'absolute', left: 10}}
              />
            }
            title="Facebook"
            onPress={() =>
              onFacebookButtonPress().then(() =>
                console.log('Signed in with Facebook!'),
              )
            }
          />
          <Button
            titleStyle={{color: 'black'}}
            containerStyle={{width: '95%'}}
            buttonStyle={{
              borderColor: '#dbdfe1',
              borderWidth: 1,
              borderRadius: 50,
              height: 65,
            }}
            type="outline"
            icon={
              <SocialIcon
                iconSize={30}
                type="google"
                style={{position: 'absolute', left: 10}}
              />
            }
            title="Google"
          />

          <Text>Or</Text>
        </View>

        {/* <Text>Login</Text>
      {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        value={email}
      />
      <TextInput
        secureTextEntry
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        value={password}
      />
      <Button title="Login" />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
      <SocialIcon
        title="Sign In With Facebook"
        button
        type="facebook"
        style={{padding: 20}}
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          )
        }
      /> */}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: '100%',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
  },
  headersContainer: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  signInSection: {
    flex: 2,
    // borderColor: 'green',
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  welcomeTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    padding: 30,
    paddingLeft: 20,
  },
  sloganContainer: {
    paddingLeft: 40,
  },
  sloganFirstPart: {
    fontSize: 35,
    paddingLeft: 20,
  },
  sloganSecondPart: {
    fontSize: 35,
    paddingLeft: 90,
  },
  textInput: {
    height: 40,
    width: '90%',
    // borderColor: 'gray',
    // borderWidth: 1,
    marginTop: 8,
  },
});

export default LoginScreen;
