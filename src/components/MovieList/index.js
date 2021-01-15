import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';

const MovieItem = ({
  movie,
  addToWatchList,
  removeFromWatchList,
  setCurrentMovie,
  navigate,
}) => (
  <Pressable
    style={styles.listItemContainer}
    onPress={() => {
      setCurrentMovie(movie);
      navigate();
    }}>
    <View style={styles.itemDetails}>
      <Image
        style={styles.movieImage}
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
      />
      <Text>{movie.original_title}</Text>
      <Text>{movie.isWatchlist}</Text>
    </View>
    <View>
      {movie.isWatchlist ? (
        <Pressable onPress={() => removeFromWatchList(movie)}>
          <Icon type="AntDesign" name="star" style={styles.activeWatchlist} />
        </Pressable>
      ) : (
        <Pressable onPress={() => addToWatchList(movie)}>
          <Icon type="AntDesign" name="staro" />
        </Pressable>
      )}
    </View>
  </Pressable>
);

const MovieList = ({
  listMovie,
  addToWatchList,
  removeFromWatchList,
  setCurrentMovie,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      {listMovie.length > 0 ? (
        <FlatList
          data={listMovie}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              addToWatchList={addToWatchList}
              removeFromWatchList={removeFromWatchList}
              setCurrentMovie={setCurrentMovie}
              navigate={() => {
                navigation.navigate('MovieDetails');
              }}
            />
          )}
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
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    zIndex: 99,
    backgroundColor: 'white',
  },
  movieImage: {
    height: 70,
    width: 50,
    marginRight: 25,
  },
  listItemContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeWatchlist: { color: '#f7c106' },
  imageEmptyPlaceholder: {
    width: '60%',
    height: '60%',
  },
  imageEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieList;
