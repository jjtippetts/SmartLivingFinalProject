import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserExercisePlans = createAsyncThunk(
    'exercise/fetchUserExercisePlans',
    async () => {
        const url = '/api/exercisePlans/';
        const res = await axios.get(url);
        return res.data;
    }
);

export const fetchDefaultExercises = createAsyncThunk(
    'exercise/fetchDefaultExercises',
    async () => {
        const url = '/api/exercises/default';
        const res = await axios.get(url);
        return res.data;
    }
);


export const saveUserExercisePlan = createAsyncThunk(
    'exercise/saveUserExercisePlan',
    async (exercisePlan) => {
        const url = '/api/exercisePlans/save';
        const res = await axios.post(url, exercisePlan);
        return res.data;
    }
)

export const deleteUserExercisePlan = createAsyncThunk(
    'exercise/deleteUserExercisePlan',
    async (exercisePlanId) => {
        const url = `/api/exercisePlans/delete/${exercisePlanId}`;
        const res = await axios.delete(url);
        return res.data;
    }
)


const exampleExercisePlan = {
    id: 0,
    name: "Example Exercise Plan",
    exercises: [{
        exercise: {
            id: 1,
            name: "bicep curl",
            muscles: ["bicep"],
        },
        sets: 1,
        reps: 1,
        weight: 25,
        isMetric: false
    },
    {
        exercise: {
            id: 1,
            name: "bicep curl",
            muscles: ["bicep"],
        },
        sets: 5,
        reps: 5,
        weight: 25,
        isMetric: false
    },
    {
        exercise: {
            id: 1,
            name: "bicep curl",
            muscles: ["bicep"],
        },
        sets: 5,
        reps: 5,
        weight: 25,
        isMetric: false
    },
    {
        exercise: {
            id: 1,
            name: "bicep curl",
            muscles: ["bicep"],
        },
        sets: 5,
        reps: 5,
        weight: 25,
        isMetric: false
    },
    ]  // Each exercise will have exerciseId, sets, and reps
};

const exampleExercises = [
    {
        id: 1,
        name: "bicep curl",
        muscles: ["bicep"],
    },
    {
        id: 2,
        name: "back squat",
        muscles: ["legs"]
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
        exerciseAddedToPlan: {
            reducer (state, action) {
                return {
                    ...state,
                    exercisePlans: state.exercisePlans.map((plan) => {
                        if (plan.id !== action.payload.planId) {
                            return plan;
                        }

                        let exercise = state.exercises.find((exercise) => exercise.id === action.payload.exerciseId);
                        if (exercise === null || exercise === undefined) {
                            return plan;
                        }

                        let newExercises = plan.exercises.slice();
                        newExercises.push({exercise, sets: 1, reps: 1});

                        return {
                            ...plan,
                            exercises: newExercises
                        };
                    })
                }
            },
            prepare(planId, exerciseId) {
                return {
                    payload: {
                        planId,
                        exerciseId
                    }
                }
            }

        },
        exercisePlanSetsRepsUpdated: {
            reducer (state, action) {
                return {
                    ...state,
                    exercisePlans:
                        state.exercisePlans.map((plan) => {
                        if(plan.id !== action.payload.planId) {
                            return plan;
                        }

                        const updatedExercises = plan.exercises.map((exercise, i) => {
                            if(i !== action.payload.updatedExercise.exerciseIndex) {
                                return exercise;
                            }

                            return {
                                ...exercise,
                                sets: action.payload.updatedExercise.updatedSets,
                                reps: action.payload.updatedExercise.updatedReps
                            }
                        });

                        return {
                            ...plan,
                            exercises: updatedExercises
                        };
                    })
                }
            },
            prepare(planId, updatedExercise) {
                return {
                    payload: {
                        planId,
                        updatedExercise
                    }
                }
            }
        },
        exercisePlanExerciseDeleted: {
            reducer (state, action) {
                return {
                    ...state,
                    exercisePlans:
                        state.exercisePlans.map((plan) => {
                        if(plan.id !== action.payload.planId) {
                            return plan;
                        }

                        return {
                            ...plan,
                            exercises: plan.exercises.filter((exercise, index) => index !== action.payload.toRemoveIndex)
                        };
                    })
                }
            },
            prepare(planId, toRemoveIndex) {
                return {
                    payload: {
                        planId,
                        toRemoveIndex
                    }
                }
            }
        },
        exercisePlanDeleted: {
             reducer (state, action) {
                return {
                    ...state,
                    exercisePlans:
                        state.exercisePlans.filter(plan => plan.id !== action.payload.planId)
                }
            },
            prepare(planId) {
                return {
                    payload: {
                        planId
                    }
                }
            }           
        },
        
    },
    extraReducers: {
        [saveUserExercisePlan.fulfilled]: (state, action) => {
            state.exercisePlans.push(action.payload);
        },
        [saveUserExercisePlan.rejected]: (state, action) => {
            return {
                ...state,
                errors: action.payload
            }
        },
        [fetchUserExercisePlans.rejected]: (state, action) => {
            return {
                ...state,
                errors: action.payload
            }
        },
        [fetchUserExercisePlans.fulfilled]: (state, action) => {
            for (let i = 0; i < action.payload.length; i++) {
                const exercisePlan = action.payload[i];
                state.exercisePlans.push({
                    id: exercisePlan.id,
                    name: exercisePlan.name,
                    exercises: exercisePlan.exercises,
                });
            }

        },
        [fetchDefaultExercises.fulfilled]: (state, action) => {
            state.exercises = action.payload;
        },
        [deleteUserExercisePlan.fulfilled]: (state, action) => {
                return {
                    ...state,
                    exercisePlans:
                        state.exercisePlans.filter(plan => plan.id !== action.payload)
                }
        },
        [deleteUserExercisePlan.rejected]: (state, action) => {
            return {
                ...state,
                errors: action.payload
            }
        }
    }
});


export default exerciseSlice.reducer;
export const { exercisePlanAdded, exercisePlanDeleted, exerciseAddedToPlan, exercisePlanExerciseDeleted, exercisePlanSetsRepsUpdated } = exerciseSlice.actions;