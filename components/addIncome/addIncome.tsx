import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const AddIncomeForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const amount = e.target.amount.value;
    const repeated = e.target.repeated.value;
    const frequency = e.target.frequency.value;
    console.log(name, amount, repeated, frequency);
    handleClose();
  };
  return (
    <>
      <Button variant="outlined" onClick={() => handleOpen()}>
        Add Income
      </Button>
      <Dialog open={open} onClose={() => handleClose()}>
        <div className="">
          <DialogTitle>Add Income</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add an income, please fill out the form below.
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
            onClick={handleSubmit}
            variant="contained"
            className="text-black hover:text-white">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AddIncomeForm };
