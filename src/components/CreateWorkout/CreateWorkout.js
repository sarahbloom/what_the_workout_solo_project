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

    componentDidMount() {
        this.props.dispatch({
            type: "GET_WORKOUT"
        });
    }
    
    render(){
        

        return(
            <div>
                <Nav />
                <h2> Create Your Workout! </h2>

                TODO: Determine how want to display this
                {/* <select className="exerciseTypeDropDown">
                    <option value="">Exercise Type:</option>
                    <option value="lower body">Lower Body</option>
                    <option value="upper body">Upper Body</option>
                </select> */}
                <div style={{ maxWidth: "350px" }} className="editExerciseClass">
                    <List>
                        {[0, 1, 2, 3].map(value => (
                            <ListItem
                                key={value}
                                role={undefined}
                                dense
                                button
                                onClick={this.handleToggle(value)}
                            >
                                <Checkbox
                                    checked={this.state.checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={`Line item ${value + 1}`} />
                                <ListItemSecondaryAction>
                                    <IconButton >
                                        <Edit />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
                //THIS will post to DB - workout
                <Link to="/startworkout">
                    <Button variant="raised" color="primary" > Start Workout! </Button>
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
