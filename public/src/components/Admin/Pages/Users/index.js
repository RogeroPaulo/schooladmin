import React, {useState, useEffect} from 'react';
import {
    Card,
	Grid,
	
	CircularProgress
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import QueryEngine from '../../../../../Queries/Admin';

import UsersList from './UsersList';
import AddUser from './NewUserDialog';

const useStyles=makeStyles((theme)=>({
	loadingDiv:{
		height:"calc(50vh - (64px) - (20px + 3px))",
		border:"1px solid #eeeeee",
		textAlign:"center"
	},
	loading:{
		marginTop:"calc(25vh - 20px - 64px)"
	},
	grid:{
		background: '#efefef',
		flexGrow: 1,
	},
	list:{
        // margin:"auto",
		// padding:15,
		// paddingBottom:"60.25px"
	},
	listItem:{
		// width:"calc(100% - 30px)"
	}
}));

export default function Users(props) {
	// props.user
	// props.account
	// props.school
	// props.token

	const classes=useStyles();
	const [users, setUsers] = useState(null);
	
	useEffect(() => {
		load_users()
	},[]);

	const template_loading=(
		<Card className={classes.loadingDiv}>
			<div className={classes.loading}>
				<CircularProgress />
				<div>Loading...</div>
			</div>
        </Card>
	)

	const load_users = () => {
		if(props.user.RoleFID<2){
			QueryEngine.req_users_by_SchoolID(
				props.user.UserID,
				props.user.SchoolFID,
			res => {
				setUsers(res)
			}, props.token)
		}else{
			QueryEngine.teacher.req_usersSameClassAs_UserID(
				props.user.UserID,
			res => {
				setUsers(res)
			}, props.token)
		}
	}
	
    return (
        <div className={classes.grid}>
			<Grid container spacing={3} className={classes.list}>
				{
					users === null?
						<Grid item sm={12} className={classes.listItem}>
							{template_loading}
						</Grid>
						:
						users?
							<Grid item sm={12} className={classes.listItem}>
								<UsersList
									users={users}
									user={props.user}
									account={props.account}
									school={props.school}
									token={props.token}
								/>
							</Grid>
							:
							''
				}
				<Grid item sm={12} className={classes.listItem}>
					<AddUser
						SchoolFID={props.user.SchoolFID}
						user={props.user}
						token={props.token}
						load_users={load_users}
					/>
				</Grid>
			</Grid>
		</div>
    )
}
