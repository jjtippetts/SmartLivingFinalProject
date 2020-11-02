import React from 'react';
import { Button, ButtonGroup, Form, ListGroup } from 'react-bootstrap';

class CreateExercisePlanForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.displaySelectedExercises.bind(this);
        this.populateForm.bind(this);
        this.state = {
            selectedExercises: [],
            planName: ""
        }
        
        if(props.plan) {
            this.populateForm(props.plan);
        }
    }

    populateForm(plan) {

    }

    displaySelectedExercises() {
        return this.state.selectedExercises.map((exercise) => {
            return (
                <ListGroup.Item>
                    <h3>
                        { exercise.exercise.name }
                    </h3>
                    <div>
                        { exercise.sets }
                    </div>
                    <ButtonGroup>
                        <Button variant="primary"> + </Button>
                        <Button variant="danger"> - </Button>
                    </ButtonGroup>
                    <div>
                        { exercise.reps }
                    </div>
                </ListGroup.Item>
            )
        });
    }

    render() {
        return(
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group controlId="createPlanName">
                            <Form.Label>Exercise Plan Name</Form.Label>
                            <Form.Control type="text" placeholder="Exercise Plan Name"/>
                        </Form.Group>
                    </Form.Row>
                    <ListGroup>
                        {this.displaySelectedExercises()}
                    </ListGroup>
                </Form>
            </div>
        )
    }
}

export default CreateExercisePlanForm;