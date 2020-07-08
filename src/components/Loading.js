import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
// import firebase from 'react-native-firebase';

const Loading = ({text}) => {
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     navigation.navigate(user ? 'Main' : 'Login');
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
