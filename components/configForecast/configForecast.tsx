import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs, duration } from "dayjs";
import { useAtom } from "jotai";
import { configForecastAtom } from "@budget/store/state";

export const ConfigForecast = () => {
  const [forecastStart, setForecastStart] = useState<any>("");
  const [forecastUnit, setForecastUnit] = useState<any>("");
  const [forecastStartDate, setForecastStartDate] = useState<any>(null);
  const [, setConfigForecast] = useAtom(configForecastAtom);
  dayjs.extend(duration);

  function handleSubmit() {
    let forecastDuration = dayjs.duration(forecastStart, forecastUnit);
    const formFields = {
      forecastStart: forecastStartDate,
      forecastDuration: forecastDuration,
    };
    setConfigForecast(formFields);
  }

  const handleChange = (event: any) => {
    setForecastUnit(event.target.value);
  };
  return (
    <div className="grid grid-cols-12 gap-5">
      <TextField
        label="Forecast Length"
        value={forecastStart}
        onChange={(e) => setForecastStart(e.target.value)}
        type="number"
        className="col-span-6 mt-5"
      />
      <FormControl fullWidth className="col-span-6 mt-5">
        <InputLabel id="forecast-unit">Unit</InputLabel>
        <Select
          labelId="forecast-unit"
          value={forecastUnit}
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
          value={forecastStartDate}
          onChange={(newValue) => setForecastStartDate(newValue)}
          className="col-span-6 mt-5"
        />
      </LocalizationProvider>
      <Button
        className="col-span-6 w-fit"
        variant="contained"
        onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};
