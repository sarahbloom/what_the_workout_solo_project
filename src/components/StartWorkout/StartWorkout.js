import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    //save completed session to database. Change of local state will display diaglog box.
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
    //close of dialog box
      handleClose = () => {
        this.setState({ 
            open: false 
        });
        this.props.history.push('viewworkout')
    };


    render() {
        let content = null;
        //map over exercises to be completed in the session
        let sessionArray = this.props.workoutDetailList.map(sessionItem => {
            return (
                < StartWorkoutItem key={sessionItem.name} sessionItem={sessionItem} />
            )
        });
        
        //only show content if user is logged in
        if (this.props.user.userName) {
            content = (
            <div>
                {sessionArray}
                <div className="workoutButton">
                    <Button onClick={this.finishedWorkout} variant="raised" color="primary"> 
                     Finished Workout! 
                    </Button>
                </div>

                {/* dialog box which appears upon completion of workout */}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-finished-workout"
                    className="finishedWorkoutBox"
                >
                    < DialogTitle id="alertDialogTitle">
                        <strong>You're a Champ!</strong>
                    </DialogTitle>
                    <DialogContent>
                        < img src="https://images.pexels.com/photos/347135/pexels-photo-347135.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt="cheers for completeing the workout"/>
                    </DialogContent>
                    <DialogActions >
                        <Button className="workoutButton" onClick={this.handleClose} color="primary" >
                            Back to View Workouts
                        </Button>
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