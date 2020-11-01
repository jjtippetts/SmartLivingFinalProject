import React from 'react';

class ExercisePlanDisplay extends React.Component {
    constructor() {
        super();
        this.displayPlan = this.displayPlan.bind(this);
    }

    displayPlan() {
        const toDisplay = this.props.toDisplay;
        if (toDisplay === null || toDisplay === undefined) {
            return (
                <div>
                    Select a plan!
                </div>
            )
        }

        return (
            <div>
                {toDisplay.name}
            </div>
        )
    }
    
    render() {
        return (
            <div>
                {this.displayPlan()}
            </div>
        )
    }
}

export default ExercisePlanDisplay;