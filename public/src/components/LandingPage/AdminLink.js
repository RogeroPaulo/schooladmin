import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardMedia,
	CardHeader,
	CardContent,
	CardActions,
	Button,
	Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	buttonDiv: {
		padding: 15
	},
	button: {
		marginLeft: 'auto'
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function EventCard(props) {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar='A'
				title='Teachers'
				subheader='Admin Portal'
			/>
			<CardMedia
				className={classes.media}
				image='https://images.unsplash.com/photo-1474377207190-a7d8b3334068?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
			/>
			<CardContent>
				<Typography variant="body1" component="p">
					Admin Portal
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
				</Typography>
			</CardContent>
			<CardActions className={classes.buttonDiv}>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					endIcon={<AdminPanelSettingsIcon />}
					onClick={() => {
						window.location.href = window.location.protocol+"//"+window.location.host+'/admin'
					}}
				>
					Manage
				</Button>
			</CardActions>
		</Card>
	)
}