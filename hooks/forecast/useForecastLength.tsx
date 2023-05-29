"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useAtom } from "jotai";
import { configForecastAtom } from "@budget/store/state";
export const useForecastLength = () => {
  const [length, setLength] = useState<any>(0);
  const [unit, setUnit] = useState<any>("");
  const [startDate, setStartDate] = useState<any>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<any>(null);
  const [forecastDuration, setForecastDuration] = useState<any>(null);

  dayjs.extend(duration);
  useEffect(() => {
    if (length && unit && startDate) {
      setEndDate(startDate?.add(length, unit));
    }
  }, [length, unit, startDate, endDate]);

  useEffect(() => {
    if (length && unit && startDate && endDate) {
      setForecastDuration(startDate?.diff(endDate, "day") * -1);
    }
  }, [length, unit, startDate, endDate]);
  return {
    setLength,
    setUnit,
    setStartDate,
    length,
    unit,
    startDate,
    endDate,
    forecastDuration,
  };
};
