import React from 'react';
import {
    Typography,
    Container
} from '@material-ui/core';
import ClassList from '../Pages/Department';

class School extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			departmentKey:props.departmentKey,
			user:props.user,
			account:props.account,
			school:props.school,
			token:props.token
        }
    }
	
    render() {
        console.log(this.props)
        return (
            <Container maxWidth="lg">
                <Typography variant="h5" component="h5">{this.state.school.name}</Typography>
                <ClassList
                    departmentKey={this.state.departmentKey}
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