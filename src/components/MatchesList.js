import React, {useState, Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MatchDetail from './MatchDetail';

const MatchesList = ({title, profiles, toggleMenu}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 20, paddingRight: 10}}>{title}</Text>
        <TouchableOpacity>
          <Icon name="ios-information-circle-outline" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={{position: 'absolute', right: 10}}>
          <Text style={{color: '#15719C', fontWeight: 'bold'}}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={profiles}
        keyExtractor={(profile) => profile.uid}
        renderItem={({item}) => {
          console.log('MatchesList: ' + item.bio);
          return (
            <TouchableOpacity onPress={() => toggleMenu(`${item.name}`, title)}>
              <MatchDetail match={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 2,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
});

export default MatchesList;
