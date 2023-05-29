import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { compiledDataAtom } from "@budget/store/state";
import { useForecast } from "@budget/hooks/forecast/useForecast";
import Card from "@mui/material/Card";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ConfigForecast } from "@budget/components/configForecast/configForecast";
import { configForecastDurationAtom } from "@budget/store/state";

const Forecast = () => {
  const [compiledData, setCompiledData] = useAtom(compiledDataAtom);
  const [forecastLength, setForecastLength] = useAtom(
    configForecastDurationAtom
  );
  const { forecastData } = useForecast();

  useEffect(() => {
    console.log(forecastData);
  }, [forecastData]);

  useEffect(() => {
    sessionStorage.getItem("compiledData")
      ? setCompiledData(JSON.parse(sessionStorage.getItem("compiledData")!))
      : setCompiledData([]);
  }, [setCompiledData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main className="p-5 dashboard-main">
        <div className="grid grid-cols-12 gap-5 mb-5">
          <h1 className="mt-5 mb-5 text-6xl col-span-full">Forecast</h1>
          <Card className="col-span-6 p-5">
            <h2 className="mb-5 text-2xl">Forecast Length</h2>
            <ConfigForecast />
            <div className="flex gap-4"></div>
          </Card>
          <Card className="col-span-4 p-5">
            <h2 className="mb-5 text-2xl">Forecast Dates</h2>
            <ul>
              {forecastLength && (
                <li>Forecast Length: {JSON.stringify(forecastLength)} days</li>
              )}
            </ul>
          </Card>
        </div>
      </main>
    </LocalizationProvider>
  );
};

export default Forecast;
