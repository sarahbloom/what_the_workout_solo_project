import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Dialog, 
    { DialogActions, DialogContent, DialogTitle,}
    from 'material-ui/Dialog';

import Nav from '../../components/Nav/Nav';
import StartWorkoutItem from './StartWorkoutItem'

class StartWorkout extends Component {
     state = {
         open: false,
     };
    
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
        this.setState({
            open: true
        });
    }

      handleClose = () => {
        this.setState({ 
            open: false 
        });
    };


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
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-finished-workout"
                >
                    <DialogTitle id="alert-dialog-title">You're a Champ!</DialogTitle>
                    <DialogContent>
                        < img src="https://images.pexels.com/photos/347135/pexels-photo-347135.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt="cheers for completeing the workout"/>
                    </DialogContent>
                    <DialogActions>
                        < Link to = "/viewworkout" >
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                            View Workouts
                            </Button>
                        </Link>
                        < Link to = "/createworkout" >
                            <Button onClick={this.handleClose} color="primary">
                            Create New Workout
                            </Button>
                        </Link>
                    </DialogActions>
                    </Dialog>
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