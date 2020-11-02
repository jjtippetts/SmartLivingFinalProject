import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            <ListGroup.Item action active={this.props.active} onClick={this.handleClick} className="list-group-item__pointer">
                <Link to="/" className="link-plain">
                    <h5 className="text-primary">
                        {this.props.plan.name}
                    </h5>
                </Link>
            </ListGroup.Item>
        );
    }
}

export default ExercisePlanListItem;