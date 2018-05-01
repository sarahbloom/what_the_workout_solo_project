import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
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
      </ul>
    </div>
  </div>
);

export default Nav;
