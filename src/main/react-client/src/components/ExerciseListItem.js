import React from 'react';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';

class ExerciseListItem extends React.Component {
    constructor(props) {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.incrementSets = this.incrementSets.bind(this);
        this.decrementSets = this.decrementSets.bind(this);
        this.incrementReps = this.incrementReps.bind(this);
        this.decrementReps = this.decrementReps.bind(this);
        this.onSetsInputChange = this.onSetsInputChange.bind(this);
        this.onRepsInputChange = this.onRepsInputChange.bind(this);

        this.state = {
            sets: props.exercise.sets,
            reps: props.exercise.reps
        }
    }

    handleSave() {
        this.props.onSave(this.props.index, this.state.sets, this.state.reps);
    }

    handleDelete() {
        this.props.onDelete(this.props.index);
    }

    incrementSets() {
        this.setState((prevState) => {
            return {
                sets: prevState.sets + 1
            }
        });
    }

    decrementSets() {
        this.setState((prevState) => {
            return {
                sets: prevState.sets > 1 ? prevState.sets - 1 : prevState.sets
            }
        });
    }

    onSetsInputChange(e) {
        let sets = parseInt(e.target.value);
        this.setState((previousState) => {
            if (isNaN(sets)) {
                sets = previousState.sets;
            }
            return {
                sets
            }
        });
    }

    incrementReps() {
        this.setState((prevState) => {
            return {
                reps: prevState.reps + 1
            }
        });
    }

    decrementReps() {
        this.setState((prevState) => {
            return {
                reps: prevState.reps > 1 ? prevState.reps - 1 : prevState.reps
            }
        });
    }

    onRepsInputChange(e) {
        let reps = parseInt(e.target.value);
        this.setState((previousState) => {
            if (isNaN(reps)) {
                reps = previousState.reps;
            }
            return {
                reps
            }
        });
    }

    // Only show buttons when this.props.canEdit
    render() {
        return (
            <ListGroup.Item>
                <Container>
                    <Row>
                        <Col xs="11">
                            <h4 className="text-left">{this.props.exercise.exercise.name}</h4>
                        </Col>
                        <Col xs="1">
                            <div className="text-danger cursor-pointer" onClick={this.handleDelete}>X</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="d-flex justify-content-around">
                                <span>
                                    Sets: 
                                </span>
                                <span>
                                    <Button variant="primary" onClick={this.decrementSets} className="mx-1 exercise-list-item__square-button">-</Button>
                                    <input value={this.state.sets} onChange={this.onSetsInputChange} className="exercise-list-item__input"/>
                                    <Button variant="primary" onClick={this.incrementSets} className="mx-1 exercise-list-item__square-button">+</Button>
                                </span>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-around">
                                <span>
                                    Reps:
                                </span>
                                <span>
                                    <Button onClick={this.decrementReps} className="mx-1 exercise-list-item__square-button">-</Button>
                                    <input value={this.state.reps} onChange={this.onRepsInputChange} className="exercise-list-item__input"/>
                                    <Button onClick={this.incrementReps} className="mx-1 exercise-list-item__square-button">+</Button>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Button onClick={this.handleSave} className="mt-2">Save</Button>
            </ListGroup.Item>
        );
    }
}

export default ExerciseListItem;