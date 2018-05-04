import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';

import Button from 'material-ui/Button';
import List from 'material-ui/List';

import Nav from '../Nav/Nav';
import CreateWorkoutItem from './CreateWorkoutItem'

class CreateWorkout extends Component{
    state = {
        redirect: false,
        workoutName: "",
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EXERCISE'
        });
    }

    //submit new workout name and exercise list to BD
    submitWorkout = (event) => {
        console.log('submitWorkout clicked');

        if (this.state.workoutName.length === 0){
            console.log('you need a name');
            
            //TODO: add alert
        } else { 
            event.preventDefault(); 
            this.props.dispatch({
                type: 'POST_NEW_WORKOUT',
                payload: {
                    exerciseArray: this.props.createWorkoutExerciseList, 
                    workoutName: this.state.workoutName}
            })
            this.setState({
                redirect: !this.state.redirect
            })
        }
    }

    // handle name change for new workout name to be sent with payload
    handleNameChange = (event) => {
            event.preventDefault(); 
            this.setState({
                workoutName:  (event.target.value)
            }) 
    }
    
    render(){
        let WorkoutExerciseList = this.props.createWorkoutExerciseList;
        
        let ExerciseList = WorkoutExerciseList.map(exercise =>{
            return (
                < CreateWorkoutItem key={exercise.id} exercise={exercise} 
                handleToggle={this.handleToggle}/> 
            )  
        })

        let content = null;
            if (this.state.redirect) {
                content = (<Redirect exact from="/createworkout" to="/startworkout" />)
            } else {
                content =(
                <div>
                    <h2> Create Your Workout! </h2>
                    <form onSubmit={this.submitWorkout} >
                            <input placeholder="Workout Name" type="text" 
                                onChange={this.handleNameChange}
                                value={this.state.workoutName} />
                        {/* TODO: Determine how want to display this */}
                        {/* <select className="exerciseTypeDropDown">
                            <option value="">Exercise Type:</option>
                            <option value="lower body">Lower Body</option>
                            <option value="upper body">Upper Body</option>
                            </select> */}
                    <List value={WorkoutExerciseList}> {ExerciseList}</List>
                    <Button type="submit" variant="raised" color="primary">
                        Start Workout!
                    </Button>
                    </form>
                </div>
                )
            }

        return(
            <div>
                <Nav />
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    createWorkoutExerciseList: state.createWorkoutExerciseList,
    state,
});

export default connect(mapStateToProps)(CreateWorkout);
