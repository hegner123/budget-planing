"use client";
import { useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import { budgetForecast } from "@budget/hooks/forecast/forecast";
import { useAtom } from "jotai";
import { forecastListAtom } from "@budget/store/state";

export const useForecast = () => {
  const [forecastData, setForecastData] = useState<any>([]);
  const [forecastList, setForecastList] = useAtom(forecastListAtom);
  const { enqueueSnackbar } = useSnackbar();
  const getForecastData = "test";

  return { forecastData, getForecastData };
};
