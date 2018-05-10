import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import { KeyboardArrowDown } from 'material-ui-icons';
// import { Link } from 'react-router-dom';
import Dialog, 
    { DialogActions, DialogContent,DialogContentText, DialogTitle } 
    from 'material-ui/Dialog';
import ExpansionPanel, 
    { ExpansionPanelSummary, ExpansionPanelDetails } 
    from 'material-ui/ExpansionPanel';


import Nav from '../Nav/Nav';
import CreateWorkoutItem from './CreateWorkoutItem'
import './CreateWorkout.css'

class CreateWorkout extends Component {
    state = {
        open: false,
        workoutName: "",
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_EXERCISE'
        });
    }

     handleClickOpen = () => {
         this.setState({
             open: true
         });
     };

    handleClose = (event) => {
        event.preventDefault();
        this.setState({
            open: false
        });
    };
    // handle name change for new workout name to be sent with SubmitWorkout
    handleNameChange = (event) => {
        event.preventDefault();
        this.setState({
            workoutName: (event.target.value)
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
        }
        this.props.history.push('startworkout')
    }

    render() {
        let WorkoutExerciseList = this.props.createWorkoutExerciseList;
        //return lower body exercises in the lower body panel
        let lowerBodyExercise = WorkoutExerciseList.map(exercise => {
            if (exercise.family === "lower body") {
                return ( 
                    <CreateWorkoutItem key = {exercise.id}exercise = {exercise}
                    handleToggle = {this.handleToggle}/> 
                )
            } 
            return null
        })
        //return upper body exercises in the upper body panel
        let upperBodyExercise = WorkoutExerciseList.map(exercise => {
            if (exercise.family === "upper body") {
            return ( 
                <CreateWorkoutItem key = {exercise.id}exercise = {exercise}
                handleToggle = {this.handleToggle}/> 
                )
            }
            return null
        })

        let content = null;

        if (this.props.user.userName) {
            content = ( 
                <div>
                <h2> Create Your Workout! </h2> 
                <form onSubmit = {this.submitWorkout} className = "newWorkout" >
                    <Input className="inputField" placeholder = "Workout Name"
                        type = "text" onChange = {this.handleNameChange}
                        value = {this.state.workoutName}
                    />
                <div>
            <br/>
                    { /* Expansion panel - Lower Body */ }
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon = { < KeyboardArrowDown/> }>
                            < Typography className = "heading" > Lower Body </Typography>
                        </ExpansionPanelSummary >
                        <ExpansionPanelDetails >
                            <List> {lowerBodyExercise} </List> 
                        </ExpansionPanelDetails > 
                    </ExpansionPanel>
                    {/* Expansion panel - Upper Body */}
                    <ExpansionPanel >
                        < ExpansionPanelSummary expandIcon = { <KeyboardArrowDown /> }>
                            <Typography className = "heading">  Upper Body </Typography> 
                        </ExpansionPanelSummary > 
                        <ExpansionPanelDetails >
                            <List> {upperBodyExercise} </List>
                        </ExpansionPanelDetails > 
                    </ExpansionPanel>
                    {/* added expansion panel for "core" to add another family of exercises in the future */}
                    {/* <ExpansionPanel >
                        < ExpansionPanelSummary expandIcon = { <KeyboardArrowDown /> }>
                        < Typography className = "heading" > Core </Typography> 
                        </ExpansionPanelSummary > 
                    </ExpansionPanel> */}
            <br />
                </div> 
                < div className = "workoutButton" >
                    <Button type = "submit" variant = "raised" color = "primary" >
                        Start Workout!
                    </Button> 
                </div>
                </form> 
                </div>
            )
        }

        return ( 
            <div >
            <Nav />
                <Dialog open = {this.state.open}
                        aria-describedby = "alert-dialog-no-workout-name" >
                    <DialogTitle > 
                        {"Your Workout Needs a Name!"} 
                    </DialogTitle> 
                    <DialogContent >
                    <DialogContentText >
                        Please enter in a name for your new workout before continuing. 
                    </DialogContentText> 
                    </DialogContent> 

                    <DialogActions >
                        <Button onClick = {this.handleClose} color = "primary">
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