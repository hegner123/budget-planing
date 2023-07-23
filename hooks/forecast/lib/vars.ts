import { IncomeEntry, ExpenseEntry } from "@budget/types";
import dayjs from "dayjs";

const today = dayjs().format("MM/DD/YYYY");

export const incomePlaceholder: IncomeEntry = {
  amount: 0,
  created_at: today,
  date: today,
  id: 1,
  name: "placeholder",
  repeated: "none",
  user: "placeholder",
  uuid: "placeholder",
};
export const expensesPlaceholder: ExpenseEntry = {
  amount: 0,
  created_at: today,
  date: today,
  id: 1,
  name: "placeholder",
  repeated: "none",
  user: "placeholder",
  uuid: "placeholder",
};
