import React from 'react';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';

class ExerciseListItem extends React.Component {
    constructor(props) {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.incrementSets = this.incrementSets.bind(this);
        this.decrementSets = this.decrementSets.bind(this);
        this.incrementReps = this.incrementReps.bind(this);
        this.decrementReps = this.decrementReps.bind(this);

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

    render() {
        return (
            <ListGroup.Item>
                <h4>{this.props.exercise.exercise.name}</h4>
                <div>
                    Sets: {this.state.sets}
                    <ButtonGroup>
                        <Button onClick={this.incrementSets}>+</Button>
                        <Button onClick={this.decrementSets}>-</Button>
                    </ButtonGroup>
                </div>
                <div>
                    Reps: {this.state.reps}
                    <ButtonGroup>
                        <Button onClick={this.incrementReps}>+</Button>
                        <Button onClick={this.decrementReps}>-</Button>
                    </ButtonGroup>
                </div>
                <Button onClick={this.handleSave}>Save</Button>
                <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
            </ListGroup.Item>
        );
    }
}

export default ExerciseListItem;