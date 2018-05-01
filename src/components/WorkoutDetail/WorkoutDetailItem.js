import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';

class WorkoutDetailItem extends Component{

    render (){
        return(
            <li key={this.props.exerciseItem.name}>  
            <strong>Name:</strong> {this.props.exerciseItem.name} &nbsp;
            <strong>Sets:</strong> {this.props.exerciseItem.default_sets} &nbsp;
            <strong>Repetitions:</strong> {this.props.exerciseItem.default_reps} &nbsp;
            <strong>Resistance:</strong> {this.props.exerciseItem.default_weight}&nbsp;
          </li>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    workoutDetailList: state.workoutDetailList
});

export default connect(mapStateToProps)(WorkoutDetailItem);