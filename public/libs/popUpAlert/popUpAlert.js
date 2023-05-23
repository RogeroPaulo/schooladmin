import React from 'react';
import ReactDOM from "react-dom";

import {
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Divider
} from '@material-ui/core';

import PopUpDialog from './PopUpDialog';

const popUpAlert = {
	classes: {
        title: {
            paddingBottom: 0
        },
        hr: {
            marginBottom: 8
        },
        content: {
            paddingTop: 0,
            paddingBottom: 0,
        }
    },
   
    init: (title, content, type, handle, align) => {
        let str = popUpAlert.templates[type](title, content, align),
            id = 'popupalert-container' + new Date().getTime(),
            dom = (
                <PopUpDialog
                    id={id}
                    handle={handle?handle:null}
                    dom={str}
                    terminate={popUpAlert.terminate}
                />
            ),
            container = document.createElement('DIV')

        container.setAttribute('id', id)
        document.body.appendChild(container)
        let el = document.getElementById(id)
        ReactDOM.render(dom, el);
        
        // if(handle){
        //     let clicked = confirm(str)
        //     handle(clicked)
        // }else{
        //     alert(str)
        // }
        return id
    },

    terminate: (id) => {
        document.getElementById(id).remove()
    },

    templates: {

        error: (title, content) => {
            return (
                <React.Fragment>
                    <DialogTitle
                        id="responsive-dialog-title"
                        style={popUpAlert.classes.title}
                    >
                        <Typography variant='h5' gutterBottom>
                            Error!
                        </Typography>
                        <Divider style={popUpAlert.classes.hr}/>
                        <Typography variant='h6' gutterBottom>
                            {title}
                        </Typography>
                    </DialogTitle>
                    <DialogContent
                        style={popUpAlert.classes.content}
                    >
                        <DialogContentText>
                            Task failed due to:<br/>
                            {content} 
                        </DialogContentText>
                    </DialogContent>
                </React.Fragment>
            )
        },

        warning: (title, content) => {
            return (
                <React.Fragment>
                    <DialogTitle
                        id="responsive-dialog-title"
                        style={popUpAlert.classes.title}
                    >
                        <Typography variant='h5' gutterBottom>
                           Warning!
                        </Typography>
                        <Divider style={popUpAlert.classes.hr}/>
                        <Typography variant='h6' gutterBottom>
                            {title}
                        </Typography>
                    </DialogTitle>
                    <DialogContent
                        style={popUpAlert.classes.content}
                    >
                        <DialogContentText>
                            {content} 
                        </DialogContentText>
                    </DialogContent>
                </React.Fragment>
            )
        },

        success: (title, content) => {
            return (
                <React.Fragment>
                    <DialogTitle
                        id="responsive-dialog-title"
                        style={popUpAlert.classes.title}
                    >
                        <Typography variant='h5' gutterBottom>
                           Success!
                        </Typography>
                        <Divider style={popUpAlert.classes.hr}/>
                        <Typography variant='h6' gutterBottom>
                            {title}
                        </Typography>
                    </DialogTitle>
                    <DialogContent
                        style={popUpAlert.classes.content}
                    >
                        <DialogContentText>
                            {content} 
                        </DialogContentText>
                    </DialogContent>
                </React.Fragment>
            )
        },

        notification: (title, content, align) => {
            return (
                <React.Fragment>
                    <DialogTitle
                        id="responsive-dialog-title"
                        style={popUpAlert.classes.title}
                    >
                        <Typography variant='h6' style={{
                            textAlign: align?align:'left'
                        }} gutterBottom>
                            {title}
                        </Typography>
                    </DialogTitle>
                    <DialogContent
                        style={popUpAlert.classes.content}
                    >
                        <DialogContentText style={{
                            textAlign: align?align:'left'
                        }}>
                            {content} 
                        </DialogContentText>
                    </DialogContent>
                </React.Fragment>
            )
        }
    }


};

export default popUpAlert