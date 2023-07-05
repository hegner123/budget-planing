"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import {
  compiledDataAtom,
  configForecastStartAtom,
  configForecastDurationAtom,
  forecastListAtom,
} from "@budget/store/state";

import {
  Card,
  ToggleButtonGroup,
  ToggleButton,
  SelectChangeEvent,
} from "@mui/material";
import { useSnackbar } from "notistack";
import Chart from "@budget/components/chart";
import dayjs from "dayjs";
import { useForecastBudget } from "@budget/hooks/forecast/useForecast";

const Forecast = () => {
  const [compiledData, setCompiledData] = useAtom(compiledDataAtom);
  const [forecastList, setForecastList] = useAtom(forecastListAtom);
  const today = dayjs().format("MM/DD/YYYY");

  const [forecastDisplay, setForecastDisplay] = useState<any>("list");

  const [forecastLength, setForecastLength] = useAtom(
    configForecastDurationAtom
  );

  const { enqueueSnackbar } = useSnackbar();
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);
  const { forecastBudget } = useForecastBudget();

  function handleDisplayChange(event: any, newDisplay: any) {
    setForecastDisplay(newDisplay);
  }

  useEffect(() => {
    let data = localStorage.getItem("compiledData");
    setCompiledData(JSON.parse(data));
    // console.log("compiled", data);
    if (forecastLength && today && compiledData) {
      const budget = forecastBudget(forecastLength, today, data);
      setForecastList(budget);
    }
  }, []);

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

        <Card className="col-span-8 p-5">
          <h2 className="mb-5 text-2xl">Forecast</h2>
          <ul>
            {forecastDisplay === "list" &&
              // forecastList &&
              forecastList.map((item: any, i) => (
                <li key={i}>
                  {dayjs(item.date).format("MM/DD/YYYY")}
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
