import React from 'react';
import { Button, Container, Row, Col, ListGroup, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
        this.displayReps = this.displayReps.bind(this);
        this.displaySets = this.displaySets.bind(this);
        this.displayDelete = this.displayDelete.bind(this);

        this.state = {
            sets: props.exercise.sets,
            reps: props.exercise.reps
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sets !== this.state.sets || prevState.reps !== this.state.reps) {
            this.props.onSave(this.props.index, this.state.sets, this.state.reps);
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

    displaySets() {
        const editableItem =
            <div className="position-absolute w-100 editableItem__center">
                <InputGroup>
                    <InputGroup.Prepend>
                        <Button variant="primary" onClick={this.decrementSets} className="exercise-list-item__square-button">-</Button>
                    </InputGroup.Prepend>
                    <input value={this.state.sets} onChange={this.onSetsInputChange} className="exercise-list-item__input"/>
                    <InputGroup.Append>
                        <Button variant="primary" onClick={this.incrementSets} className="exercise-list-item__square-button">+</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>;

        const notEditableItem = <div className="position-absolute w-100 notEditableItem__center">{this.state.sets}</div>;

        return this.state.editable ? editableItem : notEditableItem;
    }

    displayReps() {
        const editableItem =
            <div className="position-absolute w-100 editableItem__center">
                <InputGroup>
                    <InputGroup.Prepend>
                        <Button onClick={this.decrementReps} className="exercise-list-item__square-button">-</Button>
                    </InputGroup.Prepend>
                    <input value={this.state.reps} onChange={this.onRepsInputChange} className="exercise-list-item__input"/>
                    <InputGroup.Append>
                        <Button onClick={this.incrementReps} className="exercise-list-item__square-button">+</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>;

        const notEditableItem = <div className="position-absolute w-100 notEditableItem__center">{this.state.reps}</div>;

        return this.state.editable ? editableItem : notEditableItem;
    }

    displayDelete() {
        if (this.props.editable) {
            return (
                <FontAwesomeIcon icon={faTrash} className="mx-2 text-danger cursor-pointer" onClick={this.handleDelete} />
            );
        }
    }

    render() {
        return (
            <ListGroup.Item>
                <Container className="py-5">
                    <Row>
                        <Col xs>
                            <h4 className="text-left">{this.props.exercise.exercise.name}</h4>
                        </Col>
                        <Col xs="1">
                            {this.displayDelete()}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg className="my-2">
                            <div className="d-flex justify-content-around">
                                <span>
                                    Sets: 
                                </span>
                                <span>
                                    {this.displaySets()}
                                </span>
                            </div>
                        </Col>
                        <Col lg className="my-2">
                            <div className="d-flex justify-content-around">
                                <span>
                                    Reps:
                                </span>
                                <span>
                                    {this.displayReps()}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        );
    }
}

export default ExerciseListItem;