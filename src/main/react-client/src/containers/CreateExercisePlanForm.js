import React from 'react';
import { connect } from 'react-redux';
import { exercisePlanAdded } from '../reducers/ExerciseSlice';
import { Button, ButtonGroup, Form, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ExerciseListItem from '../components/ExerciseListItem';
import ExerciseSearch from '../components/ExerciseSearch';

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
                <ExerciseListItem key={"createFormSelectedExercise" + i} index={i} exercise={exercise} onDelete={this.deleteFromPlan} onSave={this.onSaveExercise}/>
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
                    exerciseId: exercise.exercise.id,
                    sets: exercise.sets,
                    reps: exercise.reps
                }
            });
            this.props.exercisePlanAdded(this.state.planName, exercises);
            this.props.history.push('/');
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

    // CurrentPlanId is set to -1 to allow for the "add" button to appear in the ExerciseSearchResultItem
    render() {
        return(
            <div>
                <ExerciseSearch currentPlanId={-1} addToPlan={this.addToPlan}/>
                <Form onSubmit={this.handleSave}>
                    <Form.Row>
                        <Form.Group controlId="createPlanName">
                            <Form.Label>Exercise Plan Name</Form.Label>
                            <Form.Control type="text" value={this.state.planName} onChange={this.handleNameChange} placeholder="Exercise Plan Name"/>
                        </Form.Group>
                    </Form.Row>
                    <ListGroup>
                        {this.displaySelectedExercises()}
                    </ListGroup>
                    {this.displayFormErrors()}
                    <Button variant="primary" type="submit">Save</Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        exercisePlans: state.exercise.exercisePlans,
        exercises: state.exercise.exercises
     }
}

export default withRouter(connect(mapStateToProps, { exercisePlanAdded })(CreateExercisePlanForm));