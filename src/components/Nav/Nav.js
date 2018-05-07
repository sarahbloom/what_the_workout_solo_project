import React, {Component}from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';


class Nav extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render(){
    return(
      <div className="navbar">
        <div>
          <ul>
            <li className="navBar">
              <Link to="/viewworkout">
                View Workouts
              </Link>
            </li>
            <li className="navBar">
              <Link to="/createworkout">
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
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps) (Nav);
