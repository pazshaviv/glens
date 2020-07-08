import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';

const OnlineSwitch = () => {
  const [switchState, setSwitchState] = useState(true);
  const onlineUri = 'https://i.ibb.co/c16YKxn/online-small.png';
  const offlineUri = 'https://i.ibb.co/j4nyFNm/offline-small.png';

  return (
    <TouchableOpacity
      onPress={() => {
        setSwitchState(!switchState);
      }}
    >
      <View style={styles.toggleSwitchContainer}>
        <Image
          style={[styles.toggleSwitch, switchState ? styles.showOnlineSwitch : styles.hideOnlineSwitch]}
          source={{ uri: onlineUri }}
        />
        <Image
          style={[styles.toggleSwitch, switchState ? styles.hideOfflineSwitch : styles.showOfflineSwitch]}
          source={{ uri: offlineUri }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleSwitchContainer: {
    height: 40,
    width: 200,
  },
  toggleSwitch: {
    resizeMode: 'contain',
    // borderWidth: 1,
    borderColor: 'green',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  showOnlineSwitch: {
    height: 40,
    width: 200,
  },
  hideOnlineSwitch: {
    height: 0,
    width: 0,
  },
  hideOfflineSwitch: {
    height: 0,
    width: 0,
  },
  showOfflineSwitch: {
    height: 40,
    width: 200,
  },
});

export default OnlineSwitch;
