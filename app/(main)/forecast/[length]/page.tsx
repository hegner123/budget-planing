"use client";

import { useEffect, useState } from "react";

import { useForecast } from "@budget/hooks/forecast/useForecast";
import { useSnackbar } from "notistack";
const ForecastLength = ({ params }: { params: { length: string } }) => {
  const [forecastLength, setForecastLength] = useState(parseInt(params.length));
  const { forecastData } = useForecast();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar(`Forecast Length: ${forecastLength}`);
    enqueueSnackbar(`Forecast Data: ${JSON.stringify(forecastData)}`);
  }, [enqueueSnackbar, forecastLength, forecastData]);

  return (
    <main className="p-5 dashboard-main">
      <div className="grid grid-cols-12 gap-5 mb-5">
        <h1 className="mt-5 mb-5 text-6xl col-span-full">Forecast </h1>
      </div>
    </main>
  );
};

export default ForecastLength;
