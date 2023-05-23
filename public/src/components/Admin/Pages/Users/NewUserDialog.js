import React from 'react';
import {
	Button,
	FormControl,
	InputLabel,
	Select,
	Menu,
	MenuItem,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Card,
	Icon,
	Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import QueryEngine from '../../../../../Queries/Admin';

const styles = theme => ({
	root: {
		// height: 390,
		border: "4px solid #a6e6a6",
		background: "#e2f7e2"
	},
	div:{
		textAlign:"center",
		// marginTop:"calc(50% - (40px / 2))"
	},
	text:{
		color:"rgb(76, 175, 80)"
	},
	formControl:{
		marginTop:"1em"
	}
});

class NewUserDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			roles:null,
			classes:null,
			token:props.token,
			form:{
				SchoolFID:props.SchoolFID
			},
			validation:{
				name:true,
				email:true,
				contact:true,
				password:true
			}
		};
		this.handleClickOpen = this.handleClickOpen.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.classChange = this.classChange.bind(this)
		this.roleChange = this.roleChange.bind(this)
	}

	handleClickOpen(){
		let _this=this
		let obj = {
			classes: null,
			roles: null
		}
		QueryEngine.req_classes(_this.props.user, classes => {
			_this.setState({classes})
			let temp = {..._this.state.form}
			console.log(_this.state.classes)
			temp.ClassFID = _this.state.classes[0].ClassID
			_this.setState({form: temp})

			obj.classes=classes
			_this.isComplete(obj)
		}, _this.state.token,)
		QueryEngine.req_roles(_this.props.user, roles => {
			_this.setState({roles})
			let temp = {..._this.state.form}
			console.log(_this.state.roles)
			temp.RoleFID = _this.state.roles[0].RoleID
			_this.setState({form: temp})

			obj.roles=roles
			_this.isComplete(obj)
		}, _this.state.token,)
	}
	isComplete=(obj)=>{
		if(
			obj.roles
			&& obj.classes
		){
			this.setState({open: true})
		}
	}

	handleClose(){
		let form={
			SchoolFID:this.props.SchoolFID
		}
		let validation={
			name:true,
			email:true,
			contact:true,
			password:true
		}
		this.setState({validation, form, open:false})
	}
	
	validate(form,handle){
		let email=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		let pass=true,count=0,obj={
			SchoolFID: form.SchoolFID
		}
		
		if(	form.name!=undefined
			&& form.name.length>0){
			obj.name=form.name
		}else{
			count++
			obj.name=false
		}
		
		if(	form.email!=undefined
			&& email.test(form.email)){
			obj.email=form.email
		}else{
			count++
			obj.email=false
		}
		
		if(	form.contact!=undefined
			&& form.contact.length>7
			&& parseInt(form.contact, 10)>9999999){
			obj.contact=form.contact
		}else{
			count++
			obj.contact=false
		}
		
		if(	form.password!=undefined
			&& form.password===form.verify_password
			&& form.password.length>3){
			obj.password=form.password
		}else{
			count++
			obj.password=false
		}
		
		if(	form.ClassFID!=undefined ){
			obj.ClassFID=form.ClassFID
		}else{
			count++
			obj.ClassFID=false
		}
		if(	form.RoleFID!=undefined ){
			obj.RoleFID=form.RoleFID
		}else{
			count++
			obj.RoleFID=false
		}
		
		if(count>0){
			pass=false;
		}
		let res={
			pass:pass,
			form:obj
		}
		handle(res)
	}
	
	handleAdd(){
		let _this=this
		let form={..._this.state.form}
		_this.validate(form,function(res){
			let validation=res.form
			_this.setState({validation})
			
			if(res.pass){
				QueryEngine.admin_add_user(res.form, result =>{
					if(result.error){
						_this.setState({error: result.error.sqlMessage})
					}else{
						_this.handleClose()
						_this.props.load_users()
					}
				}, _this.state.token,);
			}
		});
	}

	handleChange({target}){
		let _this=this
		
		let form = _this.state.form
		form[target.name]=target.value
		_this.setState({form})
		
		_this.validate(form,function(res){
			let validation=res.form
			_this.setState({validation})
		});
	}
	
	classChange(event){
		let form = this.state.form
		form.ClassFID=event.target.value
		this.setState({form})
	}
	roleChange(event){
		let form = this.state.form
		form.RoleFID=event.target.value
		this.setState({form})
	}

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Card className={classes.root} onClick={this.handleClickOpen}>
					<div className={classes.div}>
						<Icon 
							style={{ fontSize: 40 }}
							className={classes.text}
						>
							add
						</Icon>
						<Typography>
							<strong className={classes.text}>Add A User</strong>
						</Typography>
					</div>
				</Card>
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Add New User</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							id="user_inputName"
							margin="dense"
							name="name"
							label="User Name"
							type="text"
							fullWidth
							required
							onChange={this.handleChange}
							error={!this.state.validation.name}
						/>
						<TextField
							id="user_inputContact"
							margin="dense"
							name="contact"
							label="User Contact"
							type="text"
							fullWidth
							required
							onChange={this.handleChange}
							error={!this.state.validation.contact}
						/>
						<TextField
							id="user_inputEmail"
							margin="dense"
							name="email"
							label="User Email Address"
							type="text"
							fullWidth
							required
							onChange={this.handleChange}
							error={!this.state.validation.email}
						/>
						<TextField
							id="user_inputPassword"
							margin="dense"
							name="password"
							label="Password"
							type="password"
							fullWidth
							required
							onChange={this.handleChange}
							error={!this.state.validation.password}
						/>
						<TextField
							id="user_inputVerifyPassword"
							margin="dense"
							name="verify_password"
							label="Verify Password"
							type="password"
							fullWidth
							required
							onChange={this.handleChange}
							error={!this.state.validation.password}
						/>

						{
							this.state.classes?
							<FormControl required className={classes.formControl}>
								<InputLabel id="class_labelType">Class</InputLabel>
								<Select
									labelId="class_labelType"
									id="class_labelType"
									value={this.state.form.ClassFID}
									onChange={this.classChange}
								>
									{
										this.state.classes.map( (classObj) => {
											return (
												<MenuItem value={classObj.ClassID}>
													{classObj.name}
												</MenuItem>
											)
										})
									}
								</Select>
							</FormControl>
							:
							''
						}
						{
							this.state.roles?
							<FormControl required className={classes.formControl}>
								<InputLabel id="role_labelType">Role</InputLabel>
								<Select
									labelId="role_labelType"
									id="role_inputType"
									value={this.state.form.RoleFID}
									onChange={this.roleChange}
								>
									{
										this.state.roles.map( (role) => {
											return (
												<MenuItem value={role.RoleID}>
													{role.name}
												</MenuItem>
											)
										})
									}
								</Select>
							</FormControl>
							:
							''
						}
						{
							this.state.error?
							<Typography variant="subtitle1" gutterBottom className="error-text">
                                {this.state.error}
                            </Typography>
							:
							''
						}

					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleAdd} variant="contained" color="primary">
							Add
						</Button>
					</DialogActions>	
				</Dialog>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(NewUserDialog);