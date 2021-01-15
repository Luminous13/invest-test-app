// Userstore HERE
import { createContext } from 'react';
import { makeObservable, makeAutoObservable, observable, action } from 'mobx';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '7bddc678121743bd8f3bd3c0a00f2124';
class UserStore {
  user = undefined;

  sessionId = '';

  welcomeMessage = 'IT WORKS';

  isLoading = false;

  listFullTrendingMovies = [];

  listWatchlist = [];

  currentMovie = undefined;

  constructor() {
    makeObservable(this, {
      welcomeMessage: observable,
      isLoading: observable,
      listFullTrendingMovies: observable,
      listWatchlist: observable,
      currentMovie: observable,
      loginUser: action,
      triggerLoading: action,
      setSessionId: action,
      setTrendingList: action,
      getWatchlist: action,
      checkIfInWatchList: action,
      addToWatchList: action,
      removeFromWatchList: action,
      addWatchlistAttributeToMovieList: action,
      setCurrentMovie: action,
      rateMovie: action,
      deleteRating: action,
    });

    this.getTrendingMovies();
  }

  triggerLoading = () => {
    this.isLoading = !this.isLoading;
  };

  setSessionId = (id) => (this.sessionId = id);

  loginUser = async (username, password) => {
    const {
      getRequestToken,
      authorizeRequestToken,
      createSessionId,
      triggerLoading,
      setSessionId,
    } = this;

    triggerLoading();

    try {
      const request_token = await getRequestToken();
      await authorizeRequestToken(request_token, username, password);
      const sessionId = await createSessionId(request_token);

      setSessionId(sessionId);
      const response = await this.getWatchlist(sessionId);
      if (response) {
        this.addWatchlistAttributeToMovieList();
      }
      triggerLoading();
      return true;
    } catch (e) {
      setSessionId('');
      triggerLoading();
      return false;
    }
  };

  getRequestToken = async () => {
    const response = await axios.get(
      `/authentication/token/new?api_key=${API_KEY}`,
    );

    return response.data.request_token;
  };

  authorizeRequestToken = async (token, username, password) => {
    return await axios.post(
      `/authentication/token/validate_with_login?api_key=${API_KEY}`,
      {
        username: username,
        password: password,
        request_token: token,
      },
    );
  };

  createSessionId = async (request_token) => {
    const response = await axios.post(
      `authentication/session/new?api_key=${API_KEY}`,
      {
        request_token: request_token,
      },
    );

    return response.data.session_id;
  };

  setTrendingList = (list) => {
    // this.listFullTrendingMovies = [];
    this.listFullTrendingMovies = list;
  };

  getTrendingMovies = async () => {
    const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);

    this.setTrendingList(response.data.results);
  };

  getWatchlist = async (sessionId) => {
    try {
      const listWatchlist = await axios.get(
        `/account/{account_id}/watchlist/movies?api_key=${API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`,
      );

      this.listWatchlist = listWatchlist.data.results;
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  };

  addWatchlistAttributeToMovieList = () => {
    this.listFullTrendingMovies.forEach((movie) => {
      movie.isWatchlist = this.checkIfInWatchList(movie.original_title);
    });
    this.listWatchlist.forEach((movie) => {
      movie.isWatchlist = this.checkIfInWatchList(movie.original_title);
    });
  };

  checkIfInWatchList = (title) => {
    return this.listWatchlist.some((movie) => movie.original_title === title)
      ? true
      : false;
  };

  addToWatchList = async (movie) => {
    this.listFullTrendingMovies.forEach(
      (_movie) => _movie.id === movie.id && (_movie.isWatchlist = true),
    );

    this.listFullTrendingMovies = this.listFullTrendingMovies.slice();
    this.listWatchlist.push(movie);

    await axios.post(
      `account/{account_id}/watchlist?api_key=${API_KEY}&session_id=${this.sessionId}`,
      {
        media_type: 'movie',
        media_id: movie.id,
        watchlist: true,
      },
    );
  };

  removeFromWatchList = async (movie) => {
    this.listFullTrendingMovies.forEach(
      (_movie) => _movie.id === movie.id && (_movie.isWatchlist = false),
    );

    this.listWatchlist = this.listWatchlist.filter(
      (_movie) => _movie.id !== movie.id,
    );

    await axios.post(
      `account/{account_id}/watchlist?api_key=${API_KEY}&session_id=${this.sessionId}`,
      {
        media_type: 'movie',
        media_id: movie.id,
        watchlist: false,
      },
    );
  };

  setCurrentMovie = (movie) => {
    this.currentMovie = movie;

    this.getMovieReviews(movie.id);
    this.getAccountStates(movie.id);
  };

  getMovieReviews = async (id) => {
    const response = await axios.get(
      `movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
    );

    this.currentMovie.reviews = response.data.results;
  };

  rateMovie = async (value) => {
    try {
      const response = await axios.post(
        `/movie/${this.currentMovie.id}/rating?api_key=${API_KEY}&session_id=${this.sessionId}`,
        {
          value: value,
        },
      );

      this.currentMovie.rated = true;
      return true;
    } catch (e) {
      return e.message;
    }
  };

  deleteRating = async () => {
    try {
      await axios.delete(
        `/movie/${this.currentMovie.id}/rating?api_key=${API_KEY}&session_id=${this.sessionId}`,
      );

      this.currentMovie.rated = false;
    } catch (e) {
      console.log(e.message);
    }
  };

  getAccountStates = async (id) => {
    const response = await axios.get(
      `/movie/${id}/account_states?api_key=${API_KEY}&session_id=${this.sessionId}`,
    );

    this.currentMovie.rated = response.data.rated;
  };
}

export const UserStoreContext = createContext(new UserStore());
