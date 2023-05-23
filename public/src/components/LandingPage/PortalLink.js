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

import SchoolIcon from '@mui/icons-material/School';

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
				avatar='S'
				title='Spice App'
				subheader='School Portal'
			/>
			<CardMedia
				className={classes.media}
				image='https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60'
			/>
			<CardContent>
				<Typography variant="body1" component="p">
					School Portal
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					Pellentesque malesuada odio sit amet orci malesuada, vehicula pharetra quam tincidunt.
				</Typography>
			</CardContent>
			<CardActions className={classes.buttonDiv}>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					endIcon={<SchoolIcon />}
					onClick={() => {
						window.location.href = window.location.protocol+"//"+window.location.host+'/portal'
					}}
				>
					Login
				</Button>
			</CardActions>
		</Card>
	)
}