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

    // TODO: Align left, bold names. Add muscles used
    render() {
        return (
            <ListGroup.Item className="d-flex justify-content-between">
                <span className="font-weight-bold text-left">{this.props.exercise.name}</span>

                <div>
                    {this.displayAddToPlan()}
                </div>
            </ListGroup.Item>
        );
    }
}

export default ExerciseSearchResultItem;