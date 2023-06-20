"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  compiledDataAtom,
  configForecastStartAtom,
  configForecastDurationAtom,
  forecastListAtom,
} from "@budget/store/state";
import { useForecastBudget } from "@budget/hooks/forecast/useForecast";
import Card from "@mui/material/Card";
import { ConfigForecast } from "@budget/components/configForecast/configForecast";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useSnackbar } from "notistack";
import Chart from "@budget/components/chart";
import dayjs from "dayjs";

const Forecast = () => {
  const [compiledData, setCompiledData] = useAtom(compiledDataAtom);
  const [forecastList, setForecastList] = useAtom(forecastListAtom);
  const [forecastDisplay, setForecastDisplay] = useState<any>("list");
  const forecastBudget = useForecastBudget();
  const { enqueueSnackbar } = useSnackbar();
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);

  useEffect(() => {
    setCompiledData(JSON.parse(localStorage.getItem("compiledData")!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setForecastList([]);
    };
  }, [setForecastList]);

  function handleDisplayChange(event: any, newDisplay: any) {
    setForecastDisplay(newDisplay);
  }

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
          <ConfigForecast
            getData={forecastBudget}
            compiledData={compiledData}
          />
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
