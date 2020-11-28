import React from 'react';
import { connect } from 'react-redux';
import { saveUserExercisePlan } from '../reducers/ExerciseSlice';
import { Button, Container, Col, Row, Form, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import ExerciseListItem from '../components/ExerciseListItem';
import ExerciseSearch from './ExerciseSearch';

class CreateExercisePlanForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.displaySelectedExercises = this.displaySelectedExercises.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.addToPlan = this.addToPlan.bind(this);
        this.onSaveExercise = this.onSaveExercise.bind(this);
        this.planIsValid = this.planIsValid.bind(this);
        this.displayFormErrors = this.displayFormErrors.bind(this);
        this.deleteFromPlan = this.deleteFromPlan.bind(this);

        this.state = {
            selectedExercises: [], // { exercise: { id, name, . . . }, sets: number, reps: number }
            planName: "",
            planErrors: []
        }
    }

    displaySelectedExercises() {
        if (this.state.selectedExercises.length === 0) {
            return (
                <div>
                    Add an exercise!
                </div>
            );
        }
        return this.state.selectedExercises.map((exercise, i) => {
            return (
                <ExerciseListItem key={"createFormSelectedExercise" + i} index={i} exercise={exercise} onDelete={this.deleteFromPlan} onSave={this.onSaveExercise} editable={true}/>
            )
        });
    }

    onSaveExercise(exerciseIndex, sets, reps) {
        this.setState((previousState) => {
            return {
                selectedExercises: previousState.selectedExercises.map((exercise, i) => {
                if (i !== exerciseIndex) {
                    return exercise;
                }

                return {
                    ...exercise,
                    sets,
                    reps
                }
            })
        }
        })
    }

    deleteFromPlan(exerciseIndex) {
        this.setState((previousState) => {
            return {
                selectedExercises: previousState.selectedExercises.filter((item, index) => index !== exerciseIndex)
            }
        });
    }

    addToPlan(exerciseId) {
        this.setState((previousState) => {
            let updatedExercises = previousState.selectedExercises.slice();
            const exerciseData = this.props.exercises.filter((exercise) => exercise.id === exerciseId)[0];
            updatedExercises.push({
                exercise: exerciseData,
                sets: 1,
                reps: 1
            })
            return {
                selectedExercises: updatedExercises
            }
        });
    }

    handleSave(e) {
        e.preventDefault();
        if(this.planIsValid()) {
            const exercises = this.state.selectedExercises.map((exercise) => {
                return {
                    exercise: exercise.exercise,
                    sets: exercise.sets,
                    reps: exercise.reps
                }
            });
            this.props.dispatch(saveUserExercisePlan({name: this.state.planName, exercises: exercises}));
            this.props.history.push('/exercise');
        }
    }

    planIsValid() {
        let hasErrors = false;
        if (this.state.planName === "" || this.state.planName === undefined || this.state.planName === null) {
            this.setState((previousState) => {
                return {
                    planErrors: previousState.planErrors.concat("The plan needs a name.")
                }
            });
            hasErrors = true;
        }

        if(this.state.selectedExercises.length === 0) {
            this.setState((previousState) => {
                return {
                    planErrors: previousState.planErrors.concat("The plan needs least 1 exercise.")
                }

            });
            hasErrors = true;
        }

        return !hasErrors;
    }

    displayFormErrors() {
        if (this.state.planErrors.length === 0) {
            return;
        }

        return this.state.planErrors.map((error, i) => {
                return(
                    <div key={"createFormErrors" + i} className="text-danger">
                        {error}
                    </div>
                )
            }
        );
    }

    handleNameChange(e) {
        this.setState({
            planName: e.target.value
        })
    }

    render() {
        return(
            <Container className="position-absolute w-100" fluid>
                <Row>
                    <Col lg="8">
                        <h2 className="mt-2 mb-3 text-left">New Exercise Plan</h2>
                        <Form onSubmit={this.handleSave}>
                            <Form.Row>
                                <Col sm='5'>
                                    <Form.Control type="text" value={this.state.planName} onChange={this.handleNameChange} placeholder="Exercise Plan Name"/>
                                </Col>
                                <Col/>
                                <Col sm='1'>
                                    <Button variant="primary" type="submit">
                                        <FontAwesomeIcon icon={faSave}/>
                                    </Button>
                                </Col>
                            </Form.Row>
                            <ListGroup className="mt-2 mb-2">
                                {this.displaySelectedExercises()}
                            </ListGroup>
                            {this.displayFormErrors()}
                        </Form>
                    </Col>
                    <Col>
                        <h3 className="text-left">Add an exercise</h3>
                        <ExerciseSearch editable={true} currentPlanId={-1} addToPlan={this.addToPlan} />
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

export default withRouter(connect(mapStateToProps)(CreateExercisePlanForm));