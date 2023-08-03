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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSnackbar } from "notistack";
import Chart from "@budget/components/chart";
import dayjs from "dayjs";
import { ExpensePeek, IncomePeek } from "@budget/types";

const Forecast = () => {
  const [compiledData, setCompiledData] = useAtom(compiledDataAtom);
  const [forecastList, setForecastList] = useAtom(forecastListAtom);
  const [forecastDisplay, setForecastDisplay] = useState<any>("list");
  const { forecastBudget } = useForecastBudget();
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
          <ul className="w-3/4">
            {forecastDisplay === "list" &&
              forecastList &&
              forecastList.map((item: any, i: any) => (
                <li key={i} className="mt-2">
                  <Accordion classes={"bg-slate-500"}>
                    <AccordionSummary
                      className="text-white rounded bg-slate-500"
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${i}a-content`}
                      id={`panel${i}a-header`}>
                      <div className="flex justify-between w-full pr-20">
                        <p className="text-xl">
                          {dayjs(item.date).format("MM/DD")}
                        </p>
                        <p className="text-xl">
                          {" "}
                          {` ${numberFormat.format(item.balance)}`}
                        </p>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul className="grid gap-5">
                        <li>
                          <p>
                            Previous Balance:{" "}
                            {item.balanceDetails.previousBalance}
                          </p>
                        </li>
                        <li>
                          <p>New Balance: {item.balanceDetails.newBalance}</p>
                        </li>
                        {item.balanceDetails.incomesTotal !== 0 && (
                          <>
                            <li>
                              <ul className="grid w-full grid-cols-2">
                                <li className="col-start-1">
                                  <p>
                                    Income Total: $
                                    {item.balanceDetails.incomesTotal}
                                  </p>
                                </li>
                                <li className="col-start-2">
                                  <Accordion className="p-0 m-0 ">
                                    <AccordionSummary
                                      className="text-white border-none rounded bg-slate-500"
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={`panel${i}b1-content`}
                                      id={`panel${i}b1-header`}>
                                      <p>Income Details</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <ul>
                                        {item.balanceDetails.incomes.map(
                                          (income: IncomePeek, i: any) => (
                                            <li key={i}>
                                              <p>
                                                {income.name}: ${income.amount}
                                              </p>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </AccordionDetails>
                                  </Accordion>
                                </li>
                              </ul>
                            </li>
                          </>
                        )}
                        {item.balanceDetails.expensesTotal !== 0 && (
                          <>
                            <li>
                              <ul className="grid grid-cols-2">
                                <li className="col-start-1">
                                  <p>
                                    Expenses Total: $
                                    {item.balanceDetails.expensesTotal}
                                  </p>
                                </li>
                                <li className="col-start-2">
                                  <Accordion>
                                    <AccordionSummary
                                      className="text-white rounded bg-slate-500"
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={`panel${i}b2-content`}
                                      id={`panel${i}b2-header`}>
                                      <p>Expenses Details</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <ul>
                                        {item.balanceDetails.expenses.map(
                                          (expense: ExpensePeek, i: any) => (
                                            <li key={i}>
                                              <p>
                                                {expense.name}: $
                                                {expense.amount}
                                              </p>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </AccordionDetails>
                                  </Accordion>
                                </li>
                              </ul>
                            </li>
                          </>
                        )}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
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
