"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useAtom } from "jotai";
import {
  configForecastAtom,
  configForecastDurationAtom,
  configForecastStartAtom,
} from "@budget/store/state";
export const useForecastLength = () => {
  const [length, setLength] = useState<any>("");
  const [unit, setUnit] = useState<any>("");
  const [startDate, setStartDate] = useAtom<any>(configForecastStartAtom);
  const [endDate, setEndDate] = useState<any>(null);
  const [forecastDuration, setForecastDuration] = useAtom(
    configForecastDurationAtom
  );

  dayjs.extend(duration);
  useEffect(() => {
    if (length && unit && startDate) {
      setEndDate(startDate?.add(length, unit));
    }
    if (endDate) {
      let forecastDuration = startDate?.diff(endDate, "day") * -1;
      setForecastDuration(forecastDuration as any);
    }
  }, [length, unit, startDate, endDate, setForecastDuration]);

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
