import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
  workoutDetailList: state.workoutDetailList
});

class WorkoutDetail extends Component {
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      // this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let content = null;
    // console.log("workout detail props", this.props.workoutDetailList);
    
    let workoutDetailArray = this.props.workoutDetailList.map(exerciseItem =>{
        return (
          <li key={exerciseItem.name}>  <strong>Name:</strong> {exerciseItem.name} &nbsp;
            <strong>Sets:</strong> {exerciseItem.default_sets} &nbsp;
            <strong>Repetitions:</strong> {exerciseItem.default_reps} &nbsp;
            <strong>Resistance:</strong> {exerciseItem.default_weight}&nbsp;
          </li> //make this its own component
        )
    })

    if (this.props.user.userName) {
      content = (
        <div>
          <h2>
            Workout Details
          </h2>
          <ul> {workoutDetailArray} </ul>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        <button onClick={this.logout}> Log Out </button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(WorkoutDetail);
