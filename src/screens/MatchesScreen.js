import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView, Text} from 'react-native';
import MatchesList from '../components/MatchesList';
import useFeeds from '../hooks/useFeeds';
import DefaultScreenHeader from '../components/DefaultScreenHeader';
import {Container, Content, ActionSheet} from 'native-base';
import Loading from '../components/Loading';

const MatchesScreen = ({navigation}) => {
  // const MY_FAVORITES_IDS = [
  //   '08ujbpGflLVEPDfCapg4J02x4pq1',
  //   '0FlNACQYt0VpkYjMGChdGcisdjA2',
  //   'JJYEqIQrKg53s33BrRDY7Abkez1',
  // ];
  const [profiles, errorMessage] = useFeeds();
  const [actionSheet, setActionSheet] = useState({});

  var BUTTONS = [
    'View Details',
    'Make Favorite',
    'Make Inactive',
    `Report`,
    'Cancel',
  ];
  var DESTRUCTIVE_INDEX = 3;
  var CANCEL_INDEX = 4;

  let myFavorites = profiles.slice(4, 8);
  let myMatches = profiles.slice(0, 15);
  let onHold = profiles.slice(6, 8);

  const toggleMenu = (name, title) => {
    switch (title) {
      case 'My Favorites':
        BUTTONS = ['View Details', 'Make Inactive', `Report ${name}`, 'Cancel'];
        DESTRUCTIVE_INDEX = 2;
        CANCEL_INDEX = 3;
        break;
      case 'My Matches':
        BUTTONS[3] = `Report ${name}`;
        break;
      case 'On Hold':
        BUTTONS = ['View Details', 'Make Favorite', `Report ${name}`, 'Cancel'];
        DESTRUCTIVE_INDEX = 2;
        CANCEL_INDEX = 3;
        break;
    }

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
      },
      (buttonIndex) => {
        setActionSheet({clicked: BUTTONS[buttonIndex]});
      },
    );
  };

  return (
    <Container>
      <Content padder>
        <SafeAreaView style={{flex: 1, backgroundColor: '#F7F8FA'}}>
          <View style={{padding: 10}}>
            <DefaultScreenHeader
              navigation={navigation}
              firstTabTitle="My Matches"
              secondTabTitle="Call history"
            />

            {profiles.length === 0 ? (
              <Loading text="Loading Matches" />
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{height: 700}}>
                  {myFavorites.length === 0 ? null : (
                    <MatchesList
                      toggleMenu={toggleMenu}
                      profiles={myFavorites}
                      title="My Favorites"
                    />
                  )}

                  <MatchesList
                    toggleMenu={toggleMenu}
                    profiles={myMatches}
                    title="My Matches"
                  />
                  <MatchesList
                    toggleMenu={toggleMenu}
                    profiles={onHold}
                    title="On Hold"
                  />
                </View>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default MatchesScreen;
