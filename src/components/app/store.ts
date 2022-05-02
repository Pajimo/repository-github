import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "../profile/profile-api-slice";
import tokenReducer from '../profile/token';


export const store = configureStore({
    reducer: {
        token: tokenReducer,
        [profileSlice.reducerPath]: profileSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(profileSlice.middleware)
    }
});



// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>