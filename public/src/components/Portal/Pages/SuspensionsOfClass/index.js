import React, {useState, useEffect} from 'react';
import {
    Card,
	Grid,
	
	CircularProgress,
	Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import QueryEngine from '../../../../../Queries/Admin';

import ClassManagement from './ClassManagement'

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

export default function School(props) {
	// props.classKey
	// props.user
	// props.account
	// props.school
	// props.token

	const classes=useStyles();
	const [ClassObj, setClassObj] = useState(null);
	
	useEffect(() => {
		load_class()
	},[]);

	const template_loading=(
		<Card className={classes.loadingDiv}>
			<div className={classes.loading}>
				<CircularProgress />
				<div>Loading...</div>
			</div>
        </Card>
	)

	const load_class = () => {
		QueryEngine.req_class(
			props.classKey,
		res => {
			setClassObj(res)
		}, props.token)
	}
	
    return (
        <div className={classes.grid}>
			<Grid container spacing={3} className={classes.list}>
				<Grid item sm={12} className={classes.listItem}>
					<Typography variant='body1' gutterBottom>
						Suspended Students:
					</Typography>
				</Grid>
				<Grid item sm={12} className={classes.listItem}>
					{
						ClassObj?
						<ClassManagement
							data={ClassObj}
							user={props.user}
							account={props.account}
							school={props.school}
							token={props.token}
						/>
						:
						template_loading
					}
				</Grid>
			</Grid>
		</div>
    )
}
