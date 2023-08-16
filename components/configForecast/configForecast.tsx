"use client";
import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useForecastBudget } from "@budget/hooks/forecast/useForecast";
import { useAtom } from "jotai";
import { configForecastStartAtom, forecastListAtom } from "@budget/store/state";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

export const ConfigForecast = ({ compiledData }: any) => {
  dayjs.extend(duration);
  const [length, setLength] = useState<any>("");
  const [unit, setUnit] = useState<any>("");

  const [forecastDuration, setForecastDuration] = useState<number>(null);
  const { forecastBudget } = useForecastBudget();
  const [forecastStart, setStartDate] = useAtom(configForecastStartAtom);
  const [, setForecastList] = useAtom(forecastListAtom);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (length && unit && forecastStart) {
      setForecastDuration(forecastFindDuration(length, unit, forecastStart));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, unit, forecastStart]);

  const forecastData = useCallback(
    (duration: any, start: any, compiledData: any) => {
      try {
        if (duration && start && compiledData) {
          const forecast = forecastBudget(
            duration,
            start,
            JSON.stringify(compiledData)
          );
          enqueueSnackbar("Forecasting...", { variant: "info" });
          return forecast;
        }
      } catch (error) {
        enqueueSnackbar("Error Forecasting", { variant: "error" });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enqueueSnackbar, forecastFindDuration]
  );

  function handleSubmit(e: any) {
    e.preventDefault();
    let forecast = null;

    forecast = forecastData(forecastDuration, forecastStart, compiledData);
    if (forecast !== null) {
      setForecastList(forecast);
    }
  }

  function forecastFindDuration(
    length: any,
    unit: any,
    startDate: any
  ): number {
    let endDate = startDate?.add(length, unit);
    return startDate?.diff(endDate, "day") * -1;
  }

  console.log("config");

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
          onChange={(e) => setUnit(e.target.value)}>
          <MenuItem value={"days"}>Day</MenuItem>
          <MenuItem value={"months"}>Month</MenuItem>
          <MenuItem value={"years"}>Year</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Forecast Start Date"
          value={forecastStart}
          onChange={(newValue) => setStartDate(newValue)}
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
