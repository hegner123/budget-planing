import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IncomePeek } from "@budget/types";

const IncomeAccordion = ({ i, item }) => {
  return (
    <>
      <li>
        <ul className="grid w-full grid-cols-2">
          <li className="col-start-1">
            <p className="text-white mt-[12px]">
              Income Total: ${item?.balanceDetails?.incomesTotal}
            </p>
          </li>
          <li className="col-start-2">
            <Accordion className="p-0 m-0 ">
              <AccordionSummary
                className="text-white border-none rounded bg-slate-600"
                expandIcon={<ExpandMoreIcon className="text-white" />}
                aria-controls={`panel${i}b1-content`}
                id={`panel${i}b1-header`}>
                <p>Income Details</p>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {item?.balanceDetails?.incomes?.map(
                    (income: IncomePeek, i: any) => (
                      <li key={i}>
                        <p>
                          {income?.name}: ${income?.amount}
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

export { IncomeAccordion };
