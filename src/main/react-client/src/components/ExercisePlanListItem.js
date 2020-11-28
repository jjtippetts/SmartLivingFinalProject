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
        this.props.history.push("/exercise");
    }

    render() {
        return (
            <ListGroup.Item variant="dark" action active={this.props.active} onClick={this.handleClick} className="my-2 list-group-item__pointer">
                <h5>
                    {this.props.plan.name}
                </h5>
            </ListGroup.Item>
        );
    }
}

export default withRouter(ExercisePlanListItem);