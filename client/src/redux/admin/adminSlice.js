import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],            // To hold the list of all users
    currentUser: null,    // Admin details or the logged-in admin
    loading: false,       // Loading state for API calls
    error: null,          // To store error messages
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // Login start
        signInStart: (state) => {
            state.loading = true;
        },
        // Login success
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        // Login failure
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Fetch users start
        fetchUsersStart: (state) => {
            state.loading = true;
        },
        // Fetch users success
        fetchUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.error = null;
        },
        // Fetch users failure
        fetchUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Create user start
        createUserStart: (state) => {
            state.loading = true;
        },
        // Create user success
        createUserSuccess: (state, action) => {
            state.users.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        // Create user failure
        createUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Update user start
        updateUserStart: (state) => {
            state.loading = true;
        },
        // Update user success
        updateUserSuccess: (state, action) => {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },
        // Update user failure
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Delete user start
        deleteUserStart: (state) => {
            state.loading = true;
        },
        // Delete user success
        deleteUserSuccess: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
            state.loading = false;
            state.error = null;
        },
        // Delete user failure
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Sign out
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        resetError: (state) => {
            state.error = null;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOut,
    resetError,
} = adminSlice.actions;

export default adminSlice.reducer;
