import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import Nav from '../../Nav/Nav';
import WorkoutDetailItem from './WorkoutDetailItem';
import './WorkoutDetail.css'

class WorkoutDetail extends Component {
  state = {
    redirect: false,
  }
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
    // information is from Redux State
    let sessionDate = this.props.viewLastSessionDate
    // format date of last completed session
    let date = sessionDate.date;
    let viewDate = moment(date).format('L')
    //only show content if user is logged in
    if (this.props.user.userName && this.state.redirect === false) {
      content = (
          <div>
            <h2> {sessionDate.name} </h2>
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
              <Button variant="raised" color="primary"
                onClick = {
                  () => this.deleteWorkout(this.props.workoutDetailList[0].workout_id)} 
              >
                Delete Workout
              </Button>
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
