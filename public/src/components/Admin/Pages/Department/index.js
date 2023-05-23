import React, {useState, useEffect} from 'react';
import {
    Card,
	Grid,
	
	CircularProgress
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import QueryEngine from '../../../../../Queries/Admin';

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
	// props.departmentKey
	// props.user
	// props.account
	// props.school
	// props.token

	const classes=useStyles();
	const [Departments, setDepartments] = useState(null);
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
		if(props.user.RoleFID<2){
			QueryEngine.req_departments_by_UserID(
				props.user.UserID,
			res => {
				setDepartments(res)
			}, props.token)
		}else{
			setDepartments(false)
		}
		
		QueryEngine.req_classes_by_UserID(
			props.user.UserID,
		res => {
			setClasses(res)
		}, props.token)
	}
	
    return (
        // <div className={classes.grid}>
		// 	<Grid container spacing={3} className={classes.list}>
		// 		{
		// 			Departments === null?
		// 				<Grid item sm={6} className={classes.listItem}>
		// 					{template_loading}
		// 				</Grid>
		// 				:
		// 				Departments?
		// 					<Grid item sm={6} className={classes.listItem}>
		// 						<DepartmentsList
		// 							departments={Departments}
		// 							user={props.user}
		// 							account={props.account}
		// 							school={props.school}
		// 							token={props.token}
		// 						/>
		// 					</Grid>
		// 					:
		// 					''
		// 		}
		// 		<Grid item sm={Departments===null?6:Departments?6:12} className={classes.listItem}>
		// 			{
		// 				Classes?
		// 				<ClassesList
		// 					classesData={Classes}
		// 					user={props.user}
		// 					account={props.account}
		// 					school={props.school}
		// 					token={props.token}
		// 					handleSelectClass={props.handleSelectClass}
		// 				/>
		// 				:
		// 				template_loading
		// 			}
		// 		</Grid>
		// 	</Grid>
		// </div>
		<pre>{JSON.stringify(props, null, 2)}</pre>
    )
}
