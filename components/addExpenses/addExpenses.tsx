import { useState } from "react";
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
import { useUser } from "@supabase/auth-helpers-react";
import {
  showNotificationAtom,
  notificationMessageAtom,
} from "@budget/store/state";
import { useAtom } from "jotai";
import { useExpenses } from "@budget/hooks/expenses/useExpenses";
const AddExpenseForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<any>("");
  const [amount, setAmount] = useState<any>("");
  const [repeated, setRepeated] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<any>("default");
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [, setNotificationMessage] = useAtom(notificationMessageAtom);
  const { addExpense } = useExpenses();
  const user: any = useUser();
  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let expenseDate: any = `${frequency.$M + 1}/${frequency.$D}/${
      frequency.$y
    }`;
    if (repeated === false) {
      expenseDate = null;
    }
    const formSubmit = {
      name: name,
      amount: amount,
      repeated: repeated,
      repeated_date: expenseDate,
      user: user.id,
    };
    addExpense(formSubmit);
    handleClose();
  };

  const handleRepeatChange = (newValue: any) => {
    setShowNotification(true);
    setNotificationMessage(newValue);
    if (newValue === "true") {
      setRepeated(true);
    } else {
      setRepeated(false);
    }
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
                  value={frequency}
                  onChange={(newValue) => setFrequency(newValue)}
                  renderInput={(
                    props: JSX.IntrinsicAttributes & TextFieldProps
                  ) => (
                    <TextField
                      {...props}
                      id="date"
                      label="Date"
                      className="w-full mt-5"
                    />
                  )}
                />
              </LocalizationProvider>
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

export { AddExpenseForm };
