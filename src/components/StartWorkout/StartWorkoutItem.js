import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { AddCircleOutline, RemoveCircleOutline } from 'material-ui-icons';

import '../StartWorkout/StartWorkout.css'

class StartWorkoutItem extends Component {

    addFive = () => {
        this.props.exerciseItem.default_weight = parseInt(this.props.exerciseItem.default_weight, 10)
        this.props.exerciseItem.default_weight += 5;
        console.log('weight', this.props.exerciseItem.default_weight);
        return this.props.exerciseItem.default_weight;
    }

    deleteFive = () => {
        console.log('clicked deleteFive');
        this.props.exerciseItem.default_weight = parseInt(this.props.exerciseItem.default_weight, 10)
        this.props.exerciseItem.default_weight -= 5;
        console.log('weight', this.props.exerciseItem.default_weight);
        return this.props.exerciseItem.default_weight;
    }

    addOneSet = () => {
        this.props.exerciseItem.default_sets = parseInt(this.props.exerciseItem.default_sets, 10)
        this.props.exerciseItem.default_sets += 1;
        console.log('sets', this.props.exerciseItem.default_sets);
        return this.props.exerciseItem.default_sets ;
    }

    deleteOneSet = () => {
        this.props.exerciseItem.default_sets = parseInt(this.props.exerciseItem.default_sets, 10)
        this.props.exerciseItem.default_sets -= 1;
        console.log('sets', this.props.exerciseItem.default_sets);
        return this.props.exerciseItem.default_sets;
    }

    addOneRep = () => {
        this.props.exerciseItem.default_reps = parseInt(this.props.exerciseItem.default_reps, 10)
        this.props.exerciseItem.default_reps += 1;
        console.log('reps', this.props.exerciseItem.default_reps);
        return this.props.exerciseItem.default_reps;
    }
    
    deleteOneRep = () => {
        this.props.exerciseItem.default_reps = parseInt(this.props.exerciseItem.default_reps, 10)
        this.props.exerciseItem.default_reps -= 1;
        console.log('reps', this.props.exerciseItem.default_reps);
        return this.props.exerciseItem.default_reps;
    }

    render(){

        return (

        <ul key={this.props.exerciseItem.name}>
            <li><strong>Name: {this.props.exerciseItem.name} </strong> </li>
            <li>Sets: {this.props.exerciseItem.default_sets} 
                <div className="updateInWorkout"> 
                    <IconButton onClick={this.addOneSet} size="small" color="primary" >
                        <AddCircleOutline />
                    </IconButton>
                         1 set
                    <IconButton onClick={this.deleteOneSet} size="small" color="primary" >
                        <RemoveCircleOutline />
                    </IconButton>
                </div>
            </li>
            <li>Repetitions: {this.props.exerciseItem.default_reps} 
                <div className="updateInWorkout"> 
                        <IconButton onClick={this.addOneRep} size="small" color="primary" >
                        <AddCircleOutline />
                    </IconButton>
                    1 rep
                    <IconButton onClick={this.deleteOneRep} size="small" color="primary" >
                        <RemoveCircleOutline />
                    </IconButton>
                </div>                   
            </li>
            <li><strong>Resistance: {this.props.exerciseItem.default_weight} </strong>
                <div className="updateInWorkout"> 
                    <IconButton onClick={this.addFive} size="small" variant="fab" color="primary" >
                        <AddCircleOutline />
                    </IconButton>
                        5 lbs. 
                    <IconButton onClick={this.deleteFive} size="small" variant="fab" color="primary" >
                        <RemoveCircleOutline />
                    </IconButton>
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