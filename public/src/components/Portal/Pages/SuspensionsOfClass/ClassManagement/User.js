import React from 'react';
import { Link } from "react-router-dom";
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	IconButton
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';

import QueryEngine from '../../../../../../Queries/Admin';

export default function ClassesList(props) {
	// props.ClassID
	// props.data
	// props.verification.user
	// props.verification.token
	// props.updateUserList

	const deleteUser = () => {
        QueryEngine.suspend_deleteUser(props.ClassID, props.data.UserID, props.verification.user, res => {
            props.updateUserList()
        }, props.verification.token)
    }
	const addUser = () => {
        QueryEngine.suspend_addUser(props.ClassID, props.data.UserID, props.verification.user, res => {
            props.updateUserList()
        }, props.verification.token)
    }
	
    return (
		<ListItem
            secondaryAction={
                props.data.isIn?
                <IconButton edge="end" aria-label="delete"
                    onClick={deleteUser}
                    disabled={props.data.RoleFID < 3?true:false}
                >
                    <CheckIcon />
                </IconButton>
                :
                <IconButton edge="end" aria-label="add"
                    onClick={addUser}
                    disabled={props.data.RoleFID < 3?true:false}
                >
                    <BlockIcon />
                </IconButton>
            }
            style={{
                background: props.data.isIn?"#ffcdd2":"#fff"
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
