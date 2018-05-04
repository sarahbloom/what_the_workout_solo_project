import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { AddCircleOutline, RemoveCircleOutline } from 'material-ui-icons';

import '../StartWorkout/StartWorkout.css'

class StartWorkoutItem extends Component {

    render(){

        let addButton = (
            <IconButton size="small" variant="fab" color="primary" >
                <AddCircleOutline />
            </IconButton>
        )

        let subtractButton = (
            <IconButton size="small" variant="fab" color="primary" >
                <RemoveCircleOutline />
            </IconButton>
        )

        return (
        <ul key={this.props.exerciseItem.name}>
            <li><strong>Name: {this.props.exerciseItem.name} </strong> </li>
            <li>Sets: {this.props.exerciseItem.default_sets} 
                    <div className="updateInWorkout"> 
                        {addButton} 1 set {subtractButton}
                    </div>
            </li>
            <li>Repetitions: {this.props.exerciseItem.default_reps} 
                <div className="updateInWorkout"> 
                    {addButton} 1 rep {subtractButton}
                </div>                   
            </li>
            <li><strong>Resistance: {this.props.exerciseItem.default_weight} </strong>
                <div className="updateInWorkout"> 
                    {addButton} 5 lbs. {subtractButton}
                </div>  
            </li>
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