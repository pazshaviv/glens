import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {Ionicons, MaterialIcons} from 'react-native-vector-icons/Ionicons';

function buildLanguagesString(languagesArray) {
  const languagesDict = {
    en: 'English',
    he: 'Hebrew',
    sw: 'Swedish',
  };

  var languagesString = '';
  var currentLanguage = languagesDict[languagesArray[0]];
  for (let i = 1; i < languagesArray.length; i++) {
    languagesString = currentLanguage + ' • ' + languagesString;
    currentLanguage = languagesDict[languagesArray[i]];
  }
  languagesString = languagesString + currentLanguage;
  return languagesString;
}

const ExpandableBio = ({bio, name, age, languagesArray}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const languages = buildLanguagesString(languagesArray);

  return (
    <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
      {/* <LinearGradient style={styles.container} colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']}> */}
      <View style={[styles.arrow, isCollapsed ? styles.toggleArrow : null]}>
        <Ionicons size={24} style={{color: 'white'}} name="ios-arrow-down" />
        <Ionicons size={24} style={{color: 'white'}} name="ios-arrow-down" />
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.nameAndAge}>
          {name}, {age}
        </Text>

        <View style={styles.languagesContainer}>
          <MaterialIcons name="language" size={12} color="white" />
          <MaterialIcons name="language" size={12} color="white" />
          <Text style={styles.languagesText}>{languages}</Text>
        </View>

        {isCollapsed ? null : <Text style={styles.additionalInfo}>{bio}</Text>}
      </View>
      {/* </LinearGradient> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 0,
    borderRadius: 20,
  },
  arrow: {
    width: undefined,
    alignItems: 'center',
    top: 0,
  },
  toggleArrow: {
    transform: [{rotate: '180deg'}],
  },
  bioContainer: {
    paddingLeft: 15,
  },
  nameAndAge: {
    fontFamily: 'ArialRoundedMTBold',
    color: 'white',
    fontSize: 20.8,
  },
  languagesContainer: {
    flexDirection: 'row',
    height: 15,
    marginTop: 7.5,
    marginBottom: 15,
    alignItems: 'center',
  },
  languagesIcon: {
    height: 13,
    width: 14,
    resizeMode: 'contain',
  },
  languagesText: {
    fontFamily: 'ArialRoundedMTBold',
    color: 'white',
    fontSize: 12,
    paddingLeft: 3.5,
  },
  additionalInfo: {
    color: 'white',
    paddingBottom: 30,
  },
});

export default ExpandableBio;
