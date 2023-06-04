"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  compiledDataAtom,
  configForecastAtom,
  configForecastDurationAtom,
  configForecastStartAtom,
} from "@budget/store/state";
import { useSnackbar } from "notistack";
import { BudgetForecast } from "@budget/forecast/forecast";

export const useForecast = () => {
  const [compiledData] = useAtom<any>(compiledDataAtom);
  const [configForecast] = useAtom<any>(configForecastAtom);
  const [configForecastStart] = useAtom<any>(configForecastStartAtom);
  const [forecastDuration] = useAtom(configForecastDurationAtom);
  const [forecastData, setForecastData] = useState<any>([]);
  const { enqueueSnackbar } = useSnackbar();

  function getForecastData() {
    enqueueSnackbar("Forecasting...", { variant: "info" });

    const forecast = new BudgetForecast(
      forecastDuration,
      configForecastStart,
      compiledData
    );

    if (forecastDuration && configForecastStart && compiledData) {
      setForecastData(forecast.getForecast());
    } else {
      enqueueSnackbar("Error forecasting", { variant: "error" });
    }
  }

  return { forecastData, getForecastData };
};
