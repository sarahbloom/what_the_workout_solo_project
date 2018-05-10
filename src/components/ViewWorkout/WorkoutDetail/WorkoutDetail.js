import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Dialog, 
  { DialogActions, DialogContent, DialogContentText, DialogTitle}
  from 'material-ui/Dialog';

import Nav from '../../Nav/Nav';
import WorkoutDetailItem from './WorkoutDetailItem';
import './WorkoutDetail.css'

class WorkoutDetail extends Component {
  state = {
    redirect: false,
    open: false
  }

  //prompts to show dialog box to confirm deletion of workout
    handleClickOpen = () => {
      this.setState({
        open: true
      });
    };
    handleClose = () => {
      this.setState({
        open: false
      });
    };

// cascading delete of workout and any sessions or completed exercises associated with the workout
  deleteWorkout = (idToDelete) => {
    console.log('clicked delete workout', idToDelete);
    this.props.dispatch({
      type: 'DELETE_WORKOUT',
      payload: this.props.workoutDetailList[0].workout_id
    })
    this.setState({
      redirect: !this.state.redirect
    })
  }

  render() {
    let content = null;
    //map over exercises in the selectedworkout
    let workoutDetailArray = this.props.workoutDetailList.map(exerciseItem => {
        return (
          < WorkoutDetailItem key={exerciseItem.name} exerciseItem={exerciseItem} /> 
        )
    })
    // information from Redux State
    let sessionDate = this.props.viewLastSessionDate
    // format date of last completed session
    let date = sessionDate.date;
    let viewDate = moment(date).format('L')

    //only show content if user is logged in
    if (this.props.user.userName && this.state.redirect === false) {
      content = (
          <div className="workoutDetail">
            <h2> Workout Details </h2>
            <h3>  Last Date Completed: {viewDate}</h3>
          <br />
            <ul>
              {workoutDetailArray}
            </ul>
            <div className="workoutDetailButton">
              <Link to="/startworkout">
                <Button variant="raised" color="primary" > 
                  Start Workout! 
                </Button>
              </Link>
          <br />
          <br />
              <Button onClick={this.handleClickOpen} variant="raised" color="primary">
                Delete Workout
              </Button>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="delete-dialog-title"
                >
                <DialogTitle id="delete-dialog-title">Are you sure you want to delete this workout?</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    This will delete the workout and any associated completed sessions.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    No, keep the workout.
                  </Button>
                  <Button onClick={() => this.deleteWorkout(this.props.workoutDetailList[0].workout_id)} color="primary" autoFocus>
                    Yes, delete the workout.
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
      );
    } else if (this.props.user.userName && this.state.redirect) {
      content = (
      <Redirect exact from="/viewworkout/detail" to="/viewworkout" />
      );
    } else {
      content = (
        <Redirect exact from="/viewworkout/detail" to="/home" />
      )
    }

    return (
      <div>
        <Nav />      
        { content }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  workoutDetailList: state.workoutDetailList,
  viewWorkoutList: state.viewWorkoutList,
  viewLastSessionDate: state.viewLastSessionDate,
  state
});

export default connect(mapStateToProps)(WorkoutDetail);
