import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpensePeek } from "@budget/types";

const ExpenseAccordion = ({ i, item }) => {
  return (
    <>
      <li>
        <ul className="grid grid-cols-2 items-top">
          <li className="col-start-1">
            <p className="text-white mt-[12px]">
              Expenses Total: ${item?.balanceDetails?.expensesTotal}
            </p>
          </li>
          <li className="col-start-2">
            <Accordion>
              <AccordionSummary
                className="text-white rounded bg-slate-600"
                expandIcon={<ExpandMoreIcon className="text-white" />}
                aria-controls={`panel${i}b2-content`}
                id={`panel${i}b2-header`}>
                <p>Expenses Details</p>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {item?.balanceDetails?.expenses.map(
                    (expense: ExpensePeek, i: any) => (
                      <li key={i}>
                        <p>
                          {expense?.name}: ${expense?.amount}
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
  );
};

export { ExpenseAccordion };
