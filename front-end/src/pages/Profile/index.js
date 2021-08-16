//import { TextField, Typography } from '@material-ui/core';
import React from 'react';
//import { AuthContext } from '../../components/context/AuthContext';
//import { formStyles } from '../../styles/formStyles';
import ProfileVisualization from '../../components/ProfileVisualization';

import './styles.css';

//const classes = formStyles();


function Profile(){
    return(
        <div className="profile-container">
            <ProfileVisualization/>
        </div>
    )
}

export default Profile;

