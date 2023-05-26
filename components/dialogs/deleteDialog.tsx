import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
const DeleteDialog = ({ open, close }: { open: any; close: any }) => {
  function confirmDelete() {
    console.log("delete");
  }
  return (
    <>
      <Dialog onClose={close} open={open}>
        <DialogTitle>Delete</DialogTitle>

        <List sx={{ pt: 0, px: "2rem" }}>
          <ListItem disableGutters>
            <ListItemButton onClick={close}>Cancel</ListItemButton>
            <ListItemButton
              onClick={() => confirmDelete()}
              sx={{ border: "2px solid red" }}>
              Delete
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
