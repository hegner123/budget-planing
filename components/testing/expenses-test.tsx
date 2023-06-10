"use client";
import { useState } from "react";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { RepeatedDefaults } from "@budget/hooks/forecast/forecast";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useSession } from "@budget/hooks/auth/useSession";
import { useExpenses } from "@budget/hooks/expense/useExpense";

const TestExpenseForm = () => {
  const [name, setName] = useState<string>("");
  const [expense, setExpense] = useState<number>(0);
  const [repeated, setRepeated] = useState<string>("");
  const [date, setDate] = useState<any>(null);
  const { getSession } = useSession();
  const [user, setUser] = useState<any>(() => getSession());
  const { addExpense, expenseLog } = useExpenses();

  const handleClose = () => {
    resetForm();
  };

  const handleSubmit = () => {
    const formSubmit = {
      name: name,
      amount: expense,
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

  const handleRepeatChange = (event: SelectChangeEvent) => {
    setRepeated(event.target.value);
  };
  const resetForm = () => {
    setName("");
    setExpense(0);
    setRepeated("");
    setDate(null);
  };
  return (
    <Box className="grid grid-cols-12 bg-white col-span-full">
      <Box className="col-span-4 p-10 rounded">
        <form>
          <h3 className="text-2xl text-black">Add Expense</h3>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-5"
          />
          <TextField
            id="income"
            label="Income"
            variant="outlined"
            type="number"
            value={expense}
            onChange={(e: any) => setExpense(e.target.value)}
            className="w-full mt-5"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <FormControl className="mt-5" fullWidth>
            <InputLabel id="repeated-label">Repeated</InputLabel>
            <Select
              labelId="repeated-label"
              id="select-label"
              value={repeated}
              label="Repeated"
              onChange={handleRepeatChange}>
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
        <Box className="flex justify-end gap-2 mt-5">
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
        </Box>
      </Box>
      <Box className="col-span-8 p-10 rounded">
        <ul>
          <li className="text-black">Name: {name}</li>
          <li className="text-black">Expense: {expense}</li>
          <li className="text-black">Date: {JSON.stringify(date)}</li>
        </ul>
        <p className="text-black">Log: {expenseLog}</p>
      </Box>
    </Box>
  );
};

export { TestExpenseForm };
