import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useUser } from "@supabase/auth-helpers-react";
const AddIncomeForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<any>("");
  const [amount, setAmount] = useState<any>("");
  const [repeated, setRepeated] = useState<any>("");
  const [frequency, setFrequency] = useState<any>("");
  const user: any = useUser();
  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const formSubmit = {
      name: name,
      amount: amount,
      repeated: repeated,
      repeated_date: frequency,
      user: user.id,
    };
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-5"
              />
              <TextField
                id="amount"
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-5"
              />
              <TextField
                id="repeated"
                label="Repeated"
                variant="outlined"
                value={repeated}
                onChange={(e) => setRepeated(e.target.value)}
                className="w-full mt-5"
              />
              <TextField
                id="frequency"
                label="Frequency"
                variant="outlined"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full mt-5"
              />
            </form>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleSubmit()}
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
