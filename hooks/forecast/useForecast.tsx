"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { compiledDataAtom, configForecastAtom } from "@budget/store/state";
import { useSnackbar } from "notistack";

export const useForecast = () => {
  const [compiledData] = useAtom<any>(compiledDataAtom);
  const [configForecast, setConfigForecast] = useAtom(configForecastAtom);
  const [forecastData, setForecastData] = useState<any>(["any"]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setForecastData(configForecast.forecastDuration as any);
  }, [compiledData, configForecast]);

  useEffect(() => {
    // handleForecastData();
    // function handleForecastData() {
    //   for (let x of compiledData) {
    //     enqueueSnackbar(`Compiled Data: ${JSON.stringify(x)}`);
    //   }
    //   enqueueSnackbar(`Forecast Data: ${JSON.stringify(compiledData)}`);
    // }
  }, [enqueueSnackbar, forecastData, compiledData, configForecast]);

  return { forecastData };
};
