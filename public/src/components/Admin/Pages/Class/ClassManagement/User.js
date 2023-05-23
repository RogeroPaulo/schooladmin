import React from 'react';
import { Link } from "react-router-dom";
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	IconButton
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import QueryEngine from '../../../../../../Queries/Admin';

export default function ClassesList(props) {
	// props.ClassID
	// props.data
	// props.verification.user
	// props.verification.token
	// props.updateUserList

	const deleteUser = () => {
        QueryEngine.class_deleteUser(props.ClassID, props.data.UserID, props.verification.user, res => {
            props.updateUserList()
        }, props.verification.token)
    }
	const addUser = () => {
        QueryEngine.class_addUser(props.ClassID, props.data.UserID, props.verification.user, res => {
            props.updateUserList()
        }, props.verification.token)
    }
	
    return (
		<ListItem
            secondaryAction={
                props.data.isIn?
                <IconButton edge="end" aria-label="delete"
                    onClick={deleteUser}
                >
                    <DeleteIcon />
                </IconButton>
                :
                <IconButton edge="end" aria-label="add"
                onClick={addUser}
            >
                    <AddCircleIcon />
                </IconButton>
            }
            style={{
                background: props.data.isIn?"#c5e1a5":"#bdbdbd"
            }}
        >
            <ListItemAvatar>
                <Avatar>
                    {props.data.UserID}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.data.name + " | " + props.data.email}
                secondary={
                    "Last Modified: " + new Date(props.data.lastModified).toLocaleTimeString('en-SG', {
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
