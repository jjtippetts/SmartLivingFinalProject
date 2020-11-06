import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import '../styles/components/exercisePlans.scss';
import { exercisePlanAdded, exercisePlanDeleted } from '../reducers/ExerciseSlice';
import ExercisePlanDisplay from './ExercisePlanDisplay';
import ExercisePlanListItem from '../components/ExercisePlanListItem';
import CreateExercisePlanForm from './CreateExercisePlanForm';


class ExercisePlans extends React.Component {
    constructor() {
        super();
        this.generateExercisePlansList = this.generateExercisePlansList.bind(this);
        this.onCreatePlanClick = this.onCreatePlanClick.bind(this);
        this.onPlanSelect = this.onPlanSelect.bind(this);
        this.setNewPlan = this.setNewPlan.bind(this);
        this.resetCurrentPlanState = this.resetCurrentPlanState.bind(this);
        this.deleteExercisePlan = this.deleteExercisePlan.bind(this);

        this.state = {
            selectedPlanId: null,
            currentPlan: null
        }
    }

    generateExercisePlansList() {
        if (this.props.exercisePlans.length === 0) {
            return (
                <div>
                    Create a plan!
                </div>
            );
        }

        return this.props.exercisePlans.map((plan) => {
            return (
                <ExercisePlanListItem key={plan.id} handleClick={this.onPlanSelect} plan={plan} active={this.state.selectedPlanId === plan.id}/>
            );
        });
    }

    onPlanSelect(selectedPlanId) {
        this.setState({
            selectedPlanId, 
        });
    }

    onCreatePlanClick() {
        this.props.exercisePlanAdded("Test", [{exerciseId: 0, sets: 1, reps: 1}]);
    }

    setNewPlan() {
        this.setState((previousState) => {
            return {
                selectedPlanId: previousState.selectedPlanId + 1
            }
        })
    }

    resetCurrentPlanState() {
        this.setState({
            selectedPlanId: null,
            currentPlan: null
        })
    }

    deleteExercisePlan() {
        const toDeletePlanId = this.state.selectedPlanId;
        this.resetCurrentPlanState();
        this.props.exercisePlanDeleted(toDeletePlanId);
    }

    // TODO: align left "EXERCISE PLANS" header
    render() {
        return (
            <Switch>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1><Link to="/" className="link-plain" onClick={this.resetCurrentPlanState}>Exercise Plans</Link></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3">
                            <ListGroup variant="flush" className="shadow p-3 my-3">
                                {this.generateExercisePlansList()}
                            </ListGroup>
                            <Link to="/plan/new" onClick={this.setNewPlan}>Create a new plan</Link>
                        </Col>
                        <Col xs="9">
                            <Switch>
                                <Route path="/plan/new">
                                    <CreateExercisePlanForm />
                                </Route>
                                <Route path={['/', '/exercises']}>
                                    <ExercisePlanDisplay savePlan={this.savePlan} deleteExercisePlan={this.deleteExercisePlan} selectedPlanId={this.state.selectedPlanId} />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    return { 
        exercisePlans: state.exercise.exercisePlans,
        exercises: state.exercise.exercises
     }
}

export default connect(mapStateToProps, { exercisePlanAdded, exercisePlanDeleted })(ExercisePlans);