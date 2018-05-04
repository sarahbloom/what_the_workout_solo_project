import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { CheckCircle } from 'material-ui-icons';

// import { Link } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';

class EditExercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // isEditing: false,
            default_sets: '',
            default_reps: '',
            default_weight: '',
            // id: this.props.exercise.id
        }
    }

    handleNameChangeFor = (exerciseDefault) => (event) => {
            this.setState({
                ...this.state,
                [exerciseDefault]: event.target.value,
            })
        }

    handleSubmitForSets = () => {
        this.props.state.editSingleExerciseList[0].default_sets = this.state.default_sets
        this.props.dispatch({
            type: 'UPDATE_DEFAULT',
            payload: this.props.state.editSingleExerciseList[0]
        })
    }

    handleSubmitForReps = () => {
        this.props.state.editSingleExerciseList[0].default_reps = this.state.default_reps
        this.props.dispatch({
            type: 'UPDATE_DEFAULT',
            payload: this.props.state.editSingleExerciseList[0]
        })
    }

    handleSubmitForWeight = () => {
        this.props.state.editExerceditSingleExerciseListiseList[0].default_weight = this.state.default_weight
        this.props.dispatch({
            type: 'UPDATE_DEFAULT',
            payload: this.props.state.editSingleExerciseList[0]
        })
    }

    render() {
        let editExerciseList = this.props.exercise.map(exercise =>{
            return (

                // <div key={exercise.id}>
                //     <h4>Name: {exercise.name}</h4>
                //     <p>Sets: <input defaultValue={exercise.default_sets} 
                //     onChange={this.handleNameChangeFor(exercise.default_sets)}/> </p>
                
                //     <p>Repetitions: <input defaultValue={exercise.default_reps}
                //     onChange={this.handleNameChangeFor("default_reps")}/> </p>
                    
                //     <h3>Weight: <input defaultValue={exercise.default_weight}
                //     onChange={this.handleNameChangeFor("default_weight")}/> </h3>

                //     <span><IconButton onClick={this.handleSubmit} variant="raised" color="primary">
                //         < CheckCircle /> 
                //     </IconButton></span>
                // </div>


                <div key={exercise.id}>
                    <h4>Name: {exercise.name}</h4>

                    <p>Sets: <input defaultValue={exercise.default_sets}
                        onChange={this.handleNameChangeFor("default_sets")} /> </p>
                    <span><IconButton onClick={this.handleSubmitForSets} variant="raised" color="primary">
                        < CheckCircle />
                    </IconButton></span>

                    <p>Repetitions: <input defaultValue={exercise.default_reps}
                        onChange={this.handleNameChangeFor("default_reps")} /> </p>
                    <span><IconButton onClick={this.handleSubmitForReps} variant="raised" color="primary">
                        < CheckCircle />
                    </IconButton></span>

                    <h3>Weight: <input defaultValue={exercise.default_weight}
                        onChange={this.handleNameChangeFor("default_weight")} /> </h3>
                    <span><IconButton onClick={this.handleSubmitForWeight} variant="raised" color="primary">
                        < CheckCircle />
                    </IconButton></span>
                </div>

                //TODO: figure out span
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
    exercise: state.editSingleExerciseList,
    state
});

export default connect(mapStateToProps)(EditExercise);