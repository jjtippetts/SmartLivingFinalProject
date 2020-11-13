import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class ExercisePlanListItem extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.plan.id);
        this.props.history.push("/");
    }

    render() {
        return (
            <ListGroup.Item action active={this.props.active} onClick={this.handleClick} className="list-group-item__pointer">
                <h5 className="text-primary">
                    {this.props.plan.name}
                </h5>
            </ListGroup.Item>
        );
    }
}

export default withRouter(ExercisePlanListItem);