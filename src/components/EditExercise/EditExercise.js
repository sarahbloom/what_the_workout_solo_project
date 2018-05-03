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
        let EditExerciseList = this.props.state.editExerciseList;
        console.log(EditExerciseList);
        

        return (
            <div>
                <Nav />
                <h2> Edit Exercise </h2>
                <pre>{JSON.stringify(EditExerciseList)}</pre>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
});

export default connect(mapStateToProps)(EditExercise);