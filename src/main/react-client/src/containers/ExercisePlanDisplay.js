import React from 'react';
import { connect } from 'react-redux';
import { Button, ListGroup } from 'react-bootstrap';
import { exercisePlanUpdated } from '../reducers/ExerciseSlice';
import ExerciseListItem from '../components/ExerciseListItem';

class ExercisePlanDisplay extends React.Component {
    constructor(props) {
        super();
        this.displayPlan = this.displayPlan.bind(this);
        this.displayExercises = this.displayExercises.bind(this);
        this.onSaveExercise = this.onSaveExercise.bind(this);
        this.mapExercisesToPlan = this.mapExercisesToPlan.bind(this);

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
                <ExerciseListItem key={i} index={i} exercise={exercise} onSave={this.onSaveExercise}/>
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


    onSaveExercise(exerciseIndex, updatedSets, updatedReps) {
        this.props.exercisePlanUpdated(this.props.selectedPlanId, {exerciseIndex, updatedSets, updatedReps});
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

export default connect(mapStateToProps, { exercisePlanUpdated })(ExercisePlanDisplay);