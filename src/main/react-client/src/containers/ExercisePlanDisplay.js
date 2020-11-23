import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { exercisePlanSetsRepsUpdated, exerciseAddedToPlan, saveUserExercisePlan, exercisePlanExerciseDeleted } from '../reducers/ExerciseSlice';
import ExerciseListItem from '../components/ExerciseListItem';
import ExerciseSearch from './ExerciseSearch';
import AnimatedList from '../components/AnimatedList';

class ExercisePlanDisplay extends React.Component {
    constructor() {
        super();
        this.displayPlan = this.displayPlan.bind(this);
        this.displayExercises = this.displayExercises.bind(this);
        this.onSaveExercise = this.onSaveExercise.bind(this);
        this.mapExercisesToPlan = this.mapExercisesToPlan.bind(this);
        this.addToPlan = this.addToPlan.bind(this);
        this.deleteFromPlan = this.deleteFromPlan.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
        this.editPlan = this.editPlan.bind(this);
        this.doneEditPlan = this.doneEditPlan.bind(this);
        this.displayEditButton = this.displayEditButton.bind(this);
        this.displaySearch = this.displaySearch.bind(this);

        this.state = {
            exercises: [],
            editable: false
        }
    }

    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
    }

    displayExercises() {
        const exercises = this.props.exercisePlans.find(plan => plan.id === this.props.selectedPlanId)?.exercises;
        if(exercises === null || exercises === undefined || exercises.length === 0) {
            return (
                <div>No exercises to display.</div>
            )
        }
        const exerciseItems = exercises.map((exercise, i) => {
            return (
                <ExerciseListItem editable={this.state.editable} key={this.props.selectedPlanId + "exercisePlanDisplay" + i} index={i} exercise={exercise} onDelete={this.deleteFromPlan} onSave={this.onSaveExercise}/>
            );
        });

        const animationConfig = {
            from: { opacity: 0, transform: "translate(100%, 0)"},
            enter: { opacity: 1, transform: "translate(0, 0)"},
            leave: { opacity: 0, transform: "translate(-50%, 0)"},
        }
        return (
            <AnimatedList items={exerciseItems} config={animationConfig}/>
        )
    }

    displaySearch() {
        return(
            <div>
                <h3 className="text-left"> {this.state.editable ? 'Add an exercise' : 'Search Exercises'}</h3>
                <ExerciseSearch editable={this.state.editable} currentPlanId={this.props.selectedPlanId} addToPlan={this.addToPlan}/>
            </div>
        );
    }

    mapExercisesToPlan() {
        const plan = this.props.exercisePlans.find(plan => plan.id === this.props.selectedPlanId);
        if (plan === null || plan === undefined) {
            return;
        }
        return plan.exercises.map((planExercise) => {
            const exercise = this.props.exercises.find((propsExercise) => {
                return propsExercise.id === planExercise.exerciseId;
            });

            return {
                exercise,
                sets: planExercise.sets,
                reps: planExercise.reps
            }
        });
    }


    addToPlan(exerciseId) {
        this.props.exerciseAddedToPlan(this.props.selectedPlanId, exerciseId);
    }

    deleteFromPlan(exerciseIndex) {
        this.props.exercisePlanExerciseDeleted(this.props.selectedPlanId, exerciseIndex);
    }

    onSaveExercise(exerciseIndex, updatedSets, updatedReps) {
        this.props.exercisePlanSetsRepsUpdated(this.props.selectedPlanId, {exerciseIndex, updatedSets, updatedReps});
    }

    deletePlan() {
        this.props.deleteExercisePlan(this.props.selectedPlanId);
    }

    editPlan() {
        this.setState({
            editable: true
        });
    }

    doneEditPlan() {
        let toSave = this.props.exercisePlans.find(plan => plan.id === this.props.selectedPlanId)
        if (this.state.exercises.length > 0) {
            for (let i = 0; i < this.state.exercises.length; i++) {
                toSave.exercises.push(this.state.exercises[i]);
            }
        }
        this.props.saveUserExercisePlan(toSave);
        this.setState({
            editable: false
        });
    }

    displayEditButton() {
        if (this.state.editable) {
            return (
                <Button variant="success" className="mx-1" onClick={this.doneEditPlan}>Done</Button>
            )
        }

        return (
            <Button variant="primary" className="mx-1" onClick={this.editPlan}>Edit</Button>
        );
    }

    displayPlan() {
        const plan = this.props.exercisePlans.find(plan => plan.id === this.props.selectedPlanId)
        if (plan === null || plan === undefined) {
            return;
        }

        return (
            <Container fluid>
                <Row className="mb-3 text-left">
                    <Col>
                        <h2>{plan.name}</h2>
                    </Col>
                    <Col lg="2">
                        <div className="d-flex justify-content-center">
                            {this.displayEditButton()}
                            <Button variant="danger" className="mx-1" onClick={this.deletePlan}>Delete</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup className="exercise-display__container">
                            {this.displayExercises()}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
    
    render() {
        return (
            <Container className="position-absolute w-100" fluid>
                <Row>
                    <Col lg="8">
                        {this.displayPlan()}
                    </Col>
                    <Col>
                        {this.displaySearch()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return { 
        exercisePlans: state.exercise.exercisePlans,
        exercises: state.exercise.exercises
     }
}

export default connect(mapStateToProps, { saveUserExercisePlan, exercisePlanSetsRepsUpdated, exercisePlanExerciseDeleted, exerciseAddedToPlan })(ExercisePlanDisplay);