import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormControl, ListGroup } from 'react-bootstrap';
import { exerciseAddedToPlan } from '../reducers/ExerciseSlice';
import ExerciseSearchResultItem from '../components/ExerciseSearchResultItem';

class ExerciseSearch extends React.Component {
    constructor() {
        super();
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.displaySearchResults = this.displaySearchResults.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.addToPlan = this.addToPlan.bind(this);

        this.state = {
            searchInput: "",
            searchResults: [{name: "back squat", id: 1}]
        }
    }

    displaySearchResults() {
        if (this.state.searchResults.length === 0) {
            return;
        }
        return this.state.searchResults.map((exercise, i) => {
            return (
                <ExerciseSearchResultItem key={i} addToPlan={this.addToPlan} exercise={exercise} currentPlanId={this.props.currentPlanId} />
            );
        });
    }


    addToPlan(exerciseId) {
        this.props.exerciseAddedToPlan(this.props.currentPlanId, exerciseId);
    }

    onSearchInputChange(e) {
        this.setState({
            searchInput: e.target.value
        });
    }

    onSearchSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSearchSubmit}>
                    <FormControl value={this.state.searchInput} onChange={this.onSearchInputChange} placeholder="Search exercises"/>
                    <Button variant="primary" type="submit">Search</Button>
                </Form>
                <ListGroup>
                    {this.displaySearchResults()}
                </ListGroup>
            </div>
        );
    }
}

export default connect(null, {exerciseAddedToPlan})(ExerciseSearch);