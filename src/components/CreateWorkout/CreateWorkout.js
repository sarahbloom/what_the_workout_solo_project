import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Nav from '../Nav/Nav';
import CreateWorkoutItem from './CreateWorkoutItem'

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
            type: 'GET_EXERCISE'
        });
    }
    
    render(){
        let ExerciseList = this.props.createWorkoutExerciseList.map(exercise =>{
            return (
                < CreateWorkoutItem key={exercise.name} exercise={exercise} /> 
            )  
            
        })

        return(
            <div>
                <Nav />
                <h2> Create Your Workout! </h2>

                {/* TODO: Determine how want to display this */}
                {/* <select className="exerciseTypeDropDown">
                    <option value="">Exercise Type:</option>
                    <option value="lower body">Lower Body</option>
                    <option value="upper body">Upper Body</option>
                </select> */}
                {ExerciseList}
                {/* THIS will post to DB - workout */}
                <Link to="/startworkout">
                    <Button variant="raised" color="primary" > Start Workout! </Button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    createWorkoutExerciseList: state.createWorkoutExerciseList
});

export default connect(mapStateToProps)(CreateWorkout);
