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

export const saveUserExercisePlan = createAsyncThunk(
    'exercise/saveUserExercisePlan',
    async (exercisePlan) => {
        const url = '/api/exercisePlans/new';
        const res = await axios.post(url, exercisePlan);
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
        reps: 1
    },
    {
        exercise: {
            id: 1,
            name: "bicep curl",
            muscles: ["bicep"],
        },
        sets: 5,
        reps: 5
    },
    {
        exercise: {
            id: 1,
            name: "bicep curl",
            muscles: ["bicep"],
        },
        sets: 5,
        reps: 5
    },
    {
        exercise: {
            id: 1,
            name: "bicep curl",
            muscles: ["bicep"],
        },
        sets: 5,
        reps: 5
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

                        let newExercises = plan.exercises.slice();
                        newExercises.push({exerciseId: action.payload.exerciseId, sets: 1, reps: 1});

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
                    exercises: exercisePlan.exercisesSetsReps,
                });
            }

        },
    }
});

function getExercises(exerciseName) {
    const url = `/api/exercise?=${exerciseName}`
}


export default exerciseSlice.reducer;
export const { exercisePlanAdded, exercisePlanDeleted, exerciseAddedToPlan, exercisePlanExerciseDeleted, exercisePlanSetsRepsUpdated } = exerciseSlice.actions;