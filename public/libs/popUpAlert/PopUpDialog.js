import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { useTheme } from '@material-ui/core/styles';

export default function ResponsiveDialog(props) {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();

    const handleClose = () => {
        setOpen(false)
        props.terminate(props.id)
    };

    const handleYes = () => {
        props.handle(true)
        handleClose()
    }

    const handleNo = () => {
        props.handle(false)
        handleClose()
    }

    const confirm = (
        <React.Fragment>
            <Button autoFocus onClick={handleNo} color="secondary">
                Close
            </Button>
            <Button onClick={handleYes} color="primary" autoFocus>
                Okay
            </Button>
        </React.Fragment>
    )
    const alert = (
        <React.Fragment>
            <Button id={props.id+'_closeButton'} autoFocus onClick={handleClose} color="primary">
                Close
            </Button>
        </React.Fragment>
    )

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                fullWidth={true}
                maxWidth={'sm'}
            >
                {props.dom}
                <DialogActions>
                    {
                        props.handle?
                        confirm
                        :
                        alert
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
