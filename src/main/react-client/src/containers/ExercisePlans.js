import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { exercisePlanAdded } from '../reducers/ExerciseSlice';
import ExercisePlanDisplay from '../components/ExercisePlanDisplay';
import ExercisePlanListItem from '../components/ExercisePlanListItem';


class ExercisePlans extends React.Component {
    constructor() {
        super();
        this.generateExercisePlansList = this.generateExercisePlansList.bind(this);
        this.onCreatePlanClick = this.onCreatePlanClick.bind(this);
        this.onPlanSelect = this.onPlanSelect.bind(this);

        this.state = {
            selectedPlanId: null,
            currentPlan: null
        }
    }

    generateExercisePlansList() {
        // TODO: Make a separate exercise list group item component
        return this.props.exercisePlans.map((plan) => {
            return (
                <ExercisePlanListItem key={plan.id} handleClick={this.onPlanSelect} plan={plan} active={this.state.selectedPlanId == plan.id}/>
            );
        });
    }

    onPlanSelect(selectedPlanId) {
        const selectedPlan = this.props.exercisePlans[selectedPlanId];
        this.setState({
            selectedPlanId, 
            currentPlan: selectedPlan 
        });
        // TODO: Should exercise unpacking logic be here or in the display itself?
    }

    onCreatePlanClick() {
        this.props.exercisePlanAdded("Test", [0]);
    }

    render() {
        return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Exercise Plans</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="3">
                    <ListGroup variant="flush" className="shadow p-3 my-3">
                        {this.generateExercisePlansList()}
                    </ListGroup>
                    <button onClick={this.onCreatePlanClick}>Create plan</button>
                </Col>
                <Col xs="9">
                    <ExercisePlanDisplay toDisplay={this.state.currentPlan}/>
                </Col>
            </Row>
        </Container>
        );
    }
}

function mapStateToProps(state) {
    return { exercisePlans: state.exercise.exercisePlans }
}

export default connect(mapStateToProps, { exercisePlanAdded })(ExercisePlans);