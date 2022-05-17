import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIKey } from "../../common/apis/MovieApiKey";
import movieApi from "../../common/apis/movieApi";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${movieText}&type="movie"`
    );

    return response.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "shows/fetchAsyncShows",
  async () => {
    const showsText = "Friends";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${showsText}&type="series"`
    );

    return response.data;
  }
);

export const fetchAsyncMovieOrShowsDetails = createAsyncThunk(
  "selectMovieOrShow/fetchAsyncMovieOrShowsDetails",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);

    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Loading");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("fulfilled");
      return { ...state, movies: payload };
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("fulfilled");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowsDetails.fulfilled]: (state, { payload }) => {
      console.log("fulfilled");
      return { ...state, selectMovieOrShow: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Loading");
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShows = (state) =>
  state.movies.selectMovieOrShow;

export default movieSlice.reducer;
