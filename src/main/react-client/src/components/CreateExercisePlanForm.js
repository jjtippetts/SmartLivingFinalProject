import React from 'react';
import { connect } from 'react-redux';
import { exercisePlanAdded } from '../reducers/ExerciseSlice';
import { Button, ButtonGroup, Form, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ExerciseListItem from './ExerciseListItem';

class CreateExercisePlanForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.displaySelectedExercises = this.displaySelectedExercises.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

        this.state = {
            selectedExercises: [], // { exercise: { id, name, . . . }, sets: number, reps: number }
            planName: ""
        }
    }

    displaySelectedExercises() {
        if (this.state.selectedExercises.length === 0) {
            return (
                <div>
                    Add an exercise!
                </div>
            );
        }
        return this.state.selectedExercises.map((exercise, i) => {
            return (
                <ExerciseListItem key={i} index={i} exercise={exercise} onSave={this.onSaveExercise}/>
            )
        });
    }

    handleSave(e) {
        e.preventDefault();
        this.props.history.push('/');

        this.props.exercisePlanAdded(this.state.planName, this.state.selectedExercises);
    }

    handleNameChange(e) {
        this.state.setState({
            planName: e.target.value
        })
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.handleSave}>
                    <Form.Row>
                        <Form.Group controlId="createPlanName">
                            <Form.Label>Exercise Plan Name</Form.Label>
                            <Form.Control type="text" value={this.state.planName} onChange={this.handleNameChange} placeholder="Exercise Plan Name"/>
                        </Form.Group>
                    </Form.Row>
                    <ListGroup>
                        {this.displaySelectedExercises()}
                    </ListGroup>
                    <Button variant="primary" type="submit">Save</Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(connect(null, { exercisePlanAdded })(CreateExercisePlanForm));