import React from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Icon,
    IconButton
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import AddHomeIcon from '@mui/icons-material/AddHome';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@material-ui/icons/Category';

const useStyles = makeStyles({
    list: {
        width: 275,
    },
    company_name: {
        textAlign: 'center',
    },
});

export default function SwipeableTemporaryDrawer(props) {

    const classes = useStyles();
    const [state, setState] = React.useState({
        drawerOpen: false
    });

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, ['drawerOpen']: open });
    };
	
	const print_company=function(){
		return (
			<ListItem className={classes.company_name}>
				<ListItemText primary={props.school.name} />
			</ListItem>
		)
	};

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Typography variant="h6" className="nav-title">
                
            </Typography>
            <List>
                <ListItem>
                        <ListItemText primary={<React.Fragment><strong>app</strong><em>Admin</em></React.Fragment>} />
                </ListItem>
				{
					print_company()
				}
				<Divider />
                {
                    props.user.RoleFID<2?
                    <React.Fragment>
                        <ListItem button key="sideBar_accounts" component={Link} to="/admin/accounts" >
                            <ListItemIcon><AccountTreeIcon/></ListItemIcon>
                            <ListItemText primary="Accounts" />
                        </ListItem>
                        <ListItem button key="sideBar_schools" component={Link} to="/admin/schools" >
                            <ListItemIcon><AddHomeIcon/></ListItemIcon>
                            <ListItemText primary="Schools" />
                        </ListItem>
                    </React.Fragment>
                    :
                    ''
                }
				<ListItem button key="sideBar_school" component={Link} to="/admin" >
					<ListItemIcon><SchoolIcon/></ListItemIcon>
					<ListItemText primary="School" />
				</ListItem>
				<ListItem button key="sideBar_users" component={Link} to="/admin/users" >
					<ListItemIcon><Icon>groups</Icon></ListItemIcon>
					<ListItemText primary="Users" />
				</ListItem>
                <ListItem button key={-1} onClick={props.handleLogout} dense={true}>
                        <ListItemText primary={'Logout'} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <Icon>menu</Icon>
                </IconButton>
                <SwipeableDrawer
                    anchor={'left'}
                    open={state['drawerOpen']}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}