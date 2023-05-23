import React from 'react';
import {
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	IconButton
} from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles=makeStyles((theme)=>({
	
}));

export default function UsersList(props) {
	// props.users
	// props.user
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
						props.users.map(user => {
							return (
								<ListItem
									secondaryAction={
										<IconButton edge="end" aria-label="delete">
											<DeleteIcon />
										</IconButton>
									}
								>
									<ListItemAvatar>
										<Avatar>
											{user.UserID}
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={user.name + " | " + user.email}
										secondary={
											"Last Modified: " + new Date(user.lastModified).toLocaleTimeString('en-SG', {
												timeZone: 'Asia/Singapore',
												hour: '2-digit',
												minute:'2-digit',
												second:'2-digit'
											})
										}
									/>
								</ListItem>
							)
						})
					}
				</List>
			</Grid>
        </Grid>
	)
}
