import React from 'react';
import { Link } from "react-router-dom";
import {
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	IconButton
} from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function ClassesList(props) {
	// props.data
	// props.handleSelectClass

	const ClassID = props.data.ClassID

	const handleSelectClass = event => {
		event.stopPropagation()
		props.handleSelectClass(ClassID)
	}
	
    return (
		<ListItem
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="delete"
					onClick={handleSelectClass}
					component={Link}
					to="/portal/suspensions/class"
				>
					<NavigateNextIcon />
				</IconButton>
			}
		>
			<ListItemAvatar>
				<Avatar>
					{props.data.RegistryID}
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={props.data.name}
				secondary={
					"Last Modified: " + new Date(props.data.lastModified).toLocaleString('en-SG', {
						timeZone: 'Asia/Singapore',
						hour: '2-digit',
						minute:'2-digit',
						second:'2-digit'
					})
				}
			/>
		</ListItem>
    )
}
