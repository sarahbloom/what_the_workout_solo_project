import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import { Edit } from 'material-ui-icons';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router-dom';

import Nav from '../Nav/Nav';
import WorkoutDetailItem from '../WorkoutDetail/WorkoutDetailItem';

class CreateWorkout extends Component{
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
    
    render(){
        

        return(
            <div>
                <Nav />
                <h2> Create Your Workout! </h2>
                {/* <div style={{ maxWidth: "350px" }} className="editExerciseClass">
                    <List> */}
                        {/* {this.props.workoutDetailList.map(editExercise => (
                            <ListItem
                            key={editExercise.name}
                                role={undefined}
                                dense
                                button
                            onClick={this.handleToggle(editExercise)}
                            >
                                <Checkbox
                                checked={this.state.checked.indexOf(editExercise) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            <ListItemText primary={<editExercise.name  />} />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <Edit />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div> */}

                <Link to="/startworkout">
                    <button variant="raised" color="primary" > Start Workout! </button>
                </Link>
            </div>
        )
    }//end render
}//end class

const mapStateToProps = state => ({
    user: state.user,
    state
});

export default connect(mapStateToProps)(CreateWorkout);
