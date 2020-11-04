import React from 'react';
import { connect } from 'react-redux';
import { Button, ListGroup } from 'react-bootstrap';
import { exercisePlanUpdated } from '../reducers/ExerciseSlice';
import ExerciseListItem from '../components/ExerciseListItem';

class ExercisePlanDisplay extends React.Component {
    constructor() {
        super();
        this.displayPlan = this.displayPlan.bind(this);
        this.displayExercises = this.displayExercises.bind(this);
        this.onSaveExercise = this.onSaveExercise.bind(this);
        this.onAddExercise = this.onAddExercise.bind(this);

        this.state = {
            exercises: [],
        }

    }

    displayExercises() {
        const exercises = this.props.toDisplay?.exercises;
        if(exercises === null || exercises === undefined || exercises.length === 0) {
            return (
                <div>No exercises to display.</div>
            )
        }
        return exercises.map((exercise, i) => {
            return (
                <ExerciseListItem key={i} index={i} exercise={exercise} onSave={this.onSaveExercise}/>
            );
        });
    }

    onSaveExercise(exerciseIndex, updatedSets, updatedReps) {
        this.props.exercisePlanUpdated(this.props.toDisplay.plan.id, {exerciseIndex, updatedSets, updatedReps});
    }

    onAddExercise() {
        // Bring up search on add exercise click
    }

    displayPlan() {
        const plan = this.props.toDisplay?.plan;
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
                <Button onClick={this.onAddExercise}>Add Exercise</Button>
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