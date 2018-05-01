import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import { Edit } from 'material-ui-icons';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router-dom';


class CreateWorkoutItem extends Component {

    handleToggle = (exercise) => {
        console.log(this.props.exercise.selected);
        this.props.exercise.selected = !this.props.exercise.selected;
        console.log(this.props.exercise.selected);
        
    }     
    
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
                            <Link to="/editexercise">
                            <IconButton >
                                <Edit />
                            </IconButton>
                            </Link>
                        </ListItemSecondaryAction>
                    </ListItem>
                
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
