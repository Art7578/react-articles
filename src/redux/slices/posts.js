import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPost = createAsyncThunk('/posts/fetchPost', async () => {
    const {data} = await axios.get('/posts');
    return data;
})

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {
  const { data } = await axios.get('/posts/tags'); // Исправлено на /posts/tags
  return data;
})

export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) => {
    await axios.delete(`/posts/${id}`);
})

export const fetchPostsByTag = createAsyncThunk(
    '/posts/fetchPostsByTag',
    async (tag) => {
      try {
        const { data } = await axios.get(`/posts/tag/${tag}`);
        return data;
      } catch (error) {
        throw error;
      }
    }
  );

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Получение статей
        .addCase(fetchPost.pending, (state) => {
          state.posts.items = [];
          state.posts.status = 'loading';
        })
        .addCase(fetchPost.fulfilled, (state, action) => {
          state.posts.items = action.payload;
          state.posts.status = 'loaded';
        })
        .addCase(fetchPost.rejected, (state) => {
          state.posts.items = [];
          state.posts.status = 'error';
        })
        
        // Получение тегов
        .addCase(fetchTags.pending, (state) => {
          state.tags.items = [];
          state.tags.status = 'loading';
        })
        .addCase(fetchTags.fulfilled, (state, action) => {
          state.tags.items = action.payload.reduce((acc, tag) => {
            if (!acc.includes(tag)) {
              acc.push(tag);
            }
            return acc;
          }, []);
          state.tags.status = 'loaded';
        })
        .addCase(fetchTags.rejected, (state) => {
          state.tags.items = [];
          state.tags.status = 'error';
        })
  
        // Получение статей по тегу
        .addCase(fetchPostsByTag.pending, (state) => {
          state.posts.items = [];
          state.posts.status = 'loading';
        })
        .addCase(fetchPostsByTag.fulfilled, (state, action) => {
          state.posts.items = action.payload;
          state.posts.status = 'loaded';
        })
        .addCase(fetchPostsByTag.rejected, (state) => {
          state.posts.items = [];
          state.posts.status = 'error';
        })
  
        // Удаление статей
        .addCase(fetchRemovePost.pending, (state, action) => {
          state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
        });
    },
  });
export const postsReducer = postSlice.reducer;