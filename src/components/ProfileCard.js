import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
// import { Image as Image } from "react-native-expo-image-cache";
import Dots from 'react-native-dots-pagination';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
// import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import {Entypo, FontAwesome5} from 'react-native-vector-icons/Ionicons';
import ExpandableBio from '../components/ExpandableBio';

const INDICATORS_WIDTH = 310;
const CARD_RADIUS = 17;

const ProfileCard = ({card}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  let age = '';
  let name = '';
  let bio = '';
  let languagesArray = [];
  let photoUrls = [
    'https://scontent.fhfa1-2.fna.fbcdn.net/v/t1.0-9/17796836_1150382925090762_736476295883560996_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=_g585yVw6mIAX8P0ZfI&_nc_ht=scontent.fhfa1-2.fna&oh=29cf9a383bcbec6569786ca6252755e3&oe=5EED59A0',
  ];
  let photosAmount = 1;
  profileDetails = card;

  try {
    var date = new Date(card.dateOfBirth.seconds * 1000);
    const current_year = new Date().getFullYear();
    age = current_year - date.getFullYear();
    name = card.name;
    bio = card.bio;
    languagesArray = card.languages.length == 0 ? ['Unkown'] : card.languages;
    photoUrls = card.photoUrls.length == 0 ? photoUrls : card.photoUrls;
    photosAmount = photoUrls.length;
  } catch (e) {
    console.log('error showing details:' + e);
  }

  const uri = photoUrls[photoIndex];
  // console.log('uri: ' + uri);
  const indicatorWidth = INDICATORS_WIDTH / photosAmount - 10;

  return (
    <View style={styles.card}>
      <Image style={styles.profilePhoto} source={{uri: uri}} />

      <View style={styles.cardTopMenu}>
        {photosAmount === 1 ? (
          <View style={{width: 295}}></View>
        ) : (
          <Dots
            length={photosAmount}
            paddingVertical={12}
            activeDotHeight={3}
            activeDotWidth={indicatorWidth}
            passiveDotHeight={3}
            passiveDotWidth={indicatorWidth}
            activeColor="#FFFFFF"
            passiveColor="rgba(255,255,255,0.4)"
            active={photoIndex}
            alignDotsOnXAxis
            paddingHorizontal={-10}
          />
        )}

        <View>
          {/* <Menu>
            <MenuTrigger>
              <View style={{height: 80, width: 50, left: -14}}>
                <Entypo
                  name="dots-three-vertical"
                  style={styles.threeDots}
                  size={20}
                  color="white"
                />
              </View>
            </MenuTrigger>
            <MenuOptions
              style={{padding: 10}}
              optionsContainerStyle={{
                marginTop: 40,
                marginLeft: -20,
                width: 130,
              }}>
              <MenuOption style={{}} onSelect={() => alert(`Report`)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome5 name="exclamation" size={20} color="black" />
                  <Text style={{fontSize: 20, paddingLeft: 13}}>Report</Text>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu> */}
        </View>
      </View>

      <TouchableOpacity
            style={styles.rightTap}
            onPress={() => {
              photoIndex === photosAmount - 1
                ? null
                : setPhotoIndex(photoIndex + 1);
            }}
          />

          <TouchableOpacity
            style={styles.leftTap}
            onPress={() => {
              photoIndex === 0 ? null : setPhotoIndex(photoIndex - 1);
            }}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  bioContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  card: {
    position: 'absolute',
    top: -50,
    // position: 'absolute',
    height: '110%',
    width: '105%',
    borderRadius: CARD_RADIUS,
    // borderColor: 'red',
    // borderWidth: 2
    // backgroundColor: 'transparent'
  },
  profilePhoto: {
    // flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: CARD_RADIUS,
    // resizeMode: 'contain'
  },
  rightTap: {
    position: 'absolute',
    borderColor: 'blue',
    height: '91%',
    width: '50%',
    right: 0,
    bottom: 0,
  },
  leftTap: {
    position: 'absolute',
    borderColor: 'purple',
    height: '100%',
    width: '50%',
    left: 0,
  },
  cardTopMenu: {
    position: 'absolute',
    width: INDICATORS_WIDTH,
    left: 17,
    flexDirection: 'row',
    top: 7,
  },
  threeDots: {
    position: 'absolute',
    top: 10,
    right: 6,
  },
});

export default ProfileCard;
