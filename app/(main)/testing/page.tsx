"use client";
import { TestIncomeForm } from "@budget/components/testing/income-test";
import { TestExpenseForm } from "@budget/components/testing/expenses-test";
import { TestBalanceForm } from "@budget/components/testing/balances-test";
import { useSubscribe } from "@budget/hooks/subscribe/useSubscribe";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { FormControl, InputLabel, Box } from "@mui/material";

export default function TestPage() {
  const [selected, setSelected] = useState<string>("income");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };
  return (
    <div className="grid grid-cols-12 gap-2 p-5">
      <Box className="p-10 bg-white col-span-full">
        <FormControl className="col-span-3 bg-slate-200">
          <InputLabel id="repeated-label">Test Form</InputLabel>
          <Select
            labelId="repeated-label"
            id="select-label"
            value={selected}
            label="Repeated"
            onChange={handleChange}>
            <MenuItem value={"income"}>Income</MenuItem>
            <MenuItem value={"expense"}>Expense</MenuItem>
            <MenuItem value={"balance"}>Balance</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {selected === "income" && <TestIncomeForm />}
      {selected === "expense" && <TestExpenseForm />}
      {selected === "balance" && <TestBalanceForm />}
    </div>
  );
}
