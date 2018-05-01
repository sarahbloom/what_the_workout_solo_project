import React, {Component}from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';


class Nav extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  render(){
    return(
      <div className="navbar">
        <div>
          <ul>
            <li className="navBar">
              <Link to="/viewworkout">
                View All Workouts
          </Link>
            </li>
            <li className="navBar">
              <Link to="/editworkout">
                Create Workout
          </Link>
            </li>
            <li className="navBar" onClick={this.logout}>
              <Link to="/home">
                Logout
          </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav;
