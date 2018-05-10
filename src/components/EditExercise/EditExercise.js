import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { Done } from 'material-ui-icons';

import './EditExercise.css'

class EditExercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            default_sets: '',
            default_reps: '',
            default_weight: '',
        }
    }
    //function to handle change for default settings
    handleChangeFor = (exerciseDefault) => (event) => {
            this.setState({
                ...this.state,
                [exerciseDefault]: event.target.value,
            })
        }
    // update default sets in database
    handleSubmitForSets = () => {
        this.props.state.editSingleExerciseList.default_sets = this.state.default_sets
        this.props.dispatch({
            type: 'UPDATE_DEFAULT',
            payload: this.props.state.editSingleExerciseList
        })
    }
    // update default reps in database
    handleSubmitForReps = () => {
        this.props.state.editSingleExerciseList.default_reps = this.state.default_reps
        this.props.dispatch({
            type: 'UPDATE_DEFAULT',
            payload: this.props.state.editSingleExerciseList
        })
    }
     // update default weight in database
    handleSubmitForWeight = () => {
        this.props.state.editSingleExerciseList.default_weight = this.state.default_weight
        this.props.dispatch({
            type: 'UPDATE_DEFAULT',
            payload: this.props.state.editSingleExerciseList
        })
    }

    render() {
        
        let singleExercise = this.props.exercise;

        let content = (
            <div className="editExerciseModal" key={singleExercise.id}>
                <h3>Name: {singleExercise.name}</h3>
                <h4>Sets: <input defaultValue={singleExercise.default_sets}
                    onChange={this.handleChangeFor("default_sets")} /> 
                    <IconButton className="updateIcon" onClick={this.handleSubmitForSets} variant="raised" color="secondary">
                        <Done />
                    </IconButton>
                </h4>
                <h4> Repetitions: < input defaultValue = {singleExercise.default_reps}
                    onChange={this.handleChangeFor("default_reps")} />  
                    <IconButton onClick={this.handleSubmitForReps} variant="raised" color="secondary">
                        <Done />
                    </IconButton>
                </h4>
                <h4>Weight: <input defaultValue={singleExercise.default_weight}
                    onChange={this.handleChangeFor("default_weight")} /> 
                    <IconButton onClick={this.handleSubmitForWeight} variant="raised" color="secondary">
                        <Done />
                    </IconButton>
                </h4>
            </div>
        )

        return (
            <div className="editExerciseContent">
                <h2> Edit Exercise </h2>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    exercise: state.editSingleExerciseList,
    state
});

export default connect(mapStateToProps)(EditExercise);