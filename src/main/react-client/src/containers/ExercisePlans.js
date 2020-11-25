import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import '../styles/components/exercisePlans.scss';
import { exercisePlanAdded, exercisePlanDeleted, deleteUserExercisePlan } from '../reducers/ExerciseSlice';
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
        this.addExerciseToPlan = this.addExerciseToPlan.bind(this);
        this.handleNewPlanClick = this.handleNewPlanClick.bind(this);

        this.state = {
            selectedPlanId: null,
        }
    }

    generateExercisePlansList() {
        if (this.props.exercisePlans.length === 0) {
            return;
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
                selectedPlanId: null
            }
        })
    }

    addExerciseToPlan(exerciseId) {
        this.props.exerciseAddedToPlan(this.props.selectedPlanId, exerciseId);
    }

    resetCurrentPlanState() {
        this.setState({
            selectedPlanId: null,
        })
    }

    deleteExercisePlan() {
        const toDeletePlanId = this.state.selectedPlanId;
        this.resetCurrentPlanState();
        this.props.deleteUserExercisePlan(toDeletePlanId);
    }

    handleNewPlanClick() {
        this.setNewPlan();
        this.props.history.push("/exercise/plan/new");
    }

    render() {
        return (
            <Container className="my-3" fluid>
                <Row>
                    <Col lg="3">
                        <ListGroup variant="flush" className="shadow p-3 my-3">
                            <h4 className="py-2 pb-3 border-bottom">
                                <Link to="/exercise" className="exercise-plans-header">
                                    All Exercise Plans
                                </Link>
                            </h4>
                            <div className="py-2">
                                {this.generateExercisePlansList()}
                                <ListGroup.Item className="mt-3 bg-success cursor-pointer text-white" onClick={this.handleNewPlanClick}>
                                    + New Plan
                                </ListGroup.Item>
                            </div>
                        </ListGroup>
                    </Col>
                    <Col lg="9">
                        <AnimatedExercisePlansTransitions savePlan={this.savePlan} deleteExercisePlan={this.deleteExercisePlan} selectedPlanId={this.state.selectedPlanId} location={this.props.location} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

function AnimatedExercisePlansTransitions(planProps) {
    const location = planProps.location;
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: "translateY(120px)"},
        enter: { opacity: 1, transform: "translateY(0)"},
        leave: { opacity: 0, transform: "translateY(60px)"},
        config: {
            mass: 2,
            friction: 40,
            tension: 180,
            precision: 0.001,
            clamp: true
        }
    });
    return transitions.map(({item: location, props, key}) => (
        <animated.div key={key} style={props}>
            <Switch location={location}>
                <Route path="/exercise/plan/new">
                    <CreateExercisePlanForm />
                </Route>
                <Route path={['/', '/exercise', '/exercises']}>
                    <ExercisePlanDisplay savePlan={planProps.savePlan} deleteExercisePlan={planProps.deleteExercisePlan} selectedPlanId={planProps.selectedPlanId} />
                </Route>
            </Switch>
        </animated.div>
    ));
}

function mapStateToProps(state) {
    return { 
        exercisePlans: state.exercise.exercisePlans,
        exercises: state.exercise.exercises
     }
}

export default withRouter(connect(mapStateToProps, { deleteUserExercisePlan, exercisePlanAdded, exercisePlanDeleted })(ExercisePlans));