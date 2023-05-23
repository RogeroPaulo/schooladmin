import React from 'react';
import {
	Grid,
	List
} from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import User from './User';

const sortArr = require('../../../../../../libs/sortArr');

const useStyles=makeStyles((theme)=>({
	
}));

export default function UsersList(props) {
	// props.users
	// props.user
	// props.data (class)
	// props.account
	// props.school
	// props.token

	const classes=useStyles();
	
    // return (
	// 	<pre>
	// 		{JSON.stringify(props.users, null, 2)}
	// 	</pre>
    // )
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<List>
					{
						sortArr.init(props.users, 'asc', 'UserID').map(user => {
							return (
								<User
									ClassID={props.data.ClassID}
									data={user}
									verification={{
										user: props.user,
										token: props.token
									}}
									updateUserList={props.updateUserList}
								/>
							)
						})
					}
				</List>
			</Grid>
        </Grid>
	)
}
