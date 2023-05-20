import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const AddExpenseForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {};
  return (
    <>
      <Button variant="outlined" onClick={() => handleOpen()}>
        Add Expense
      </Button>
      <Dialog open={open} onClose={() => handleClose()}>
        <div className="">
          <DialogTitle>Add Expense</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add an expense, please fill out the form below.
            </DialogContentText>

            <form onSubmit={handleSubmit}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                className="w-full mt-5"
              />
              <TextField
                id="amount"
                label="Amount"
                variant="outlined"
                className="w-full mt-5"
              />
              <TextField
                id="repeated"
                label="Repeated"
                variant="outlined"
                className="w-full mt-5"
              />
              <TextField
                id="frequency"
                label="Frequency"
                variant="outlined"
                className="w-full mt-5"
              />
            </form>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleClose}
            variant="contained"
            className="text-black hover:text-white">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AddExpenseForm };
