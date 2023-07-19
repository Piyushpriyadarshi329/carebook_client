import { configureStore } from '@reduxjs/toolkit'
import Appstatereducer  from '../redux/reducer/Authreducer'

export const store = configureStore({
  reducer: {

    Appdata:Appstatereducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch