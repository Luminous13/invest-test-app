import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Icon } from 'native-base';

const SearchBar = ({ onChangeText }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Search Movie..."
          style={styles.input}
          onChangeText={(text) => onChangeText(text)}
        />
        <Icon type="EvilIcons" name="search" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputBox: {
    borderWidth: 1,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default SearchBar;
