import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import counterReducer from '../features/counter/counterSlice'
import tasksReducer from '../features/tasks/tasksSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer
  }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

