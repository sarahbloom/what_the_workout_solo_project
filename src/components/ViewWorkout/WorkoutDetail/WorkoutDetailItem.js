import React, { Component } from 'react';
import { connect } from 'react-redux';

class WorkoutDetailItem extends Component{

    render (){

        return (
            <li key={this.props.exerciseItem.name}>
                <strong>Name:</strong> {this.props.exerciseItem.name} &nbsp;
                <strong>Sets:</strong> {this.props.exerciseItem.default_sets} &nbsp;
                <strong>Repetitions:</strong> {this.props.exerciseItem.default_reps} &nbsp;
                <strong>Resistance:</strong> {this.props.exerciseItem.default_weight}&nbsp;
            </li>
        )
    }//end render
}//end class

const mapStateToProps = state => ({
    user: state.user,
    workoutDetailList: state.workoutDetailList
});

export default connect(mapStateToProps)(WorkoutDetailItem);