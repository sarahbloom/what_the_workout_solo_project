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

    finishedWorkout = (event) => {
        console.log('finished workout');
        event.preventDefault();
        this.props.dispatch({
            type: 'POST_COMPLETED_SESSION',
            payload: {
            exerciseArray: this.props.workoutDetailList,
            }
        })
        // console.log(this.props.workoutDetailList)
    }

    render() {
        let content = null;

        let sessionArray = this.props.workoutDetailList.map(sessionItem => {
            return (
                < StartWorkoutItem key={sessionItem.name} sessionItem={sessionItem} />
            )
        })

        if (this.props.user.userName) {
            content = (
                <div>
                {sessionArray}
                <Button onClick={this.finishedWorkout} variant="raised" color="primary"> 
                    Finished Workout! 
                </Button>
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