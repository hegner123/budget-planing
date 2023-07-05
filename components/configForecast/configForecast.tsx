"use client";
import { useCallback } from "react";
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
import { useForecastBudget } from "@budget/hooks/forecast/useForecast";
import { useAtom } from "jotai";
import {
  configForecastDurationAtom,
  configForecastStartAtom,
  forecastListAtom,
} from "@budget/store/state";
import { useSnackbar } from "notistack";

export const ConfigForecast = ({ getData, compiledData }: any) => {
  const {
    setLength,
    setUnit,
    setStartDate,
    length,
    unit,
    startDate,
    forecastDuration,
  } = useForecastLength();
  const { forecastBudget } = useForecastBudget();
  const [, setForecastLength] = useAtom(configForecastDurationAtom);
  const [, setForecastStart] = useAtom(configForecastStartAtom);
  const [, setForecastList] = useAtom(forecastListAtom);

  const { enqueueSnackbar } = useSnackbar();

  const forecastData = useCallback(
    (forecastDuration, configForecastStart, compiledData) => {
      try {
        if (forecastDuration && configForecastStart && compiledData) {
          const forecast = forecastBudget(
            forecastDuration,
            configForecastStart,
            JSON.stringify(compiledData)
          );
          enqueueSnackbar("Forecasting...", { variant: "info" });
          return forecast;
        }
      } catch (error) {
        enqueueSnackbar("Error Forecasting", { variant: "error" });
      }
    },
    [enqueueSnackbar, forecastBudget]
  );

  function handleChange(event: SelectChangeEvent) {
    setUnit(event.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setForecastLength(forecastDuration);
    setForecastStart(startDate);
    const forecast = forecastData(forecastDuration, startDate, compiledData);
    setForecastList(forecast);
  }

  return (
    <form className="grid grid-cols-12 gap-5">
      <TextField
        label="Forecast Length"
        value={length}
        placeholder="0"
        onChange={(e) => setLength(e.target.value)}
        type="number"
        className="col-span-6 mt-5"
      />
      <FormControl fullWidth className="col-span-6 mt-5">
        <InputLabel id="forecast-unit">Time Scale</InputLabel>
        <Select
          labelId="forecast-unit"
          placeholder="Months"
          value={unit}
          label="Time Scale"
          onChange={handleChange}>
          <MenuItem value={"days"}>Day</MenuItem>
          <MenuItem value={"months"}>Month</MenuItem>
          <MenuItem value={"years"}>Year</MenuItem>
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
        onClick={(e) => handleSubmit(e as any)}
        variant="contained"
        className="text-black bg-[#1976d2] border-[#1976d2] hover:text-white hover:bg-black hover:border-white border-solid border-2 col-span-4 h-fit w-fit self-center col-start-1">
        Submit
      </Button>
    </form>
  );
};
