import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

//api network
// const API_KEY = "YOUR_API_KEY";
export const booksApi = createAsyncThunk("booksFetch",
  async () =>{
     const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=NImASy9CIAsn7OHTcGMV4eYr730Wg68T7yu0Ns7Gb8Oie1Cd`);

console.log("FULL DATA", res);
 
   return res.data.results.lists[0].books;
  }
)



//slice
export const bookSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    sortBy: "title",
    order: "asc",

  },
  reducers: {
     setSortBy(state, action) {
     state.sortBy = action.payload;
     },
     setOrder(state,action){
      state.order =  action.payload;
     }
  },
   extraReducers: (builder) => {
     builder
     .addCase(booksApi.pending, (state)=>{
      state.isLoading = true;
     })
     .addCase(booksApi.fulfilled, (state,action)=>{
      state.isLoading = false;
      state.list = action.payload;
     })
     .addCase(booksApi.rejected,(state,action)=>{
      state.isLoading = false;
      state.error = action.error.message;
     })
    }
})

export const {setSortBy, setOrder} =  bookSlice.actions;
export default bookSlice.reducer;