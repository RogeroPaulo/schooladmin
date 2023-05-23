import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    TextField,
    Container
} from '@material-ui/core';

import QueryEngine from "../../../../Queries/Admin";


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            email: '',
            password: '',
            error:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.authUser = this.authUser.bind(this);
    }
    // componentDidMount() { // Please Delete
    //     let _this = this
    //     QueryEngine.AuthUser("admin1@yahoo.com.sg", "123456", res => {
    //     // QueryEngine.AuthUser("admin2@yahoo.com.sg", "123456", res => {
    //     // QueryEngine.AuthUser("teacher1@gmail.com", "123456", res => {
	// 		if(res.user){
    //             console.log(res)
    //             _this.props.handleLoginState(res)
	// 		}else{
	// 			_this.setState({error: res.error.message});
	// 		}
	// 	});
    // }

    authUser(){
        let _this = this;
		QueryEngine.AuthUser(this.state.email, this.state.password, res => {
			if(res.user){
                _this.props.handleLoginState(res)
			}else{
				_this.setState({error: res.error.message});
			}
		});
    }

    handleKeyDown(e) {
        let _this = this;
        if(e.keyCode === 13){
            _this.authUser()
        }
    }

    handleChange({target}) {
        let _state = {};
        _state[target.name] = target.value;
        this.setState(_state);
    }

    render() {
        return (
            <Container id="login" onKeyDown={this.handleKeyDown} bgcolor="background.paper">
                <Typography variant="h3" >
                    <span><strong>app</strong><em>admin</em></span>
                </Typography>
                <form style={{
                    width: '100%',
                    maxWidth: 480
                }}>
                    <CardContent className="card-login--content stacked">
                        <TextField id="tfEmail" className="card-login--input" label="E-mail" name="email" type="email" value={this.state.email} onChange={this.handleChange} required/>
                        <TextField id="tfPassword" className="card-login--input" label="Password" name="password" type="password" value={this.state.password} onChange={this.handleChange} required/>
                        {
                            this.state.error.length > 0 &&
                            <Typography variant="subtitle1" gutterBottom className="error-text">
                                {this.state.error}
                            </Typography>
                        }
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={this.authUser}>Login</Button>
                    </CardActions>

                </form>
            </Container>
        )
    }
}


export default Login