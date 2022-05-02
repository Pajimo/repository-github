import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";


export interface tokenValue{
    value: string
}

const initialState = {
    value: '',
}

let tokenCode: string = ''

// const getPosts = createAsyncThunk(
//   'profile/',
//   async (thunkAPI) => {
//     const res = await fetch('https://api.github.com/user', {"Authorization"\: `token`}).then(
//     (data) => data.json()
//   )
//   return res
// })

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        getUserProfile: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
          state.value = action.payload
        }
      }
  })
  
  // Action creators are generated for each case reducer function
  export const { getUserProfile } = tokenSlice.actions
  
  export default tokenSlice.reducer
