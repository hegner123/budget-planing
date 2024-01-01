"use client";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import dayjs from "dayjs";
import { IncomeAccordion } from "@budget/components/forecast/incomeAccordion";
import { ExpenseAccordion } from "@budget/components/forecast/expenseAccordion";
import { ForecastEntry } from "@budget/types";

function ForecastAccordion({ item, i }: { item: ForecastEntry; i: number }) {
  const balanceGoodColor = "bg-slate-500";
  const balanceWarningColor = "bg-yellow-700";
  const balanceDangerColor = "bg-red-700";

  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);

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
    <Accordion className={"bg-slate-500"}>
      <AccordionSummary
        className={`text-white rounded ${balanceColor(item.balance)}`}
        expandIcon={<ExpandMoreIcon className="text-white" />}
        aria-controls={`panel${i}a-content`}
        id={`panel${i}a-header`}>
        <div className="flex justify-between w-full pr-20">
          <p className="text-xl">
            {dayjs(item.date as string).format("MM/DD")}
          </p>
          <p className="text-xl"> {` ${numberFormat.format(item.balance)}`}</p>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <ul className="grid gap-5">
          <li>
            <p className="text-white">
              Previous Balance: ${item.balanceDetails.previousBalance}
            </p>
          </li>
          <li>
            <p className="text-white">
              New Balance: ${item.balanceDetails.newBalance}
            </p>
          </li>
          {item.balanceDetails.incomesTotal !== 0 && (
            <IncomeAccordion i={i} item={item} />
          )}
          {item.balanceDetails.expensesTotal !== 0 && (
            <ExpenseAccordion i={i} item={item} />
          )}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}

export { ForecastAccordion };
