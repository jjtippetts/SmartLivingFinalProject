import React from 'react';
import { Button, Form, FormControl, ListGroup } from 'react-bootstrap';
import ExerciseSearchResultItem from './ExerciseSearchResultItem';

class ExerciseSearch extends React.Component {
    constructor() {
        super();
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.displaySearchResults = this.displaySearchResults.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);

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

export default ExerciseSearch;