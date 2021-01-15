import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, Button } from 'react-native';
import { Icon } from 'native-base';
import Slider from '@react-native-community/slider';

const RatingModal = ({ isVisible, closeModal, rateMovie }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (num) => setRating(num.toFixed(1));

  return (
    <Modal
      style={styles.mainContainer}
      visible={isVisible}
      transparent={true}
      animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modelContentContainer}>
          <Pressable style={styles.closeIconContainer} onPress={closeModal}>
            <Icon
              type="AntDesign"
              name="closecircleo"
              style={styles.closeIcon}
            />
          </Pressable>
          <Text style={styles.txtRating}>{rating}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#00aff4"
            maximumTrackTintColor="#000000"
            onValueChange={handleRating}
            step={0.5}
          />
          <View style={styles.btnRateContainer}>
            <Button
              title="Rate"
              onPress={async () => {
                await rateMovie(rating);
                closeModal();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: 'red',
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelContentContainer: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    height: '30%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: { fontSize: 24 },
  btnRateContainer: {
    width: '50%',
    marginTop: 20,
  },
  btnRate: { marginTop: 25, width: '100%', borderRadius: 12 },
  txtRating: { fontSize: 24, fontWeight: 'bold' },
  slider: { width: 200, height: 40 },
});

export default RatingModal;
