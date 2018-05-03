import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Nav from '../../Nav/Nav';
import WorkoutDetailItem from './WorkoutDetailItem';

class WorkoutDetail extends Component {
  state = {
    redirect: false,
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

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
    // console.log("workout detail props", this.props.workoutDetailList);
    
    let workoutDetailArray = this.props.workoutDetailList.map(exerciseItem =>{
        return (
          < WorkoutDetailItem key={exerciseItem.name} exerciseItem={exerciseItem} /> 
        )
    })

    if (this.props.user.userName && this.state.redirect === false) {
      content = (
          <div>
            <br />
            <Button  variant="raised" color="primary" onClick={() => this.deleteWorkout(this.props.workoutDetailList[0].workout_id)}>
              Delete Workout 
            </Button>
            <br />
            <h2> Workout Details </h2>
              <ul> {workoutDetailArray} </ul>
            <br />
            <Link to="/startworkout">
              <Button variant="raised" color="primary" > Start Workout! </Button>
            </Link>
          </div>
      );
    } else if (this.props.user.userName && this.state.redirect) {
        content = (<Redirect exact from="/viewworkout/detail" to="/viewworkout" />);
    } else {
        return (
          content
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
  state
});

export default connect(mapStateToProps)(WorkoutDetail);
