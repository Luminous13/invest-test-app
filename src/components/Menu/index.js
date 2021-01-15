import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

const Menu = ({ currentIndex, navigate }) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={
          currentIndex === 0
            ? styles.menuItemContainerActive
            : styles.menuItemContainer
        }
        onPress={() => navigate(0)}>
        <Icon
          type="Ionicons"
          name="md-home-outline"
          style={currentIndex === 0 && styles.menuItemIconActive}
        />
        <Text
          style={
            currentIndex === 0 ? styles.menuItemTextActive : styles.menuItemText
          }>
          Home
        </Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={
          currentIndex === 1
            ? styles.menuItemContainerActive
            : styles.menuItemContainer
        }
        onPress={() => navigate(1)}>
        <Icon
          type="FontAwesome"
          name="eye"
          style={currentIndex === 1 && styles.menuItemIconActive}
        />
        <Text
          style={
            currentIndex === 1 ? styles.menuItemTextActive : styles.menuItemText
          }>
          Watchlist
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 0.5,
  },
  divider: {
    width: 0.5,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  menuItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  menuItemIconActive: { color: 'white' },
  menuItemContainerActive: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00aff4',
  },
  menuItemTextActive: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
});

export default Menu;
