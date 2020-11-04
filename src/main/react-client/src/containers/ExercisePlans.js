import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import '../styles/components/exercisePlans.scss';
import { exercisePlanAdded } from '../reducers/ExerciseSlice';
import ExercisePlanDisplay from './ExercisePlanDisplay';
import ExercisePlanListItem from '../components/ExercisePlanListItem';
import CreateExercisePlanForm from '../components/CreateExercisePlanForm';


class ExercisePlans extends React.Component {
    constructor() {
        super();
        this.generateExercisePlansList = this.generateExercisePlansList.bind(this);
        this.onCreatePlanClick = this.onCreatePlanClick.bind(this);
        this.onPlanSelect = this.onPlanSelect.bind(this);
        this.mapExercisesToPlan = this.mapExercisesToPlan.bind(this);
        this.savePlan = this.savePlan.bind(this);

        this.state = {
            selectedPlanId: null,
            currentPlan: null
        }
    }

    generateExercisePlansList() {
        return this.props.exercisePlans.map((plan) => {
            return (
                <ExercisePlanListItem key={plan.id} handleClick={this.onPlanSelect} plan={plan} active={this.state.selectedPlanId === plan.id}/>
            );
        });
    }

    onPlanSelect(selectedPlanId) {
        const selectedPlan = this.props.exercisePlans[selectedPlanId];
        this.setState({
            selectedPlanId, 
            currentPlan: this.mapExercisesToPlan(selectedPlan) 
        });
    }

    mapExercisesToPlan(plan) {
        let exercises = plan.exercises.map((planExercise) => {
            const exercise = this.props.exercises.find((propsExercise) => {
                return propsExercise.id === planExercise.exerciseId;
            });

            return {
                exercise,
                sets: planExercise.sets,
                reps: planExercise.reps
            }
        });
        return {
            plan,
            exercises
        }
    }

    onCreatePlanClick() {
        this.props.exercisePlanAdded("Test", [{exerciseId: 0, sets: 1, reps: 1}]);
    }

    savePlan(planId, exercises) {

    }

    // TODO: Have both edit and display plan be the same
    // TODO: Allow users to edit on the fly when displaying exercises
    render() {
        return (
            <Switch>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1><Link to="/" className="link-plain">Exercise Plans</Link></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3">
                            <ListGroup variant="flush" className="shadow p-3 my-3">
                                {this.generateExercisePlansList()}
                            </ListGroup>
                            <Link to="/plan/new">Create a new plan</Link>
                        </Col>
                        <Col xs="1"/>
                        <Col xs="8">
                            <Switch>
                                <Route path="/plan/new">
                                    <CreateExercisePlanForm />
                                </Route>
                                <Route path={['/', '/exercises']}>
                                    <ExercisePlanDisplay savePlan={this.savePlan} selectedPlanId={this.state.selectedPlanId} toDisplay={this.state.currentPlan} />
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

export default connect(mapStateToProps, { exercisePlanAdded })(ExercisePlans);