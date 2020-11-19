import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

function DialogRemove({
  dialogRemoveOpen,
  handleClickRemoveCancel,
  handleClickRemoveConfirm,
}) {
  return (
    <Dialog
      open={dialogRemoveOpen}
      onClose={handleClickRemoveCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Confirm this action?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove the record?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickRemoveCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleClickRemoveConfirm}
          color="secondary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogRemove;
