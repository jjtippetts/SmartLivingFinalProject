import { createAction, createReducer } from '@reduxjs/toolkit';
import { CREATE_EXERCISE_PLAN } from '../constants/actionTypes';

const createExercisePlan = createAction(CREATE_EXERCISE_PLAN);

export const RootReducer = createReducer([], {
    [createExercisePlan.type]: (state, action) => {
        return state;
    },
});