import React from 'react';
import { Link } from "react-router-dom";
import {
	Grid,
	Typography,
	List
} from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import Item from './Item';

const useStyles=makeStyles((theme)=>({
	
}));

export default function ClassesList(props) {
	// props.classesData
	// props.user
	// props.account
	// props.school
	// props.token
	
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
						Classes
					</Typography>
					<Typography variant='h6'>
						Manage registered users
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<List>
						{
							props.classesData.map(Class => {
								return (
									<Item
										handleSelectClass={props.handleSelectClass}
										data={Class}
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
