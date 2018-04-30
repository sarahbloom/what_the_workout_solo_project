import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { triggerLogout } from '../../redux/actions/loginActions';

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
    let workoutDetailArray = this.props.state.workoutDetailList.map(exerciseItem =>{
        return (
          <li key={exerciseItem.id}> {exerciseItem} </li>
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

const mapStateToProps = state => ({
  user: state.user,
  state
});

export default connect(mapStateToProps)(WorkoutDetail);
