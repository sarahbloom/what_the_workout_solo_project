import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui/Card';
import { Typography } from 'material-ui';

import './WorkoutDetail.css'

class WorkoutDetailItem extends Component{

    render (){

        return (
            // <li key={this.props.exerciseItem.name}>
            <Card key={this.props.exerciseItem.name} style={{ maxWidth: "350px", backgroundColor: '#7953d2' }} className="workoutDetailClass" >
                <CardContent >
                    <Typography variant="headline" component="h4">
                        <strong>Name:</strong> {this.props.exerciseItem.name} 
                    </Typography>
                    <Typography >
                        <strong>Sets:</strong> {this.props.exerciseItem.default_sets}<br/>
                        <strong>Repetitions:</strong> {this.props.exerciseItem.default_reps} <br />
                        <strong>Resistance:</strong> {this.props.exerciseItem.default_weight}<br />
                    </Typography>
                </CardContent >
                </Card>
            /* </li> */
        )
    }//end render
}//end class

const mapStateToProps = state => ({
    user: state.user,
    workoutDetailList: state.workoutDetailList
});

export default connect(mapStateToProps)(WorkoutDetailItem);