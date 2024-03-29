"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { compiledDataAtom, forecastListAtom } from "@budget/store/state";
import Card from "@mui/material/Card";
import { ConfigForecast } from "@budget/components/configForecast/configForecast";
import { ForecastAccordion } from "@budget/components/forecastAccordion/forecastAccordion";
import { IncomeAccordion } from "@budget/components/forecast/incomeAccordion";
import { ExpenseAccordion } from "@budget/components/forecast/expenseAccordion";
import Chart from "@budget/components/chart";
import dayjs from "dayjs";
import {
  ToggleButtonGroup,
  ToggleButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ForecastEntry } from "@budget/types";

const Forecast = () => {
  const [compiledData, setCompiledData] = useAtom(compiledDataAtom);
  const [forecastList, setForecastList] = useAtom(forecastListAtom);
  const [forecastDisplay, setForecastDisplay] = useState<any>("list");
  const balanceGoodColor = "bg-slate-500";
  const balanceWarningColor = "bg-yellow-700";
  const balanceDangerColor = "bg-red-700";

  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);

  // useEffect(() => {
  //   setCompiledData(JSON.parse(localStorage.getItem("compiledData")!));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    return () => {
      setForecastList([]);
    };
  }, [setForecastList]);

  function handleDisplayChange(event: any, newDisplay: any) {
    setForecastDisplay(newDisplay);
  }

  function balanceColor(balance: number): string {
    if (balance < 1000 && balance > 600) {
      return balanceWarningColor;
    }
    if (balance < 600) {
      return balanceDangerColor;
    }
    if (balance > 0) {
      return balanceGoodColor;
    }
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
          <h2 className="mb-5 text-2xl">Forecast Config</h2>
          <ConfigForecast compiledData={compiledData} />
        </Card>
        <Card className="col-span-8 p-5">
          <h2 className="mb-5 text-2xl">Forecast</h2>
          <ul className="w-3/4">
            {forecastDisplay === "list" &&
              forecastList &&
              forecastList.map((item: ForecastEntry, i: number) => (
                <li key={i} className="mt-2">
                  <ForecastAccordion item={item} i={i} />
                </li>
              ))}
            {forecastDisplay === "list" && forecastList.length === 0 && (
              <p className="text-gray-500">No Forecast Data</p>
            )}
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
