import React, { Component } from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import { Edit } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Modal from 'material-ui/Modal';

import EditExercise from '../EditExercise/EditExercise';

function getModalStyle() {
    let top = 50;
    let left = 50;
    return {
        position: 'absolute',
        width: 300,
        top: top + '%', left: left + '%',
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class CreateWorkoutItem extends Component {
    state = {
        open: false,
    };
    //select a specific exercise to be included with workout
    handleToggle = (exercise) => {
        this.props.exercise.selected = !this.props.exercise.selected;        
    }     
    //close modal and refresh page
     handleClose = () => {
         this.setState({
             open: false
         });
         this.props.dispatch({
             type: 'GET_EXERCISE'
         });
     };
    //update default exercise settings
    editSingleExercise = (exercise) =>{
        console.log('clicked editSingleExercise', exercise);
        this.setState({ open: true });
        this.props.dispatch({
            type: 'VIEW_SINGLE_EXERCISE', 
            payload: exercise
        })
    }
    
    render() {    
            let content = (
            <div>
                    <ListItem
                        style={{ maxWidth: "350px" }}
                        key={this.props.exercise.id}
                        dense
                        button
                        onClick={this.handleToggle}
                    >
                    <Checkbox
                        tabIndex={-1}
                        disableRipple
                    />
                    <ListItemText primary={`Name: ${this.props.exercise.name} 
                                Sets: ${this.props.exercise.default_sets}
                                Repetitions: ${this.props.exercise.default_reps}
                                Weight: ${this.props.exercise.default_weight}`}/>
                    <ListItemSecondaryAction>
                        <IconButton value={this.props.exercise}
                        onClick={() => this.editSingleExercise(this.props.exercise)} >
                            <Edit />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            
                <Modal
                    aria-labelledby="exercise-item"
                    aria-describedby="update default settings for a single exercise"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                <div style={getModalStyle()} className="editExerciseClass">
                    < EditExercise />
                </div>
                </Modal>
            </div>
            )

            return (
            <List>{content}</List>
            )
         
    }//end render
}//end class

const mapStateToProps = state => ({
    user: state.user,
    state
});

export default connect(mapStateToProps)(CreateWorkoutItem);
