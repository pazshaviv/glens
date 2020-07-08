import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      { children }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonIcon: {
    height: 30,
    width: 30
  },
});

export default withNavigation(NavLink);
