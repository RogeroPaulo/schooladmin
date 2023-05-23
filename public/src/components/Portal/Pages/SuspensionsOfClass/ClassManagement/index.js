import React, {useState, useEffect} from 'react';
import {
    Card,
	Grid,
	
	CircularProgress,
    Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import QueryEngine from '../../../../../../Queries/Portal';

import UsersList from './UsersList';

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
		background: '#efefef'
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
	// props.data
	// props.user
	// props.account
	// props.school
	// props.token

	const classes=useStyles();
	const [users, setUsers] = useState(null);
	const [suspended, setSuspended] = useState(null);
	
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
        QueryEngine.teacher.req_usersFromClass(
            props.data.ClassID,
            props.user.UserID,
        res => {
            setUsers(res)
        }, props.token)
        QueryEngine.teacher.req_suspendedFromClass(
            props.data.ClassID,
            props.user.UserID,
        res => {
            setSuspended(res)
        }, props.token)
	}

    const updateUserList = () => {
        load_users()
    }

    const printClassManagement = () => {
        if(users && suspended){
            let test = {}
            suspended.forEach(i => {
                test[i.UserID] = true
            })
            let temp = users.map(user => {
                let obj = {
                    ...user
                }
                obj.isIn = (test[user.UserID] != undefined)
                return obj
            })
            return (
                <React.Fragment>
                    <Grid item sm={12} className={classes.listItem} style={{
                        padding: 16,
                        background: '#fff'
                    }}>
                        <Typography variant="body1">
                            {props.data.name}
                        </Typography>
                        {Object.keys(props.data).map(attr => {
                            if(
                                attr != 'name'
                            ){
                                return (
                                    <Typography variant="body2">
                                        {attr+": "+props.data[attr]}
                                    </Typography>
                                )
                            }
                        })}
                    </Grid>
                    <Grid item sm={12} className={classes.listItem}>
                        <UsersList
                            users={temp}
                            user={props.user}
                            data={props.data}
                            account={props.account}
                            school={props.school}
                            token={props.token}
                            updateUserList={updateUserList}
                        />
                    </Grid>
                    {/* <Grid item sm={12} className={classes.listItem}>
                        <pre>{JSON.stringify(users, null, 2)}</pre>
                    </Grid>
                    <Grid item sm={12} className={classes.listItem}>
                        <pre>{JSON.stringify(suspended, null, 2)}</pre>
                    </Grid> */}
                </React.Fragment>
            )
        }else{
            return (
                <Grid item sm={12} className={classes.listItem}>
                    {template_loading}
                </Grid>
            )
        }
    }
	
    return (
        <div className={classes.grid}>
			<Grid container className={classes.list}>
				{printClassManagement()}
			</Grid>
		</div>
    )
}
