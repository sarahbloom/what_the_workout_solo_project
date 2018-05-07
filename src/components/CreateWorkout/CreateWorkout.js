import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';

import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Input from 'material-ui/Input';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import Nav from '../Nav/Nav';
import CreateWorkoutItem from './CreateWorkoutItem'
import './CreateWorkout.css'

class CreateWorkout extends Component{
    state = {
        open: false,
        redirect: false,
        workoutName: "",
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EXERCISE'
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (event) => {
        event.preventDefault();
        this.setState({ open: false });
    };

    // handle name change for new workout name to be sent with payload
    handleNameChange = (event) => {
        event.preventDefault(); 
        this.setState({
            workoutName:  (event.target.value)
        }) 
    }

    //submit new workout name and exercise list to BD
    submitWorkout = (event) => {
        if (this.state.workoutName.length === 0) {
            console.log('you need a name');
            this.setState({
                open: true
            });
        } else {
            event.preventDefault();
            this.props.dispatch({
                type: 'POST_NEW_WORKOUT',
                payload: {
                    exerciseArray: this.props.createWorkoutExerciseList,
                    workoutName: this.state.workoutName
                }
            })
            this.setState({
                redirect: !this.state.redirect
            })
        }
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
                    <form onSubmit={this.submitWorkout} className="newWorkout">
                    <Input placeholder="Workout Name" type="text" 
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
                <Dialog
                    open={this.state.open}
                    // onClose={this.handleClose}
                    aria-describedby="alert-dialog-no-workout-name"
                >
                <DialogTitle>{"Your Workout Needs a Name!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter in a name for your new workout before starting.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        OK!
                    </Button>
                </DialogActions>
                </Dialog>
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
