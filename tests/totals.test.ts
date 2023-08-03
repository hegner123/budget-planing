import { calcTotals, dateFilter } from "../hooks/forecast/lib";
import { describe, expect, test } from "@jest/globals";
import {
  incomePostRepeats,
  expensesPostRepeats,
  expectedIncomeTestEntries,
  expectedExpenseTestEntries,
  expectedIncomeTotal,
  expectedExpenseTotal,
  testDate,
  testLength,
} from "./vars";
import dayjs from "dayjs";

describe("expenseTests", () => {
  const incomeEntries = dateFilter(incomePostRepeats, testDate);
  const expenseEntries = dateFilter(expensesPostRepeats, testDate);
  test("Test income date filter", () => {
    expect(calcTotals(incomeEntries)).toBe(expectedIncomeTotal);
  });
  test("Test expense date filter", () => {
    expect(calcTotals(expenseEntries)).toBe(expectedExpenseTotal);
  });
});
