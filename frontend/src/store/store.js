import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import courseSlice from './courseSlice';
import lectureSlice from './lectureSlice';
const store = configureStore({
    reducer: {
        auth: authSlice,
        courses: courseSlice,
        lectures: lectureSlice
    }
});

export default store;