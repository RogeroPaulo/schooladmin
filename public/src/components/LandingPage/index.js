import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
    Typography
} from '@material-ui/core';

import AdminLink from './AdminLink';
import PortalLink from './PortalLink';

const useStyles = makeStyles((theme) => ({
    grid:{
		background: '#efefef',
		flexGrow: 1,
	},
	list:{
        margin:"auto",
		padding:15,
        maxWidth:"720px",
		paddingBottom:"60.25px"
	},
	listItem:{
		width:"100%"
	}
}));

export default function EventCard(props) {
	const classes = useStyles()

	return (
        <React.Fragment>
            <Grid
                container
                spacing={3}
                className={classes.list}
                style={{
                    background: '#fff',
                    height: 70,
                    maxWidth:"100%",
                    padding: 0
                }}
            >
                <Typography
                    variant='h4'
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        margin: 'auto'
                    }}
                >
                    NodeJS API Assessment
                </Typography>
            </Grid>
            <div className={classes.grid}>
                <Grid container spacing={3} className={classes.list}>
                    <Grid item sm={12} className={classes.listItem}>
                        <Typography
                            variant='body1'
                            style={{
                                textAlign: 'justify'
                            }}
                            gutterBottom
                        >
                            Contrary to popular belief, Lorem Ipsum is not simply random text.
                            It has roots in a piece of classical Latin literature from 45 BC,
                            making it over 2000 years old. Richard McClintock, a Latin professor
                            at Hampden-Sydney College in Virginia, looked up one of the more
                            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
                            going through the cites of the word in classical literature, discovered
                            the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                            1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
                            Evil) by Cicero, written in 45 BC. This book is a treatise on the
                            theory of ethics, very popular during the Renaissance. The first line
                            of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                            section 1.10.32.
                        </Typography>
                    </Grid>
                    <Grid item sm={6} className={classes.listItem}>
                        <AdminLink />
                    </Grid>
                    <Grid item sm={6} className={classes.listItem}>
                        <PortalLink />
                    </Grid>
                    <Grid item sm={12} className={classes.listItem}>
                        <Typography variant='body1' gutterBottom>
                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                            below for those interested. Sections 1.10.32 and 1.10.33 from "de
                            Finibus Bonorum et Malorum" by Cicero are also reproduced in their
                            exact original form, accompanied by English versions from the 1914
                            translation by H. Rackham.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Grid
                container
                spacing={3}
                className={classes.list}
                style={{
                    background: '#fff',
                    height: 70,
                    maxWidth:"100%",
                    padding: 0
                }}
            >
                <Typography
                    variant='body2'
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        margin: 'auto'
                    }}
                >
                    Project by: Paulo Rogero
                </Typography>
            </Grid>
        </React.Fragment>
	)
}