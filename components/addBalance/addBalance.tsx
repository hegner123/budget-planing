import { useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputAdornment from "@mui/material/InputAdornment";
import {
  showNotificationAtom,
  notificationMessageAtom,
} from "@budget/store/state";
import { useAtom } from "jotai";
import { addBalance } from "@budget/supabaseTables";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
const AddBalanceForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [date, setDate] = useState<any>("");
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationMessage, setNotificationMessage] = useAtom(
    notificationMessageAtom
  );
  const supabase: any = useSupabaseClient();
  const user: any = useUser();
  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const message = `${name} ${amount} ${date}`;
    console.log(user.id);

    handleClose();
    addBalance({
      name: name,
      amount: amount,
      date: date,
      user: user.id,
      supabaseClient: supabase,
    }).then((data: any) => {
      setShowNotification(true);
      setNotificationMessage(JSON.stringify(data));
    });
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
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(
                    props: JSX.IntrinsicAttributes & TextFieldProps
                  ) => (
                    <TextField
                      {...props}
                      id="frequency"
                      label="Frequency"
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

export { AddBalanceForm };
