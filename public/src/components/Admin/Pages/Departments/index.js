import React from 'react';
import {
	Grid,
	Typography,
	List
} from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import Item from './Item';

const useStyles=makeStyles((theme)=>({
	
}));

export default function DepartmentsList(props) {
	// props.departments
	// props.user
	// props.account
	// props.school
	// props.token

	const classes=useStyles();
	
    return (
		<div style={{
			padding: 8
		}}>
			<Grid container style={{
				background: '#fff',
				padding: 16,
				borderRadius: 5
			}}>
				<Grid item xs={12}>
					<Typography variant='h5' gutterBottom>
						Departments
					</Typography>
					<Typography variant='h6'>
						Manage registered users
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<List>
						{
							props.departments.map(department => {
								return (
									<Item
										handleSelectDepartment={props.handleSelectDepartment}
										data={department}
									/>
								)
							})
						}
					</List>
				</Grid>
			</Grid>
        </div>
    )
}
