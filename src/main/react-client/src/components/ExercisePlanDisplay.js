import React from 'react';
import { ListGroup } from 'react-bootstrap';

class ExercisePlanDisplay extends React.Component {
    constructor() {
        super();
        this.displayPlan = this.displayPlan.bind(this);
        this.displayExercises = this.displayExercises.bind(this);
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