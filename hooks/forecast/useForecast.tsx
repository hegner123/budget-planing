import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { compiledDataAtom, configForecastAtom } from "@budget/store/state";

export const useForecast = () => {
  const [compiledData] = useAtom<any>(compiledDataAtom);
  const [configForecast] = useAtom<any>(configForecastAtom);
  const [forecastData, setForecastData] = useState<any>([]);

  useEffect(() => {
    setForecastData(configForecast.forecastDuration);
  }, [compiledData, configForecast]);

  return { forecastData };
};
