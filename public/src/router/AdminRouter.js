import React, { Component, Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import {
	AppBar,
	Toolbar,
	Typography,
	CircularProgress
 } from '@material-ui/core';

const School = React.lazy( () => import('../components/Admin/screens/School'));
const Users = React.lazy( () => import('../components/Admin/screens/Users'));
const Department = React.lazy( () => import('../components/Admin/screens/Department'));
const Class = React.lazy( () => import('../components/Admin/screens/Class'));
import Login from '../components/Admin/screens/Login';
import MenuBar from '../components/Admin/MenuBar';

import QueryEngine from '../../Queries/Admin';

class AdminRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
            user: {},
            account: {},
			school: {},
			token: {},
			departmentKey:false,
			classKey:false,
        }
		this.selectDepartment=this.selectDepartment.bind(this)
		this.selectClass=this.selectClass.bind(this)
    }
    componentDidMount() {
        let _this = this
		// QueryEngine.checkSignedIn(function(res){
			// if(res.user){
			// 	let uid=res.user.uid;
			// 	_this.setState({
			// 		user: res.user,
			// 		isSignedIn: true,
			// 		acc: res.acc,
			// 		coArr: res.co,
			// 		co: res.co[0],
			// 		token: res.token
			// 	})
			// 	console.log(_this.state)
			// }else{
			// 	_this.setState({isSignedIn:false})
			// }
		// });
    }
	
	selectDepartment(departmentKey){
		this.setState({departmentKey})
	}
	selectClass(classKey){
		this.setState({classKey})
	}

    handleLoginState(pack){
		console.log('isCalled', pack)
		this.setState({
			// user: pack.user,
			// acc: pack.acc,
			// school: pack.school,
			// token: pack.token,
			...pack,
			isSignedIn: true
		})
    }

    handleLogout(){
        let _this = this;
		QueryEngine.signOut(function(res){
			if(res.pass){
				_this.setState({isSignedIn:false})
			}else{
				console.error(res.error)
			}
		});
    }

    render() {
		return (
			<Router>
				<div>
					{
						( this.state.isSignedIn ) ?
						<AppBar position="static" className="nav-bar">
							<Toolbar>
								<MenuBar user={this.state.user} account={this.state.account} school={this.state.school} handleLogout={this.handleLogout.bind(this)}></MenuBar>
								<Typography variant="h6" className="nav-title">
									<strong>app</strong><em>Admin</em>
								</Typography>
							</Toolbar>
						</AppBar>
						:
						<Redirect to={
							{pathname: "/admin/login"}
						}/>
					}

					<Suspense fallback={
						<div style={{
							width:'100%',
							height:'100vh'
						}}>
							<CircularProgress style={{
								margin:'40vh 50%'	
							}}/>
						</div>
					}>
					<Switch>

						<PrivateRoute exact path="/admin/users" isAuth={this.state.isSignedIn}>
							<Users 
								user={this.state.user}
								account={this.state.account}
								school={this.state.school}
								token={this.state.token}
							/>
						</PrivateRoute>

						<PrivateRoute exact path="/admin/department" isAuth={this.state.isSignedIn}>
							<Department 
								departmentKey={this.state.departmentKey}
								user={this.state.user}
								account={this.state.account}
								school={this.state.school}
								token={this.state.token}
							/>
						</PrivateRoute>
						<PrivateRoute exact path="/admin/class" isAuth={this.state.isSignedIn}>
							<Class 
								classKey={this.state.classKey}
								user={this.state.user}
								account={this.state.account}
								school={this.state.school}
								token={this.state.token}
							/>
						</PrivateRoute>

						<PrivateRoute exact path="/admin" isAuth={this.state.isSignedIn}>
							<School
								user={this.state.user}
								account={this.state.account}
								school={this.state.school}
								token={this.state.token}
								selectClass={this.selectClass.bind(this)}
								selectDepartment={this.selectDepartment.bind(this)}
							/>
						</PrivateRoute>
						
						<Route exact path="/admin/login">
							{
								(this.state.isSignedIn) ? 
								<Redirect
								to={{
									pathname: "/admin"
								}}
								/>
								:
								<Login handleLoginState={this.handleLoginState.bind(this)}></Login>
							}
						</Route>
					</Switch>
					</Suspense>
				</div>
			</Router>
        );
    }
}


function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
            rest.isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/admin/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default AdminRouter;