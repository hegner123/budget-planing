import {
  createBalance,
  refreshDate,
  refreshDates,
  repeatedEntries,
  incomeDateFilter,
  expenseDateFilter,
} from "../hooks/forecast/lib";
import { describe, expect, test } from "@jest/globals";
import {
  incomeTestEntries,
  expenseDateTestEntries,
  expectedIncomeTestEntries,
  expectedExpenseTestEntries,
  testDate,
} from "./placeholders";
import dayjs from "dayjs";

describe("expenseTests", () => {
  test("Test income date filter", () => {
    expect(incomeDateFilter(incomeTestEntries, testDate)).toStrictEqual(
      expectedIncomeTestEntries
    );
  });
  test("Test expense date filter", () => {
    expect(expenseDateFilter(expenseDateTestEntries, testDate)).toStrictEqual(
      expectedExpenseTestEntries
    );
  });
});
