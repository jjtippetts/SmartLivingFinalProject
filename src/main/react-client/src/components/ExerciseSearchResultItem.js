import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

class ExerciseSearchResultItem extends React.Component {
    constructor() {
        super();

        this.displayAddToPlan = this.displayAddToPlan.bind(this);
        this.addToPlan = this.addToPlan.bind(this);
    }

    displayAddToPlan() {
        if (this.props.currentPlanId === null || this.props.currentPlanId === undefined) {
            return;
        }
        return (
        <Button onClick={this.addToPlan}>Add</Button>
        );
    }

    addToPlan() {
        this.props.addToPlan(this.props.exercise.id);
    }

    render() {
        return (
            <ListGroup.Item>
                {this.props.exercise.name}

                {this.displayAddToPlan()}
            </ListGroup.Item>
        );
    }
}

export default ExerciseSearchResultItem;