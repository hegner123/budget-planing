"use client";
import { useState, useEffect } from "react";
import { RepeatedDefaults } from "@budget/hooks/forecast/forecast";
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
import { useExpenses } from "@budget/hooks/expense/useExpense";
import { useSession } from "@budget/hooks/auth/useSession";

const AddExpenseForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<any>("");
  const [amount, setAmount] = useState<number>(0);
  const [repeated, setRepeated] = useState<string>("");
  const [date, setDate] = useState<any>(null);

  const { addExpense } = useExpenses();
  const [user, setUser] = useState<any>("");
  const { getSession } = useSession();
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
    const formSubmit = {
      name: name,
      amount: amount,
      repeated: repeated,
      date: date,
      user: user,
    };
    addExpense(formSubmit);
  };

  const handleSubmitAndClose = () => {
    handleSubmit();
    handleClose();
  };

  const handleSubmitAndReset = () => {
    handleSubmit();
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAmount(0);
    setRepeated("");
    setDate(null);
  };

  const handleRepeatChange = (newValue: any) => {
    setRepeated(newValue);
  };
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
                onChange={(e: any) => setAmount(e.target.value)}
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
                  {RepeatedDefaults.map((item, i) => (
                    <MenuItem value={item} key={`${item}${i}`}>
                      {item}
                    </MenuItem>
                  ))}
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
            onClick={handleSubmitAndClose}
            variant="contained"
            className="text-black hover:text-white bg-brand-dark-blue">
            Add
          </Button>
          <Button
            onClick={handleSubmitAndReset}
            variant="contained"
            className="text-black hover:text-white bg-brand-dark-blue">
            Add Another
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AddExpenseForm };
