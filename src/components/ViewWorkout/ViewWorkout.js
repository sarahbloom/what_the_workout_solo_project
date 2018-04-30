import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import '../ViewWorkout/ViewWorkout.css'

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

class ViewWorkout extends Component {
  //all workouts will display on DOM on page load
  componentDidMount() {
    this.props.dispatch({ 
      type: USER_ACTIONS.FETCH_USER 
    });
  }

  componentWillMount(){
    this.getWorkoutList();
  }

    getWorkoutList= () =>{
      this.props.dispatch({
        type: "GET_WORKOUT"
      })
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let content = null;
    console.log(this.props.state);
    
    let workoutList = this.props.state.viewWorkoutList.map((workoutItem) =>{
      return <li className="workoutList" key={workoutItem.id}> 
        <Button variant="raised" color="primary"> {workoutItem.name} </Button>
        <br />
      </li>
    })

    if (this.props.user.userName) {
      content = (
        <div>
          <h1 id="welcome"> Welcome, { this.props.user.userName }!</h1>
          <ul> {workoutList} </ul>
          <button onClick={this.logout}> Log Out </button>
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
  state
});

export default connect(mapStateToProps)(ViewWorkout);

