import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Button from 'material-ui/Button';
// import { Link } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';

class EditExercise extends Component {
    componentDidMount() {
        // console.log('exercise', this.props.state);
        //dispatch will need to go here 'GET_SINGLE_EXERCISE_DETAILS' 

    }

    // dispatch to update info: 'UPDATE_SINGLE_EXERCISE'

    //info goes here
    render() {
        let editExerciseList = this.props.exercise.map(exercise =>{
            
            console.log('exercise map', exercise);
            return (
                <div>
                    <h4>Name: {exercise.name}</h4>
                    <p>Sets: {exercise.default_sets}</p>
                    <p>Repetitions: {exercise.default_reps}</p>
                    <h3>Weight: {exercise.default_weight}</h3> 
                </div>
            )

        });
        
        
        return (
            <div>
                <Nav />
                <h2> Edit Exercise </h2>
                {editExerciseList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    exercise: state.editExerciseList
});

export default connect(mapStateToProps)(EditExercise);