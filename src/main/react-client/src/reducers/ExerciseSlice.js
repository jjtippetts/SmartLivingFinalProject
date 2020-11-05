import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const exampleExercisePlan = {
    id: 0,
    name: "Example Exercise Plan",
    exercises: [{
        exerciseId: 0,
        sets: 1,
        reps: 1
    },
    {
        exerciseId: 0,
        sets: 5,
        reps: 5
    },
    {
        exerciseId: 0,
        sets: 5,
        reps: 5
    },
    {
        exerciseId: 0,
        sets: 5,
        reps: 5
    },
    ]  // Each exercise will have exerciseId, sets, and reps
};

const exampleExercises = [
    {
        id: 0,
        name: "bicep curl",
        muscles: ["bicep"],
    },
    {
        id: 1,
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
                // Exercises: { exerciseId, sets, reps }
                return {
                    payload: {
                        name,
                        exercises
                    }
                }
            }
        },
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
        retrieveExercises: {
            reducer (state, action) {
            },
            prepare(exerciseName) {
                return getExercises(exerciseName);
            }
        }
    }
});

function getExercises(exerciseName) {
    const url = `/api/exercise?=${exerciseName}`
}


export default exerciseSlice.reducer;
export const { exercisePlanAdded, exerciseAddedToPlan, exercisePlanExerciseDeleted, exercisePlanSetsRepsUpdated, retrieveExercises } = exerciseSlice.actions;