import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { exercisePlanSetsRepsUpdated, exerciseAddedToPlan, exercisePlanExerciseDeleted } from '../reducers/ExerciseSlice';
import ExerciseListItem from '../components/ExerciseListItem';
import ExerciseSearch from './ExerciseSearch';

class ExercisePlanDisplay extends React.Component {
    constructor() {
        super();
        this.displayPlan = this.displayPlan.bind(this);
        this.displayExercises = this.displayExercises.bind(this);
        this.onSaveExercise = this.onSaveExercise.bind(this);
        this.mapExercisesToPlan = this.mapExercisesToPlan.bind(this);
        this.addToPlan = this.addToPlan.bind(this);
        this.deleteFromPlan = this.deleteFromPlan.bind(this);

        this.state = {
            exercises: [],
        }
    }

    displayExercises() {
        const exercises = this.props.exercisePlans[this.props.selectedPlanId]?.exercises;
        if(exercises === null || exercises === undefined || exercises.length === 0) {
            return (
                <div>No exercises to display.</div>
            )
        }

        const mappedExercises = this.mapExercisesToPlan();

        return mappedExercises.map((exercise, i) => {
            return (
                <ExerciseListItem key={this.props.selectedPlanId + "exercisePlanDisplay" + i} index={i} exercise={exercise} onDelete={this.deleteFromPlan} onSave={this.onSaveExercise}/>
            );
        });
    }

    mapExercisesToPlan() {
        const plan = this.props.exercisePlans[this.props.selectedPlanId];
        if (plan === null || plan === undefined) {
            return;
        }
        return plan.exercises.map((planExercise) => {
            const exercise = this.props.exercises.find((propsExercise) => {
                return propsExercise.id === planExercise.exerciseId;
            });

            return {
                exercise,
                sets: planExercise.sets,
                reps: planExercise.reps
            }
        });
    }


    addToPlan(exerciseId) {
        this.props.exerciseAddedToPlan(this.props.selectedPlanId, exerciseId);
    }

    deleteFromPlan(exerciseIndex) {
        this.props.exercisePlanExerciseDeleted(this.props.selectedPlanId, exerciseIndex);
    }

    onSaveExercise(exerciseIndex, updatedSets, updatedReps) {
        this.props.exercisePlanSetsRepsUpdated(this.props.selectedPlanId, {exerciseIndex, updatedSets, updatedReps});
    }

    displayPlan() {
        const plan = this.props.exercisePlans[this.props.selectedPlanId];
        if (plan === null || plan === undefined) {
            return (
                <div>
                    Select a plan!
                </div>
            )
        }

        return (
            <div>
                <h2>{plan.name}</h2>
                <h3>Exercises: </h3>
                <ListGroup variant="flush" className="exercise-display__container">
                    {this.displayExercises()}
                </ListGroup>
            </div>
        )
    }
    
    render() {
        return (
            <div>
                <ExerciseSearch currentPlanId={this.props.selectedPlanId} addToPlan={this.addToPlan}/>
                {this.displayPlan()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        exercisePlans: state.exercise.exercisePlans,
        exercises: state.exercise.exercises
     }
}

export default connect(mapStateToProps, { exercisePlanSetsRepsUpdated, exercisePlanExerciseDeleted, exerciseAddedToPlan })(ExercisePlanDisplay);