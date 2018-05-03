import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

import Nav from '../../components/Nav/Nav';
import StartWorkoutItem from './StartWorkoutItem'

class StartWorkout extends Component {
    
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    render() {
        let content = null;

        let sessionArray = this.props.workoutDetailList.map(sessionItem => {
            return (
                < StartWorkoutItem key={sessionItem.name} exerciseItem={sessionItem} />
            )
        })

        if (this.props.user.userName) {
            content = (
                <div>
                {sessionArray}
                <Button variant="raised" color="primary"> Finished Workout! </Button>
                </div>
            )
        }

        return (
            <div>
                <Nav />
                <h2> Start Your Workout! </h2>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    workoutDetailList: state.workoutDetailList,
    state
});

export default connect(mapStateToProps)(StartWorkout);