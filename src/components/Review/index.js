import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import moment from 'moment';

const Review = ({ review }) => {
  const handleAvatarUrl = (url) => {
    if (typeof url === 'string') {
      return url.replace('/', '');
    }
    if (url === null) {
      return 'https://secure.gravatar.com/avatar/klZ9hebmc8biG1RC4WmzNFnciJN.jpg';
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.authorDateContainer}>
        <View style={styles.authorContainer}>
          <Image
            style={styles.image}
            source={{
              uri: handleAvatarUrl(review.author_details.avatar_path).includes(
                'https',
              )
                ? handleAvatarUrl(review.author_details.avatar_path)
                : 'https://secure.gravatar.com/avatar/klZ9hebmc8biG1RC4WmzNFnciJN.jpg',
            }}
          />
          <Text style={styles.author}>{review.author}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{review.author_details.rating}</Text>
            <Text>/10</Text>
          </View>
        </View>
        <Text style={styles.date}>{moment(review).format('LL')}</Text>
      </View>
      <Text>{review.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
  },
  authorDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: { height: 50, width: 50, borderRadius: 25, marginRight: 10 },
  authorContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingContainer: { flexDirection: 'row', marginLeft: 10 },
  rating: { fontWeight: 'bold' },
  date: { fontStyle: 'italic', color: 'gray' },
  author: { fontStyle: 'italic', fontWeight: 'bold' },
});

export default Review;
