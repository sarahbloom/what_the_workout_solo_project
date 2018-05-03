import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Button from 'material-ui/Button';

class StartWorkoutItem extends Component {

    render(){

        return (
        <ul key={this.props.exerciseItem.name}>
            <li><strong>Name: {this.props.exerciseItem.name} </strong> </li>
            <li>Sets: {this.props.exerciseItem.default_sets} </li>
            <li>Repetitions: {this.props.exerciseItem.default_reps} </li>
            <li><strong>Resistance: {this.props.exerciseItem.default_weight} </strong> </li>
            <br/>
          </ul>
        )

    }
}

const mapStateToProps = state => ({
    user: state.user,
    workoutDetailList: state.workoutDetailList,
    state
});

export default connect(mapStateToProps)(StartWorkoutItem);