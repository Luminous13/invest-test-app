import React, { useContext, useState } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { UserStoreContext } from '../../stores/UserStore';
import { Review, RatingModal } from '../../components';
import { FlatList } from 'react-native-gesture-handler';

const MovieDetails = () => {
  const userStore = useContext(UserStoreContext);
  const { currentMovie, rateMovie, deleteRating } = userStore;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGenreDisplay = (id) => {
    const listGenre = [
      { genre: 'Action', id: 28 },
      { genre: 'Adventure', id: 12 },
      { genre: 'Animation', id: 16 },
      { genre: 'Comedy', id: 35 },
      { genre: 'Crime', id: 80 },
      { genre: 'Documentary', id: 99 },
      { genre: 'Drama', id: 18 },
      { genre: 'Family', id: 10751 },
      { genre: 'Fantasy', id: 14 },
      { genre: 'History', id: 36 },
      { genre: 'Horror', id: 27 },
      { genre: 'Music', id: 10402 },
      { genre: 'Mystery', id: 9648 },
      { genre: 'Romance', id: 10749 },
      { genre: 'Science Fiction', id: 878 },
      { genre: 'TV Movie', id: 10770 },
      { genre: 'Thriller', id: 53 },
      { genre: 'War', id: 10752 },
      { genre: 'Western', id: 37 },
    ];

    return listGenre.find((_genre) => _genre.id === id).genre;
  };

  const displayListGenre = () => {
    const list = currentMovie.genre_ids.map((id) => handleGenreDisplay(id));
    return list.join(', ');
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.detailsContainer}>
        <Image
          style={styles.movieImage}
          source={{
            uri: `https://image.tmdb.org/t/p/original/${currentMovie.poster_path}`,
          }}
        />
        <View style={styles.movieDetails}>
          <View>
            <Text style={styles.movieTitle}>{currentMovie.original_title}</Text>
            <Text>{displayListGenre()}</Text>
            <Text>{moment(currentMovie.release_date).format('LL')}</Text>
            <View style={styles.voteContainer}>
              <Text style={styles.vote}>{currentMovie.vote_average}</Text>
              <Text>/10</Text>
            </View>
          </View>
          <View style={styles.rateButtonContainer}>
            {currentMovie.rated ? (
              <Button
                title="Delete Rating"
                style={styles.btnRated}
                onPress={deleteRating}
              />
            ) : (
              <Button
                title="Rate"
                style={styles.rateButton}
                onPress={() => setIsModalVisible(true)}
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.reviewsContainer}>
        <View style={styles.reviewHeaderContainer}>
          <Text>Reviews</Text>
        </View>
        {currentMovie.reviews && currentMovie.reviews.length > 0 ? (
          <FlatList
            data={currentMovie.reviews}
            renderItem={({ item }) => <Review review={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.imageEmptyContainer}>
            <Image
              style={styles.imageEmptyPlaceholder}
              source={{
                uri:
                  'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png',
              }}
            />
          </View>
        )}
      </View>

      <RatingModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        rateMovie={rateMovie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 25,
  },
  movieImage: {
    height: 160,
    width: 100,
  },
  movieDetails: {
    marginLeft: 10,
    width: '70%',
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    flexWrap: 'wrap',
  },
  voteContainer: { flexDirection: 'row' },
  vote: { fontWeight: 'bold' },
  reviewHeaderContainer: {
    height: 30,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewsContainer: {
    flex: 3,
  },
  rateButtonContainer: {
    marginTop: 10,
  },
  rateButton: {
    borderRadius: 24,
  },
  btnRated: {
    backgroundColor: 'white',
  },
  imageEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmptyPlaceholder: {
    width: '80%',
    height: '60%',
  },
});

export default observer(MovieDetails);
