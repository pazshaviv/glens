import React, {useState} from 'react';
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import OnlineSwitch from '../components/OnlineSwitch';

const DefaultScreenHeader = ({navigation, firstTabTitle, secondTabTitle}) => {
  return (
    <View style={styles.headerMenu}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <View style={styles.arrowContainer}>
          <Icon name="arrow-left" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <View style={styles.onlineSwitchContainer}>
        <OnlineSwitch />
      </View>

      <Text
        style={{
          position: 'absolute',
          bottom: 19,
          left: 10,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {firstTabTitle}
      </Text>

      <TouchableOpacity style={{position: 'absolute', bottom: 19, left: 130}}>
        <Text style={{fontSize: 13, fontWeight: 'bold', color: '#15719C'}}>
          {secondTabTitle}
        </Text>
      </TouchableOpacity>

      <ImageBackground
        style={styles.selfieImage}
        imageStyle={{borderRadius: 10}}
        source={{uri: 'https://i.imgur.com/uWzgNPF.png'}}>
        <Text
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            width: 85,
            height: 130,
            color: 'white',
          }}>
          Searching {'\n'} ...
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMenu: {
    padding: 10,
    marginTop: 10,
    height: 150,
  },
  arrowContainer: {
    top: 10,
    marginLeft: -5,
    height: 30,
    width: 30,
    // transform: [{ rotate: '180deg'}]
  },
  onlineSwitchContainer: {
    position: 'absolute',
    left: 73,
    top: 10,
  },
  selfieImage: {
    height: 130,
    width: 85,
    resizeMode: 'contain',
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DefaultScreenHeader;
