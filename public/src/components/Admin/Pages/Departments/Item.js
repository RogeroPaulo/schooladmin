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

import GroupsIcon from '@mui/icons-material/Groups';

export default function ClassesList(props) {
	// props.data
	// props.handleSelectDepartment

	const DepartmentID = props.data.DepartmentID

	const handleSelectDepartment = event => {
		event.stopPropagation()
		props.handleSelectDepartment(DepartmentID)
	}
	
    return (
		<ListItem
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="delete"
					onClick={handleSelectDepartment}
					component={Link}
					to="/admin/department"
				>
					<GroupsIcon />
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
