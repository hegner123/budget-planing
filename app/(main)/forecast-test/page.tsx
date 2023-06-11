"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import {
  compiledDataAtom,
  configForecastStartAtom,
  configForecastDurationAtom,
  forecastListAtom,
} from "@budget/store/state";
import { useForecast } from "@budget/hooks/forecast/useForecast";
import { useForecastLength } from "@budget/hooks/forecast/useForecastLength";
import Card from "@mui/material/Card";
import { ConfigForecast } from "@budget/components/configForecast/configForecast";
import {
  ToggleButtonGroup,
  ToggleButton,
  SelectChangeEvent,
} from "@mui/material";
import { useSnackbar } from "notistack";
import Chart from "@budget/components/chart";
import dayjs from "dayjs";
import { budgetForecast } from "@budget/hooks/forecast/forecast";

const Forecast = () => {
  const [compiledData, setCompiledData] = useAtom(compiledDataAtom);
  const [forecastList, setForecastList] = useAtom(forecastListAtom);
  const [forecastDisplay, setForecastDisplay] = useState<any>("list");
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
  const [forecastStart, setForecastStart] = useAtom(configForecastStartAtom);
  const [isSet, setIsSet] = useState(false);
  const { getForecastData } = useForecast();
  const { enqueueSnackbar } = useSnackbar();
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);

  // useEffect(() => {
  //   if (!isSet) {
  //     setCompiledData(JSON.parse(localStorage.getItem("compiledData")!));
  //     setForecastStart(dayjs());
  //     setLength(1);
  //     setUnit("month");
  //     const forecast = forecastData(forecastDuration, startDate, compiledData);
  //     setForecastList(forecast);
  //   }
  //   setIsSet(true);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSet]);

  useEffect(() => {
    if (!isSet) {
      setCompiledData(JSON.parse(localStorage.getItem("compiledData")!));
      setForecastStart(dayjs());
      const forecast = forecastData(forecastDuration, startDate, compiledData);
      setForecastList(forecast);
    }
    setIsSet(true);

    function forecastData(forecastDuration, configForecastStart, compiledData) {
      if (forecastDuration && configForecastStart && compiledData) {
        enqueueSnackbar("Forecasting...", { variant: "info" });
        return budgetForecast(
          forecastDuration,
          configForecastStart,
          compiledData
        );
      } else {
        enqueueSnackbar("Error forecasting", { variant: "error" });
      }
    }
  }, [
    forecastList,
    isSet,
    setCompiledData,
    setForecastStart,
    setLength,
    setUnit,
    startDate,
    forecastDuration,
    compiledData,
    enqueueSnackbar,
  ]);

  function handleDisplayChange(event: any, newDisplay: any) {
    setForecastDisplay(newDisplay);
  }

  // const forecastData = useCallback(
  //   (forecastDuration, configForecastStart, compiledData) => {
  //     if (forecastDuration && configForecastStart && compiledData) {
  //       enqueueSnackbar("Forecasting...", { variant: "info" });
  //       return budgetForecast(
  //         forecastDuration,
  //         configForecastStart,
  //         compiledData
  //       );
  //     } else {
  //       enqueueSnackbar("Error forecasting", { variant: "error" });
  //     }
  //   },
  //   [enqueueSnackbar]
  // );

  // function handleChange(event: SelectChangeEvent) {
  //   setUnit(event.target.value);
  // }

  // function handleSubmit(e: any) {
  //   e.preventDefault();
  //   setForecastLength(forecastDuration);
  //   setForecastStart(startDate);
  //   const forecast = forecastData(forecastDuration, startDate, compiledData);
  //   setForecastList(forecast);
  // }

  return (
    <section className="p-5 dashboard-main">
      <div className="grid grid-cols-12 gap-5 mb-5">
        <h1 className="mt-5 mb-5 text-6xl col-span-full">Forecast</h1>
        <div className="col-span-full ">
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={forecastDisplay}
            onChange={handleDisplayChange}>
            <ToggleButton
              value={"list"}
              sx={{ border: "1px solid #b4b4b4", color: "#fff" }}>
              List
            </ToggleButton>
            <ToggleButton
              value={"chart"}
              sx={{ border: "1px solid #b4b4b4", color: "#fff" }}>
              Chart
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Card className="col-span-4 p-5 max-h-fit">
          <h2 className="mb-5 text-2xl">Forecast Length</h2>
        </Card>
        <Card className="col-span-8 p-5">
          <h2 className="mb-5 text-2xl">Forecast</h2>
          <ul>
            {/* {forecastLength && (
                <li>Forecast Length: {JSON.stringify(forecastLength)} days</li>
              )} */}

            {forecastDisplay === "list" &&
              forecastList &&
              forecastList.map((item: any, i) => (
                <li key={i}>
                  {dayjs(item.date).format("YYYY/MM/DD")}
                  {` ${numberFormat.format(item.balance)}`}
                </li>
              ))}
            {forecastDisplay === "chart" && (
              <Chart
                forecastData={forecastList}
                x="date"
                y="balance"
                title="Forecast"
              />
            )}
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default Forecast;
