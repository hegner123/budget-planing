"use client";
import { useEffect, useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import SubmitButtons from "../forms/submit";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useBalance } from "@budget/hooks/balance/useBalance";
import useSession from "@budget/hooks/auth/useSession";

const AddBalanceForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [date, setDate] = useState<any>(null);
  const [user, setUser] = useState<any>("");
  const { getSession } = useSession();
  const { addBalance } = useBalance();

  useEffect(() => {
    getSession().then((res) => {
      setUser(res.data.session.user.id);
    });
  }, [getSession]);

  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const handleSubmit = () => {
    addBalance({
      name: name,
      amount: amount,
      date: date,
      user: user,
    });
  };

  const handleSubmitAndAddMore = () => {
    handleSubmit();
    resetForm();
  };

  const handleSubmitAndClose = () => {
    handleSubmit();
    handleClose();
  };

  const resetForm = () => {
    setName("");
    setAmount("");
    setDate(null);
  };
  return (
    <>
      <Button variant="outlined" onClick={() => handleOpen()}>
        Add Balance
      </Button>
      <Dialog open={open} onClose={() => handleClose()}>
        <div className="">
          <DialogTitle>Add Balance</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a balance, please fill out the form below.
            </DialogContentText>
            <form>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-5"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  className="w-full mt-5"
                />
              </LocalizationProvider>
            </form>
          </DialogContent>
        </div>
        <SubmitButtons
          cancel={handleClose}
          add={handleSubmitAndClose}
          addMore={handleSubmitAndAddMore}
        />
      </Dialog>
    </>
  );
};

export { AddBalanceForm };
