import React, { useState } from 'react';
import { Button, TouchableOpacity, StyleSheet, Image, Text, View, ImageBackground } from 'react-native';
import { Badge } from 'react-native-elements';

const MatchDetail = ({ match }) => {
  let photoUri = 'https://scontent.fhfa1-2.fna.fbcdn.net/v/t1.0-9/17796836_1150382925090762_736476295883560996_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=_g585yVw6mIAX8P0ZfI&_nc_ht=scontent.fhfa1-2.fna&oh=29cf9a383bcbec6569786ca6252755e3&oe=5EED59A0'
  if(match.photoUrls != undefined) {
    photoUri = match.photoUrls[0];
  }

  return (
    <ImageBackground style={styles.image} imageStyle={{ borderRadius: 10 }} source={{ uri: photoUri }}>
      <Badge containerStyle={{ position: 'absolute', padding: 3 }} value='1' status='success' />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 95,
    height: 125,
    marginRight: 9,
  },
});

export default MatchDetail;
