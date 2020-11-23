import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormControl, ListGroup, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Fuse from 'fuse.js';
import ExerciseSearchResultItem from '../components/ExerciseSearchResultItem';
import AnimatedList from '../components/AnimatedList';

class ExerciseSearch extends React.Component {
    constructor() {
        super();
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.displaySearchResults = this.displaySearchResults.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.searchLocal = this.searchLocal.bind(this);
        this.createFuse = this.createFuse.bind(this);

        this.fuse = null;
        this.state = {
            searchInput: "",
            searchResults: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.exercises.length !== this.props.exercises.length) {
            this.fuse = this.createFuse();
        }
    }

    createFuse() {
        const options = {
            keys: ['name']
        };
        return new Fuse(this.props.exercises, options);
    }

    displaySearchResults() {
        if (this.state.searchResults.length === 0) {
            return;
        }

        const animationConfig = {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 },
        }

        const searchResultItems = this.state.searchResults.map((exercise, i) => {
            return (
                <ExerciseSearchResultItem key={i} editable={this.props.editable} addToPlan={this.props.addToPlan} exercise={exercise.item} currentPlanId={this.props.currentPlanId} />
            );
        });

        return (
            <AnimatedList items={searchResultItems} config={animationConfig}/>
        )
    }

    onSearchInputChange(e) {
        if (this.fuse === null || this.fuse === undefined) {
            this.fuse = this.createFuse();
        }
        this.setState({
            searchInput: e.target.value,
        });

        this.searchLocal(e.target.value);
    }

    onSearchSubmit(e) {
        e.preventDefault();
    }

    searchLocal(searchValue) {
        let searchResults = this.fuse.search(searchValue);
        if (searchResults.length === 0) {
            // Do global search on server here.
            // OR have user choose to do global search
        }
        this.setState({
            searchResults
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSearchSubmit}>
                    <InputGroup>
                        <FormControl value={this.state.searchInput} onChange={this.onSearchInputChange} placeholder="Search exercises"/>
                        <InputGroup.Append>
                            <Button variant="primary" type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <ListGroup className="exercise-search-results__container">
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