import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import '../ViewWorkout/ViewWorkout.css'
import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

class ViewWorkout extends Component {
  
  //all workouts will display on DOM on page load
  componentDidMount() {
    this.props.dispatch({ 
      type: USER_ACTIONS.FETCH_USER,
    });
    this.props.dispatch({ 
      type: 'GET_WORKOUT',
    });
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  viewWorkoutDetail = (workoutItem) => {
  // console.log('clicked button', workoutItem.id);
    this.props.dispatch({ 
      type: 'DISPLAY_WORKOUT_DETAIL',
      payload: workoutItem.id
    })
  }

  render() {
    let content = null;
    
    let workoutList = this.props.viewWorkoutList.map((workoutItem) =>{
      return <li className="workoutList" key={workoutItem.id}> 
                <Link to="/viewworkout/detail" >
                  <Button value={workoutItem} 
                  onClick={() => this.viewWorkoutDetail(workoutItem)} 
                  variant="raised" color="primary"> 
                    {workoutItem.name} 
                  </Button>
                </Link>
              </li>
    })

    if (this.props.user.userName) {
      content = (
        <div>
          <h1 id="welcome"> 
            Welcome, { this.props.user.userName }!
          </h1>
          <h2>Your Workouts</h2>
          <ul> {workoutList} </ul>
        </div>
      );
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
  viewWorkoutList: state.viewWorkoutList,
  state
});

export default connect(mapStateToProps)(ViewWorkout);

