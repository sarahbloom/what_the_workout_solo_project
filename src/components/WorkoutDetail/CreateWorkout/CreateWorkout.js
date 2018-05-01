import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Button from 'material-ui/Button';
// import { Link } from 'react-router-dom';

import Nav from '../../Nav/Nav';

class CreateWorkout extends Component{
    //info goes here
    render(){
        return(
            <div>
                <Nav />
                <h2> Add/Edit Your Workout </h2>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
});

export default connect(mapStateToProps)(CreateWorkout);