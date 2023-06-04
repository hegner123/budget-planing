"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  compiledDataAtom,
  configForecastStartAtom,
  configForecastDurationAtom,
} from "@budget/store/state";
import { useForecast } from "@budget/hooks/forecast/useForecast";
import Card from "@mui/material/Card";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ConfigForecast } from "@budget/components/configForecast/configForecast";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";


const Forecast = () => {
  const [, setCompiledData] = useAtom(compiledDataAtom);
  const [forecastStartDate] = useAtom(configForecastStartAtom);
  const [forecastLength, setForecastLength] = useAtom(
    configForecastDurationAtom
  );
  const { forecastData, getForecastData } = useForecast();

  useEffect(() => {
    setCompiledData(JSON.parse(localStorage.getItem("compiledData")!));
  }, [setCompiledData]);

  return (
    <section className="p-5 dashboard-main">
      <div className="grid grid-cols-12 gap-5 mb-5">
        <h1 className="mt-5 mb-5 text-6xl col-span-full">Forecast</h1>
        <Card className="col-span-6 p-5 max-h-fit">
          <h2 className="mb-5 text-2xl">Forecast Length</h2>
          <ConfigForecast getData={getForecastData} />
        </Card>
        <Card className="col-span-4 p-5">
          <h2 className="mb-5 text-2xl">Forecast Dates</h2>
          <ul>
            {/* {forecastLength && (
                <li>Forecast Length: {JSON.stringify(forecastLength)} days</li>
              )} */}

            {forecastData &&
              forecastData.map((item: any) => (
                <li key={dayjs(item.date).format("YYYY/MM/DD")}>
                  {dayjs(item.date).format("YYYY/MM/DD")} :{" "}
                  {`\$${item.balance}`}
                </li>
              ))}
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default Forecast;
