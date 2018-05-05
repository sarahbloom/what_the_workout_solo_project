import React, { Component } from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import { Edit } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Modal from 'material-ui/Modal';

import EditExercise from '../EditExercise/EditExercise';
import './CreateWorkoutItem.css'

function rand() {
    return Math.round(Math.random() * 10) - 10;
}

function getModalStyle() {
    let top = 20 + rand();
    let left = 20 + rand();

    return {
        position: 'absolute',
        // width: 300,
        top: top + '%', left: left + '%',
        transform: `translate(-${top}%, -${left}%)`,
    };
}


class CreateWorkoutItem extends Component {
    state = {
        open: false,
    };

    handleToggle = (exercise) => {
        this.props.exercise.selected = !this.props.exercise.selected;        
    }     

    editSingleExercise = (exercise) =>{
        console.log('clicked editSingleExercise', exercise);
        this.setState({ open: true });
        this.props.dispatch({
            type: 'VIEW_SINGLE_EXERCISE', 
            payload: exercise
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };
    
    render() {    
            let content = (
            <div  className="editExerciseClass">
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
                <div style={getModalStyle()} className="paper">
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
