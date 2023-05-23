import React from 'react';
import {
    Typography,
    Container
} from '@material-ui/core';
import Suspensions from '../Pages/Suspensions';

class School extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                <Suspensions
                    user={this.state.user}
                    account={this.state.account}
                    school={this.state.school}
                    token={this.state.token}
                    handleSelectClass={this.props.selectClass}
                />
            </Container>
        )
    }
}


export default School