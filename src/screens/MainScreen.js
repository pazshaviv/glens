import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
// import NavButtonIcon from '../components/NavButtonIcon';
import OnlineSwitch from '../components/OnlineSwitch';
import ProfileCard from '../components/ProfileCard';
import useFeeds from '../hooks/useFeeds';
import Loading from '../components/Loading';

// import firestore from '@react-native-firebase/firestore';

const Card = ({card}) => {
  return <ProfileCard card={card} />;
};

const MainScreen = ({navigation}) => {
  const [profiles, errorMessage] = useFeeds();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(247,248,250)'}}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Image
            style={styles.buttonIcon}
            source={{uri: 'https://i.ibb.co/Q99v5kq/profile-copy.png'}}
          />
        </TouchableOpacity>

        <OnlineSwitch />

        <TouchableOpacity onPress={() => navigation.navigate('Matches')}>
          <Image
            style={styles.buttonIcon}
            source={{uri: 'https://i.ibb.co/DWcThS2/matches.png'}}
          />
        </TouchableOpacity>
      </View>
      {profiles.length == 0 ? (
        <Loading text="Loading Profiles" />
      ) : (
        <View style={styles.swiperContainer}>
          <Swiper
            useViewOverflow={false}
            cards={profiles}
            cardIndex={0}
            renderCard={(card) => <Card card={card} />}
            marginTop={0}
            // verticalSwipe={false}
            backgroundColor={'rgb(247,248,250)'}
            infinite
            disableTopSwipe
            disableBottomSwipe
            animateCardOpacity
            showSecondCard
            stackSize={2}
            // stackScale={10}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    width: '200%',
    height: '93.5%',
    position: 'absolute',
    bottom: 0,
    left: -8,
  },
  headerMenu: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    height: 30,
    width: 30,
  },
});

export default MainScreen;
