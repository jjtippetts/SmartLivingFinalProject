import React from 'react';
import { ListGroup } from 'react-bootstrap';

class ExercisePlanListItem extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.plan.id);
    }

    render() {
        return (
            <ListGroup.Item active={this.props.active} onClick={this.handleClick} className="list-group-item__pointer">
                <h5 className="text-primary">
                    {this.props.plan.name}
                </h5>
            </ListGroup.Item>
        );
    }
}

export default ExercisePlanListItem;