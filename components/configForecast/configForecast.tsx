"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForecastLength } from "@budget/hooks/forecast/useForecastLength";
import { useAtom } from "jotai";
import {
  configForecastDurationAtom,
  configForecastStartAtom,
} from "@budget/store/state";

export const ConfigForecast = ({ getData }: any) => {
  const {
    setLength,
    setUnit,
    setStartDate,
    length,
    unit,
    startDate,
    forecastDuration,
  } = useForecastLength();
  const [, setForecastLength] = useAtom(configForecastDurationAtom);
  const [, setForecastStart] = useAtom(configForecastStartAtom);
  const [start, setStart] = useState("");
  const router = useRouter();

  function handleChange(event: SelectChangeEvent) {
    setUnit(event.target.value);
  }

  function handleSubmit() {
    setForecastLength(forecastDuration);
    setForecastStart(startDate);
    getData();
  }

  return (
    <form className="grid grid-cols-12 gap-5">
      <TextField
        label="Forecast Length"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        type="number"
        className="col-span-6 mt-5"
      />
      <FormControl fullWidth className="col-span-6 mt-5">
        <InputLabel id="forecast-unit">Unit</InputLabel>
        <Select
          labelId="forecast-unit"
          value={unit}
          label="Unit"
          onChange={handleChange}>
          <MenuItem value={"days"}>Days</MenuItem>
          <MenuItem value={"months"}>Months</MenuItem>
          <MenuItem value={"years"}>Years</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Forecast Start Date"
          value={startDate}
          onChange={(newValue) => startDate(newValue)}
          className="col-span-6 mt-5"
        />
      </LocalizationProvider>
      <Button
        onClick={() => handleSubmit()}
        variant="contained"
        className="text-black bg-[#1976d2] border-[#1976d2] hover:text-white hover:bg-black hover:border-white border-solid border-2 col-span-4 h-fit w-fit self-center col-start-1">
        Submit
      </Button>
    </form>
  );
};
