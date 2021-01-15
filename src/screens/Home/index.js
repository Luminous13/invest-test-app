import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { UserStoreContext } from '../../stores/UserStore';

import { Menu, SearchBar, MovieList, Watchlist } from '../../components';

const Home = () => {
  const userStore = useContext(UserStoreContext);
  const {
    listFullTrendingMovies,
    listWatchlist,
    getWatchlist,
    checkIfInWatchList,
    addToWatchList,
    removeFromWatchList,
    setCurrentMovie,
  } = userStore;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [txtSearch, setTxtSearch] = useState('');

  useEffect(() => {}, [listFullTrendingMovies]);

  const handleSearch = (text) => {
    setTxtSearch(text);
  };

  return (
    <View style={styles.mainContainer}>
      <SearchBar onChangeText={handleSearch} />
      <View style={styles.contentContainer}>
        {currentIndex === 0 ? (
          <MovieList
            listMovie={listFullTrendingMovies.filter((movie) =>
              movie.original_title.includes(txtSearch),
            )}
            listWatchlist={listWatchlist}
            checkIfInWatchList={checkIfInWatchList}
            addToWatchList={addToWatchList}
            removeFromWatchList={removeFromWatchList}
            setCurrentMovie={setCurrentMovie}
          />
        ) : (
          <MovieList
            listMovie={listWatchlist.filter((movie) =>
              movie.original_title.includes(txtSearch),
            )}
            checkIfInWatchList={checkIfInWatchList}
            addToWatchList={addToWatchList}
            removeFromWatchList={removeFromWatchList}
            setCurrentMovie={setCurrentMovie}
          />
        )}
      </View>
      <Menu currentIndex={currentIndex} navigate={setCurrentIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export default observer(Home);
