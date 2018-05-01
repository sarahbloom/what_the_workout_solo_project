import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Button from 'material-ui/Button';
// import { Link } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';

class StartWorkout extends Component {
    //info goes here
    render() {
        return (
            <div>
                <Nav />
                <h2> Start Your Workout! </h2>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
});

export default connect(mapStateToProps)(StartWorkout);