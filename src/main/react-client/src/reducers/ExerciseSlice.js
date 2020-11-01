import { createSlice } from '@reduxjs/toolkit';

const exampleExercisePlan = {
    id: 0,
    name: "Example Exercise Plan",
    exercises: [0] // A list of the exercise ids
};

const exampleExercises = [
    {
        id: 0,
        name: "bicep curls",
        equipment: "dumbbells",
        muscles: ["bicep", "tricep"],
    }
];

const initialState = {
    exercisePlans: [exampleExercisePlan],
    exercises: exampleExercises
};

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        exercisePlanAdded: {
            reducer (state, action) {
                const exercisePlans = state.exercisePlans;
                const id = exercisePlans[exercisePlans.length - 1].id + 1;
                state.exercisePlans.push({
                    id,
                    name: action.payload.name,
                    exercises: action.payload.exercises
                })
            },
            prepare(name, exercises) {
                return {
                    payload: {
                        name,
                        exercises
                    }
                }
            }
        }
    }
});


export default exerciseSlice.reducer;
export const { exercisePlanAdded } = exerciseSlice.actions;