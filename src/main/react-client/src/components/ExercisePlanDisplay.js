import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

// TODO: Add "add exercise" button
// TODO: Connect w/store since the display will now allow users to edit exercise plan
class ExercisePlanDisplay extends React.Component {
    constructor() {
        super();
        this.displayPlan = this.displayPlan.bind(this);
        this.displayExercises = this.displayExercises.bind(this);
    }

    displayExercises() {
        const exercises = this.props.toDisplay?.exercises;
        // TODO: this.props.toDisplay will be changed to selectedPlanId, then fetch & load from store
        if(exercises === null || exercises === undefined || exercises.length === 0) {
            return (
                <div>No exercises to display.</div>
            )
        }
        return exercises.map((exercise, i) => {
            return (
                <ListGroup.Item key={i}>
                    <h4>{exercise.exercise.name}</h4>
                    <div>
                        Sets: {exercise.sets}
                    </div>
                    <div>
                        Reps: {exercise.reps}
                    </div>
                </ListGroup.Item>
            );
        });
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

export default ExercisePlanDisplay;