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
    state = {
        checked: [0],
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    render() {
        
            let content = (
            <div  className="editExerciseClass">
                    <ListItem
                        style={{ maxWidth: "350px" }}
                        key={this.props.exercise.name}
                        dense
                        button
                        onClick={this.handleToggle(this.props.exercise.name)}
                    >
                        <Checkbox
                        checked={this.state.checked.indexOf(this.props.exercise.name) !== -1}
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
