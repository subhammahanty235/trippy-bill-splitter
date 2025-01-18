import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import tripReducer from './reducers/tripReducer';
import connectionReducer from './reducers/connectionReducer';
import globalReducer from './reducers/globalReducer';
import userReducer from './reducers/userReducer';
import expenseReducer from './reducers/expenseReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        trip: tripReducer,
        connection:connectionReducer,
        global:globalReducer,
        user: userReducer,
        expense:expenseReducer

    },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch