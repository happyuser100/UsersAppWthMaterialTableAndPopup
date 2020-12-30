import React, { useState } from "react";
import { Dialog,  DialogTitle, DialogContent,  makeStyles, Typography, Button  } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const SimpleDialog = ({ title, openPopup, setOpenPopup, userPopupData}) => {

  const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
    },
    dialogTitle: {
      paddingRight: "0px",
    },
  }));

  const classes = useStyles();

  return (    

    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <br></br> 
          FirstName: {userPopupData.firstName} 
          <br></br>

          LastName: {userPopupData.lastName} 
          <br></br>

          <Button
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
    </Dialog>
  );
};

export default SimpleDialog;