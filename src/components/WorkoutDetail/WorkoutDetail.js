import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';
import WorkoutDetailItem from './WorkoutDetailItem';

class WorkoutDetail extends Component {
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;
    // console.log("workout detail props", this.props.workoutDetailList);
    
    let workoutDetailArray = this.props.workoutDetailList.map(exerciseItem =>{
        return (
          < WorkoutDetailItem key={exerciseItem.name} exerciseItem={exerciseItem} /> 
        )
    })

    if (this.props.user.userName) {
      content = (
          <div>
            <h2> Workout Details </h2>
              <ul> {workoutDetailArray} </ul>
          </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        <Link to="/startworkout">
          <button variant="raised" color="primary" > Start Workout! </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  workoutDetailList: state.workoutDetailList
});

export default connect(mapStateToProps)(WorkoutDetail);
