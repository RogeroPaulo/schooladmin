import React from 'react';
import {
    Typography,
    Container
} from '@material-ui/core';
import ClassList from '../Pages/SuspensionsOfClass';

class School extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			classKey:props.classKey,
			user:props.user,
			account:props.account,
			school:props.school,
			token:props.token
        }
    }
	
    render() {
        return (
            <Container maxWidth="lg">
                <Typography variant="h5" component="h5">{this.state.school.name}</Typography>
                <ClassList
                    classKey={this.state.classKey}
                    user={this.state.user}
                    account={this.state.account}
                    school={this.state.school}
                    token={this.state.token}
                />
            </Container>
        )
    }
}


export default School