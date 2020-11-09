import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormControl, FormGroup, ListGroup, InputGroup } from 'react-bootstrap';
import ExerciseSearchResultItem from '../components/ExerciseSearchResultItem';

class ExerciseSearch extends React.Component {
    constructor() {
        super();
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.displaySearchResults = this.displaySearchResults.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.searchLocal = this.searchLocal.bind(this);

        this.state = {
            searchInput: "",
            searchResults: []
        }
    }

    // TODO: Make button a part of the search input
    displaySearchResults() {
        if (this.state.searchResults.length === 0) {
            return;
        }
        return this.state.searchResults.map((exercise, i) => {
            return (
                <ExerciseSearchResultItem key={i} addToPlan={this.props.addToPlan} exercise={exercise} currentPlanId={this.props.currentPlanId} />
            );
        });
    }

    onSearchInputChange(e) {
        this.setState({
            searchInput: e.target.value
        });
    }

    onSearchSubmit(e) {
        e.preventDefault();
        let searchResults = this.searchLocal();
        if (searchResults.length === 0) {
            // Do global search on server here.
            // OR have user choose to do global search
        }
        this.setState({
            searchResults
        });
    }

    searchLocal() {
        const searchInput = this.state.searchInput;
        // TODO: possibly enhance search with fusejs?
        if (searchInput.length === 0) {
            return [];
        }
        return this.props.exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchInput.toLowerCase()));
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSearchSubmit}>
                    <InputGroup>
                        <FormControl value={this.state.searchInput} onChange={this.onSearchInputChange} placeholder="Search exercises"/>
                        <InputGroup.Append>
                            <Button variant="primary" type="submit">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <ListGroup className="">
                    {this.displaySearchResults()}
                </ListGroup>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        exercisePlans: state.exercise.exercisePlans,
        exercises: state.exercise.exercises
     }
}

export default connect(mapStateToProps)(ExerciseSearch);