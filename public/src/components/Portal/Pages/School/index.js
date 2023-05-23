import React, {useState, useEffect} from 'react';
import {
    Card,
	Grid,
	
	CircularProgress
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import QueryEngine from '../../../../../Queries/Admin';

import ClassesList from '../Classes';

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
		margin: 16,
		width: "calc(100% - 32px)",
		borderRadius: 8
		// flexGrow: 1,
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
	// props.user
	// props.account
	// props.school
	// props.token

	const classes=useStyles();
	const [Classes, setClasses] = useState(null);
	
	useEffect(() => {
		load_school()
	},[]);

	const template_loading=(
		<Card className={classes.loadingDiv}>
			<div className={classes.loading}>
				<CircularProgress />
				<div>Loading...</div>
			</div>
        </Card>
	)

	const load_school = () => {
		QueryEngine.req_classes_by_UserID(props.user.UserID, res => {
			setClasses(res)
		}, props.token)
	}
	
    return (
        <div className={classes.grid}>
			<Grid container className={classes.list}>
				<Grid item sm={12} className={classes.listItem}>
					{
						Classes?
						<ClassesList
							classesData={Classes}
							user={props.user}
							account={props.account}
							school={props.school}
							token={props.token}
							handleSelectClass={props.handleSelectClass}
						/>
						:
						template_loading
					}
				</Grid>
			</Grid>
		</div>
    )
}
