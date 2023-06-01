"use client";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useIncome } from "@budget/hooks/income/useIncome";
import { showNotificationMessageAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import { useSession } from "@budget/hooks/auth/useSession";
const AddIncomeForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<any>("");
  const [amount, setAmount] = useState<any>("");
  const [repeated, setRepeated] = useState<boolean>(false);
  const [date, setDate] = useState<any>(null);

  const [, setNotificationMessage] = useAtom(showNotificationMessageAtom);
  const { addIncomeSubmit } = useIncome();
  const { user } = useSession();
  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = () => {
    const formSubmit = {
      name: name,
      amount: amount,
      repeated: repeated,
      date: date,
      user: user,
    };
    addIncomeSubmit(formSubmit);
    handleClose();
  };

  const handleRepeatChange = (newValue: any) => {
    if (newValue === "true") {
      setRepeated(true);
    } else {
      setRepeated(false);
    }
  };
  const resetForm = () => {
    setName("");
    setAmount("");
    setRepeated(false);
    setDate(null);
  };
  return (
    <>
      <Button variant="outlined" onClick={() => handleOpen()}>
        Add Income
      </Button>
      <Dialog open={open} onClose={() => handleClose()}>
        <div className="max-w-md">
          <DialogTitle>Add Income</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add an income, please fill out the form below.
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

              <FormControl className="mt-5" fullWidth>
                <InputLabel id="repeated-label">Repeated</InputLabel>
                <Select
                  labelId="repeated-label"
                  id="select-label"
                  value={repeated}
                  label="Repeated"
                  onChange={(e) => handleRepeatChange(e.target.value)}>
                  <MenuItem value={"false"}>False</MenuItem>
                  <MenuItem value={"true"}>True</MenuItem>
                </Select>
              </FormControl>

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
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            className="text-black hover:text-white bg-brand-dark-blue">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AddIncomeForm };
