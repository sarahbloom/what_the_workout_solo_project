import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { AddCircleOutline, RemoveCircleOutline } from 'material-ui-icons';
import Card, { CardContent } from 'material-ui/Card';
import { Grid, Typography } from 'material-ui';

import '../StartWorkout/StartWorkout.css'

class StartWorkoutItem extends Component {
    //update completed weight by five
    addFive = () => {
        this.props.sessionItem.default_weight = parseInt(this.props.sessionItem.default_weight, 10)
        this.props.sessionItem.default_weight += 5;
        // console.log('weight', this.props.sessionItem.default_weight);
        console.log(this.props.sessionItem);

        this.props.dispatch({
            type: 'UPDATE_EXERCISE_IN_SESSION',
            payload: this.props.sessionItem
        })
    }
    //decrease completed weight by five
    deleteFive = () => {
        console.log('clicked deleteFive');
        this.props.sessionItem.default_weight = parseInt(this.props.sessionItem.default_weight, 10)
        this.props.sessionItem.default_weight -= 5;
        // console.log('weight', this.props.sessionItem.default_weight);
        this.props.dispatch({
            type: 'UPDATE_EXERCISE_IN_SESSION',
            payload: this.props.sessionItem
        })
    }
    //update completed sets by one
    addOneSet = () => {
        this.props.sessionItem.default_sets = parseInt(this.props.sessionItem.default_sets, 10)
        this.props.sessionItem.default_sets += 1;
        // console.log('sets', this.props.sessionItem.default_sets);
        this.props.dispatch({
            type: 'UPDATE_EXERCISE_IN_SESSION',
            payload: this.props.sessionItem
        })
        
    }
    //decrease completed sets by one
    deleteOneSet = () => {
        this.props.sessionItem.default_sets = parseInt(this.props.sessionItem.default_sets, 10)
        this.props.sessionItem.default_sets -= 1;
        // console.log('sets', this.props.sessionItem.default_sets);
        this.props.dispatch({
            type: 'UPDATE_EXERCISE_IN_SESSION',
            payload: this.props.sessionItem
        })
    }
    //update completed reps by one
    addOneRep = () => {
        this.props.sessionItem.default_reps = parseInt(this.props.sessionItem.default_reps, 10)
        this.props.sessionItem.default_reps += 1;
        // console.log('reps', this.props.sessionItem.default_reps);
        this.props.dispatch({
            type: 'UPDATE_EXERCISE_IN_SESSION',
            payload: this.props.sessionItem
        })
    }
    //decrease completed reps by one
    deleteOneRep = () => {
        this.props.sessionItem.default_reps = parseInt(this.props.sessionItem.default_reps, 10)
        this.props.sessionItem.default_reps -= 1;
        // console.log('reps', this.props.sessionItem.default_reps);
        this.props.dispatch({
            type: 'UPDATE_EXERCISE_IN_SESSION',
            payload: this.props.sessionItem
        })
    }

    render(){

        return (

        <Grid item>
        <Card key={this.props.sessionItem.name} 
            className="startWorkoutCards" 
            style= {{ maxWidth: "345px" }} 
            // style= {{backgroundColor: "secondary"}}
            >
            <CardContent className="startWorkoutCards" >
                {/* Exercise name */}
                <Typography variant="headline" component="h3">
                    <strong>Name: {this.props.sessionItem.name} </strong> 
                </Typography>
                { /* Default sets with buttons to reflect completed sets*/ }
                <Typography>
                    Sets: 
                    <IconButton className="updateInWorkout" onClick={this.addOneSet} size="small" color="primary" >
                        <AddCircleOutline />
                    </IconButton>
                            <strong>{this.props.sessionItem.default_sets} </strong>
                    <IconButton onClick={this.deleteOneSet} size="small" color="primary" >
                        <RemoveCircleOutline />
                    </IconButton>
                </Typography>
                { /* Default reps with buttons to reflect completed reps*/ }
                <Typography>
                    Repetitions: 
                    <IconButton className="updateInWorkout" onClick={this.addOneRep} size="small" color="primary" >
                        <AddCircleOutline />
                    </IconButton>
                        <strong>{this.props.sessionItem.default_reps} </strong>
                    <IconButton onClick={this.deleteOneRep} size="small" color="primary" >
                        <RemoveCircleOutline />
                    </IconButton>
                </Typography>
                { /* Default weight with buttons to reflect completed weight*/ }
                <Typography component="h3">
                    Weight: 
                    <IconButton className="updateInWorkout" onClick={this.addFive} size="small" variant="fab" color="primary" >
                        <AddCircleOutline />
                    </IconButton>
                        < strong > {this.props.sessionItem.default_weight} </strong>
                    <IconButton onClick={this.deleteFive} size="small" variant="fab" color="primary" >
                        <RemoveCircleOutline />
                    </IconButton>
                </Typography>

          </CardContent>
        </Card>
        </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    workoutDetailList: state.workoutDetailList,
    state
});

export default connect(mapStateToProps)(StartWorkoutItem);