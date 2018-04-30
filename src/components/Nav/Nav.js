import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li className="navBar">
          <Link to="/user">
           View All Workouts
          </Link>
        </li>
        <li className="navBar">
          <Link to="/info">
            Workout Details
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
